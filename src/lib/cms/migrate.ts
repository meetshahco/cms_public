import { listProjects, listCaseStudies, getProjectContent, getCaseStudyContent, updateProject, updateCaseStudy, getSettings, updateSettings } from "./storage";

/**
 * MIGRATION SCRIPT
 * Run this to move your local 'content/' files into Vercel KV.
 * Note: This requires KV_URL environment variable to be set.
 */
export async function migrateLocalToKV() {
    console.log("🚀 Starting migration to Vercel KV...");

    // 1. Settings
    console.log("📝 Migrating Settings...");
    const settings = await getSettings();
    await updateSettings(settings);

    // 2. Projects
    console.log("📁 Migrating Projects...");
    const projects = await listProjects();
    for (const project of projects) {
        console.log(`   > Migrating Project: ${project.title}`);
        const content = await getProjectContent(project.id);
        await updateProject(project.id, project, content);
    }

    // 3. Case Studies
    console.log("📄 Migrating Case Studies...");
    const studies = await listCaseStudies();
    for (const study of studies) {
        console.log(`   > Migrating Case Study: ${study.title}`);
        const content = await getCaseStudyContent(study.slug);
        await updateCaseStudy(study.slug, study, content);
    }

    console.log("✅ Migration complete!");
}
