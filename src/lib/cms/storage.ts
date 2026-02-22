import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const CASE_STUDIES_DIR = path.join(CONTENT_DIR, "case-studies");

// Check if we should use KV based on environment variables
function shouldUseKV() {
    return !!process.env.KV_URL;
}

// KV Keys
const KV_KEYS = {
    PROJECTS: "cms:projects",
    CASE_STUDIES: "cms:case_studies",
    SETTINGS: "cms:settings",
    PAGES: "cms:pages",
    // Content keys follow pattern: cms:content:[id]
    content: (id: string) => `cms:content:${id}`,
};

// ─── Project Types ────────────────────────────────────────
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    image: string;
    video: string;
    metrics: { label: string; value: string }[];
    starred: boolean;
    status: "draft" | "published";
    archived?: boolean;
    order: number;
    caseStudyCount?: number; // Optional count for display
    createdAt: string;
    updatedAt: string;
}

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt" | "order">;

// ─── Case Study Types ─────────────────────────────────────
export interface CaseStudy {
    slug: string;
    title: string;
    parentProject: string;
    description: string;
    coverImage: string;
    publishedAt: string;
    status: "draft" | "published";
    archived?: boolean;
    order: number;
}

export type CaseStudyInput = Omit<CaseStudy, "slug" | "order">;

// ─── Settings Types ──────────────────────────────────────
export interface Settings {
    siteTitle: string;
    siteUrl: string;
    metaDescription: string;
    socialLinks: {
        twitter: string;
        github: string;
        linkedin: string;
    };
    adminName: string;
    adminEmail: string;
}

export type SettingsInput = Partial<Settings>;

// ─── Helper ───────────────────────────────────────────────
function ensureDir(dir: string) {
    if (shouldUseKV()) return;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/** Generate a unique slug by appending a short timestamp suffix if needed */
async function uniqueSlug(base: string, dir: string, kvKey?: string): Promise<string> {
    const slug = slugify(base) || "untitled";

    if (shouldUseKV() && kvKey) {
        const existing = await kv.hget(kvKey, slug);
        if (!existing) return slug;
    } else if (!shouldUseKV()) {
        const jsonPath = path.join(dir, `${slug}.json`);
        if (!fs.existsSync(jsonPath)) return slug;
    }

    // Append short unique suffix
    const suffix = Date.now().toString(36).slice(-5);
    return `${slug}-${suffix}`;
}

// ─── Project CRUD ─────────────────────────────────────────
export async function listProjects(): Promise<Project[]> {
    if (shouldUseKV()) {
        const projectsMap = await kv.hgetall(KV_KEYS.PROJECTS);
        if (!projectsMap) return [];
        const projects = Object.values(projectsMap) as Project[];
        return projects.filter((p) => !p.archived).sort((a, b) => a.order - b.order);
    }

    ensureDir(PROJECTS_DIR);
    const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));
    const projects = files.map((f) => {
        const raw = fs.readFileSync(path.join(PROJECTS_DIR, f), "utf-8");
        return JSON.parse(raw) as Project;
    });
    return projects.filter((p) => !p.archived).sort((a, b) => a.order - b.order);
}

export async function listArchivedProjects(): Promise<Project[]> {
    if (useKV) {
        const projectsMap = await kv.hgetall(KV_KEYS.PROJECTS);
        if (!projectsMap) return [];
        const projects = Object.values(projectsMap) as Project[];
        return projects.filter((p) => p.archived).sort((a, b) => a.order - b.order);
    }

    ensureDir(PROJECTS_DIR);
    const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));
    const projects = files.map((f) => {
        const raw = fs.readFileSync(path.join(PROJECTS_DIR, f), "utf-8");
        return JSON.parse(raw) as Project;
    });
    return projects.filter((p) => p.archived).sort((a, b) => a.order - b.order);
}

export async function getProject(id: string): Promise<Project | null> {
    if (shouldUseKV()) {
        return await kv.hget(KV_KEYS.PROJECTS, id);
    }

    const filePath = path.join(PROJECTS_DIR, `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Project;
}

export async function getProjectContent(id: string): Promise<string> {
    if (shouldUseKV()) {
        return (await kv.get(KV_KEYS.content(id))) as string || "";
    }

    const filePath = path.join(PROJECTS_DIR, `${id}.mdx`);
    if (!fs.existsSync(filePath)) return "";
    return fs.readFileSync(filePath, "utf-8");
}

export async function createProject(input: ProjectInput, content?: string): Promise<Project> {
    const id = await uniqueSlug(input.title, PROJECTS_DIR, KV_KEYS.PROJECTS);
    const existing = await listProjects();
    const now = new Date().toISOString();

    const project: Project = {
        ...input,
        id,
        order: existing.length,
        createdAt: now,
        updatedAt: now,
    };

    if (shouldUseKV()) {
        await kv.hset(KV_KEYS.PROJECTS, { [id]: project });
        if (content !== undefined) {
            await kv.set(KV_KEYS.content(id), content);
        }
    } else {
        ensureDir(PROJECTS_DIR);
        const filePath = path.join(PROJECTS_DIR, `${id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(project, null, 2));
        if (content !== undefined) {
            fs.writeFileSync(path.join(PROJECTS_DIR, `${id}.mdx`), content);
        }
    }
    return project;
}

export async function updateProject(id: string, updates: Partial<ProjectInput>, content?: string): Promise<Project | null> {
    const project = await getProject(id);
    if (!project) return null;

    const updated: Project = {
        ...project,
        ...updates,
        id, // don't allow id change
        updatedAt: new Date().toISOString(),
    };

    if (shouldUseKV()) {
        await kv.hset(KV_KEYS.PROJECTS, { [id]: updated });
        if (content !== undefined) {
            await kv.set(KV_KEYS.content(id), content);
        }
    } else {
        const filePath = path.join(PROJECTS_DIR, `${id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
        if (content !== undefined) {
            fs.writeFileSync(path.join(PROJECTS_DIR, `${id}.mdx`), content);
        }
    }
    return updated;
}

export async function archiveProject(id: string): Promise<Project | null> {
    return updateProject(id, { archived: true } as Partial<ProjectInput>);
}

export async function restoreProject(id: string): Promise<Project | null> {
    return updateProject(id, { archived: false } as Partial<ProjectInput>);
}

export async function deleteProject(id: string): Promise<boolean> {
    const result = await archiveProject(id);
    return result !== null;
}

export async function permanentlyDeleteProject(id: string): Promise<boolean> {
    if (shouldUseKV()) {
        await kv.hdel(KV_KEYS.PROJECTS, id);
        await kv.del(KV_KEYS.content(id));
        return true;
    }

    const jsonPath = path.join(PROJECTS_DIR, `${id}.json`);
    const mdxPath = path.join(PROJECTS_DIR, `${id}.mdx`);
    if (!fs.existsSync(jsonPath)) return false;
    fs.unlinkSync(jsonPath);
    if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);
    return true;
}

export async function toggleProjectStar(id: string): Promise<Project | null> {
    const project = await getProject(id);
    if (!project) return null;
    return updateProject(id, { starred: !project.starred } as Partial<ProjectInput>);
}

export async function reorderProjects(ids: string[]): Promise<void> {
    const now = new Date().toISOString();

    if (shouldUseKV()) {
        const projectsMap = await kv.hgetall(KV_KEYS.PROJECTS);
        if (!projectsMap) return;

        for (const [index, id] of ids.entries()) {
            const project = projectsMap[id] as Project;
            if (project) {
                project.order = index;
                project.updatedAt = now;
                await kv.hset(KV_KEYS.PROJECTS, { [id]: project });
            }
        }
    } else {
        ids.forEach((id, index) => {
            const filePath = path.join(PROJECTS_DIR, `${id}.json`);
            if (fs.existsSync(filePath)) {
                const raw = fs.readFileSync(filePath, "utf-8");
                const project = JSON.parse(raw) as Project;
                project.order = index;
                project.updatedAt = now;
                fs.writeFileSync(filePath, JSON.stringify(project, null, 2));
            }
        });
    }
}

// ─── Case Study CRUD ──────────────────────────────────────
export async function listCaseStudies(parentProject?: string): Promise<CaseStudy[]> {
    if (shouldUseKV()) {
        const studiesMap = await kv.hgetall(KV_KEYS.CASE_STUDIES);
        if (!studiesMap) return [];
        let studies = Object.values(studiesMap) as CaseStudy[];
        studies = studies.filter((s) => !s.archived);
        if (parentProject) {
            studies = studies.filter((s) => s.parentProject === parentProject);
        }
        return studies.sort((a, b) => a.order - b.order);
    }

    ensureDir(CASE_STUDIES_DIR);
    const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".json"));
    let studies = files.map((f) => {
        const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, f), "utf-8");
        return JSON.parse(raw) as CaseStudy;
    });
    studies = studies.filter((s) => !s.archived);
    if (parentProject) {
        studies = studies.filter((s) => s.parentProject === parentProject);
    }
    return studies.sort((a, b) => a.order - b.order);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
    if (shouldUseKV()) {
        return await kv.hget(KV_KEYS.CASE_STUDIES, slug);
    }

    const filePath = path.join(CASE_STUDIES_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as CaseStudy;
}

export async function getCaseStudyContent(slug: string): Promise<string> {
    if (shouldUseKV()) {
        return (await kv.get(KV_KEYS.content(slug))) as string || "";
    }

    const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return "";
    return fs.readFileSync(filePath, "utf-8");
}

export async function createCaseStudy(input: CaseStudyInput, content: string): Promise<CaseStudy> {
    const slug = await uniqueSlug(input.title, CASE_STUDIES_DIR, KV_KEYS.CASE_STUDIES);
    const existing = await listCaseStudies(input.parentProject);

    const caseStudy: CaseStudy = {
        ...input,
        slug,
        order: existing.length,
    };

    if (shouldUseKV()) {
        await kv.hset(KV_KEYS.CASE_STUDIES, { [slug]: caseStudy });
        await kv.set(KV_KEYS.content(slug), content);
    } else {
        ensureDir(CASE_STUDIES_DIR);
        fs.writeFileSync(
            path.join(CASE_STUDIES_DIR, `${slug}.json`),
            JSON.stringify(caseStudy, null, 2)
        );
        fs.writeFileSync(path.join(CASE_STUDIES_DIR, `${slug}.mdx`), content);
    }
    return caseStudy;
}

export async function updateCaseStudy(
    slug: string,
    updates: Partial<CaseStudyInput>,
    content?: string
): Promise<CaseStudy | null> {
    const caseStudy = await getCaseStudy(slug);
    if (!caseStudy) return null;

    const updated: CaseStudy = {
        ...caseStudy,
        ...updates,
        slug, // don't allow slug change
    };

    if (shouldUseKV()) {
        await kv.hset(KV_KEYS.CASE_STUDIES, { [slug]: updated });
        if (content !== undefined) {
            await kv.set(KV_KEYS.content(slug), content);
        }
    } else {
        fs.writeFileSync(
            path.join(CASE_STUDIES_DIR, `${slug}.json`),
            JSON.stringify(updated, null, 2)
        );
        if (content !== undefined) {
            fs.writeFileSync(path.join(CASE_STUDIES_DIR, `${slug}.mdx`), content);
        }
    }
    return updated;
}

export async function archiveCaseStudy(slug: string): Promise<CaseStudy | null> {
    return updateCaseStudy(slug, { archived: true } as Partial<CaseStudyInput>);
}

export async function restoreCaseStudy(slug: string): Promise<CaseStudy | null> {
    return updateCaseStudy(slug, { archived: false } as Partial<CaseStudyInput>);
}

export async function deleteCaseStudy(slug: string): Promise<boolean> {
    const result = await archiveCaseStudy(slug);
    return result !== null;
}

export async function permanentlyDeleteCaseStudy(slug: string): Promise<boolean> {
    if (shouldUseKV()) {
        await kv.hdel(KV_KEYS.CASE_STUDIES, slug);
        await kv.del(KV_KEYS.content(slug));
        return true;
    }

    const jsonPath = path.join(CASE_STUDIES_DIR, `${slug}.json`);
    const mdxPath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
    if (!fs.existsSync(jsonPath)) return false;
    fs.unlinkSync(jsonPath);
    if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);
    return true;
}

// ─── Stats ────────────────────────────────────────────────
export async function getStats() {
    const projects = await listProjects();
    const caseStudies = await listCaseStudies();
    return {
        totalProjects: projects.length,
        starredProjects: projects.filter((p) => p.starred).length,
        totalCaseStudies: caseStudies.length,
    };
}

// ─── Settings ─────────────────────────────────────────────
const SETTINGS_FILE = path.join(CONTENT_DIR, "settings.json");

const DEFAULT_SETTINGS: Settings = {
    siteTitle: "Meet Shah | Product Designer",
    siteUrl: "https://meetshah.design",
    metaDescription: "Product designer and developer based in India.",
    socialLinks: {
        twitter: "https://twitter.com/meet",
        github: "https://github.com/meet",
        linkedin: "https://linkedin.com/in/meet",
    },
    adminName: "Meet Shah",
    adminEmail: "hello@meetshah.design",
};

export async function getSettings(): Promise<Settings> {
    if (shouldUseKV()) {
        const settings = await kv.get<Settings>(KV_KEYS.SETTINGS);
        return settings || DEFAULT_SETTINGS;
    }

    ensureDir(CONTENT_DIR);
    if (!fs.existsSync(SETTINGS_FILE)) {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
        return DEFAULT_SETTINGS;
    }
    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
}

export async function updateSettings(updates: SettingsInput): Promise<Settings> {
    const current = await getSettings();
    const updated = {
        ...current,
        ...updates,
        socialLinks: {
            ...current.socialLinks,
            ...updates.socialLinks,
        },
    };

    if (shouldUseKV()) {
        await kv.set(KV_KEYS.SETTINGS, updated);
    } else {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    }
    return updated;
}
