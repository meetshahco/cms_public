"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Official Next.js 14 / Webpack 5 setup for react-pdf workers.
// This bundles the worker natively offline during the build!
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PDFSlideViewerProps {
    url: string;
    filename?: string;
}

export function PDFSlideViewer({ url, filename }: PDFSlideViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const goToPrevPage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 group select-none">
            
            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm shadow-xl">
                    <Loader2 className="w-8 h-8 text-neutral-400 animate-spin mb-3" />
                    <span className="text-sm font-medium text-neutral-400">Loading {filename ? `"${filename}"` : "Presentation"}...</span>
                </div>
            )}

            {/* Core PDF Renderer Canvas */}
            <div className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`} onClick={(e) => {
                // Clicking the right side goes next, left goes prev for presentation feel
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if (clickX > rect.width / 2) {
                    setPageNumber((prev) => Math.min(prev + 1, numPages));
                } else {
                    setPageNumber((prev) => Math.max(prev - 1, 1));
                }
            }}>
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex justify-center max-w-full max-h-full items-center"
                    loading={null} // Handled by outer div
                    error={
                        <div className="text-red-400 text-sm p-4 text-center">
                            Failed to load presentation. Please verify the file.
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="max-w-full drop-shadow-2xl"
                        width={Math.min(window.innerWidth * 0.8, 800)} // Responsive bounded scaling
                        loading={null}
                    />
                </Document>
            </div>

            {/* Custom Horizontal Controls Overlay */}
            {!isLoading && numPages > 1 && (
                <>
                    {/* Left Absolute Nav Arrow */}
                    <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all disabled:opacity-0 z-10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right Absolute Nav Arrow */}
                    <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all disabled:opacity-0 z-10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Status Pill Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xl tracking-widest">
                        {pageNumber} / {numPages}
                    </div>
                </>
            )}

            {/* Invisible Shield: prevents right clicking standard canvas to save/download */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" onContextMenu={(e) => e.preventDefault()} />
        </div>
    );
}
