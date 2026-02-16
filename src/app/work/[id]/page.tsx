import { projects } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/ProjectDetails";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return <ProjectDetails project={project} />;
}
