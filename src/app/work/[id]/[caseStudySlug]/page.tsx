import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudy, getCaseStudyContent, getProject } from '@/lib/cms/storage'
import { Footer } from '@/components/Footer'

export default async function CaseStudyPage(props: {
    params: Promise<{ id: string; caseStudySlug: string }>
}) {
    const { id, caseStudySlug } = await props.params

    const [caseStudy, content, project] = await Promise.all([
        getCaseStudy(caseStudySlug),
        getCaseStudyContent(caseStudySlug),
        getProject(id)
    ])

    // Verify the case study exists and belongs to the correct parent project
    if (!caseStudy) {
        notFound()
    }

    const projectName = project?.title || id

    return (
        <>
            <main className="min-h-screen bg-black text-white p-6 sm:p-12">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href={`/work/${id}`}
                        className="text-neutral-400 hover:text-white transition-colors text-sm mb-8 inline-block"
                    >
                        ← Back to {projectName}
                    </Link>

                    {caseStudy.coverImage && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                            <img
                                src={caseStudy.coverImage}
                                alt={caseStudy.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        {caseStudy.title}
                    </h1>

                    {caseStudy.description && (
                        <p className="text-lg text-neutral-400 mb-8">
                            {caseStudy.description}
                        </p>
                    )}

                    {caseStudy.publishedAt && (
                        <p className="text-sm text-neutral-500 mb-12">
                            Published{' '}
                            {new Date(caseStudy.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}

                    {/* Render TipTap HTML content */}
                    <article
                        className="prose prose-invert prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: content || '' }}
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
