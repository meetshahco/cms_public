/**
 * MIGRATION SCRIPT: Local Files → Vercel KV
 * 
 * Uses the correct Redis data types to match storage.ts:
 * - Projects: Redis Hash (hset) keyed by project id
 * - Case Studies: Redis Hash (hset) keyed by case study slug
 * - Settings: Redis String (set) as JSON
 * - Content: Redis String (set) per id/slug
 * 
 * Usage: npx tsx scripts/migrate-to-kv.ts
 */

import fs from "fs";
import path from "path";
import { createClient } from "@vercel/kv";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const CASE_STUDIES_DIR = path.join(CONTENT_DIR, "case-studies");

// KV Keys (must match storage.ts)
const KV_KEYS = {
    PROJECTS: "cms:projects",
    CASE_STUDIES: "cms:case_studies",
    SETTINGS: "cms:settings",
    content: (id: string) => `cms:content:${id}`,
};

async function main() {
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (!kvUrl || !kvToken) {
        console.error("❌ Missing KV_REST_API_URL or KV_REST_API_TOKEN in .env.local");
        console.error("   Run: npx vercel env pull .env.local");
        process.exit(1);
    }

    const kvClient = createClient({ url: kvUrl, token: kvToken });
    console.log("🚀 Starting migration: Local Files → Vercel KV\n");

    // 0. Flush old keys to avoid WRONGTYPE errors
    console.log("🧹 Clearing old keys...");
    await kvClient.del(KV_KEYS.PROJECTS);
    await kvClient.del(KV_KEYS.CASE_STUDIES);
    await kvClient.del(KV_KEYS.SETTINGS);
    console.log("   Done.\n");

    // 1. Migrate Settings (stored as a simple string/JSON via SET)
    const settingsPath = path.join(CONTENT_DIR, "settings.json");
    if (fs.existsSync(settingsPath)) {
        const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
        await kvClient.set(KV_KEYS.SETTINGS, settings);
        console.log("✅ Settings migrated");
    } else {
        console.log("⚠️  No settings.json found, skipping");
    }

    // 2. Migrate Projects (stored as a Redis Hash via HSET, keyed by project.id)
    if (fs.existsSync(PROJECTS_DIR)) {
        const jsonFiles = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".json"));

        for (const file of jsonFiles) {
            const projectData = JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8"));

            // Use hset to store each project as a field in the hash
            await kvClient.hset(KV_KEYS.PROJECTS, { [projectData.id]: projectData });

            // Read matching .mdx content and store as a string
            const mdxFile = file.replace(".json", ".mdx");
            const mdxPath = path.join(PROJECTS_DIR, mdxFile);
            const content = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, "utf-8") : "";
            await kvClient.set(KV_KEYS.content(projectData.id), content);

            console.log(`   📁 Project: ${projectData.title} (${projectData.id})`);
        }

        console.log(`✅ ${jsonFiles.length} projects migrated\n`);
    } else {
        console.log("⚠️  No projects directory found");
    }

    // 3. Migrate Case Studies (stored as a Redis Hash via HSET, keyed by study.slug)
    if (fs.existsSync(CASE_STUDIES_DIR)) {
        const jsonFiles = fs.readdirSync(CASE_STUDIES_DIR).filter(f => f.endsWith(".json"));

        for (const file of jsonFiles) {
            const studyData = JSON.parse(fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8"));

            // Use hset to store each case study as a field in the hash
            await kvClient.hset(KV_KEYS.CASE_STUDIES, { [studyData.slug]: studyData });

            // Read matching .mdx content and store as a string
            const mdxFile = file.replace(".json", ".mdx");
            const mdxPath = path.join(CASE_STUDIES_DIR, mdxFile);
            const content = fs.existsSync(mdxPath) ? fs.readFileSync(mdxPath, "utf-8") : "";
            await kvClient.set(KV_KEYS.content(studyData.slug), content);

            console.log(`   📄 Case Study: ${studyData.title} (${studyData.slug})`);
        }

        console.log(`✅ ${jsonFiles.length} case studies migrated\n`);
    } else {
        console.log("⚠️  No case-studies directory found");
    }

    console.log("🎉 Migration complete! Your data is now in Vercel KV.");
}

main().catch((err) => {
    console.error("❌ Migration failed:", err);
    process.exit(1);
});
