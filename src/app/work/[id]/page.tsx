import { getProject, getProjectContent, listCaseStudies } from "@/lib/cms/storage";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/ProjectDetails";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params;

    const [project, content, allCaseStudies] = await Promise.all([
        getProject(id),
        getProjectContent(id),
        listCaseStudies(id)
    ]);

    if (!project) {
        notFound();
    }

    // Filter only published case studies for front-end
    const publishedCaseStudies = allCaseStudies.filter(s => s.status === 'published');

    return <ProjectDetails project={project} content={content} caseStudies={publishedCaseStudies} />;
}
