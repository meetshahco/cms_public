import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import { AlignCenter, AlignLeft, AlignRight, ArrowDownToLine, ArrowUpToLine, Presentation, Trash2 } from "lucide-react";
import { PDFSlideViewer } from "../../ui/PDFSlideViewer";

export const Slides = Node.create({
    name: "slidesBlock",
    group: "block",
    atom: true,

    addAttributes() {
        return {
            url: { default: null },
            filename: { default: null },
            type: { default: "pdf" }, // "pdf" or "ppt"
            layout: { default: "full" }, // "full", "half-left", "half-right"
        };
    },

    parseHTML() {
        return [{ tag: 'div[data-type="slides-block"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["div", mergeAttributes(HTMLAttributes, { "data-type": "slides-block" })];
    },

    addNodeView() {
        return ReactNodeViewRenderer(SlidesBlockComponent);
    },
});

function SlidesBlockComponent(props: any) {
    const { url, filename, type, layout } = props.node.attrs;

    const setLayout = (newLayout: string) => {
        props.updateAttributes({ layout: newLayout });
    };

    const insertAbove = () => {
        const { editor, getPos } = props;
        editor.chain().focus().insertContentAt(getPos(), { type: "paragraph" }).run();
    };

    const insertBelow = () => {
        const { editor, getPos, node } = props;
        editor.chain().focus().insertContentAt(getPos() + node.nodeSize, { type: "paragraph" }).run();
    };

    const isPdf = type === "pdf" || (url && url.toLowerCase().endsWith(".pdf"));

    return (
        <NodeViewWrapper
            className={`relative group my-2 py-2 px-2 hover:bg-white/[0.01] rounded-2xl transition-colors ${layout === "half-left"
                ? "w-1/2 float-left pr-4"
                : layout === "half-right"
                    ? "w-1/2 float-right pl-4"
                    : "w-full focus:outline-none"
                }`}
            contentEditable={false}
            draggable="true"
            data-drag-handle
        >
            {/* Editor Toolbar (Only visible in CMS on hover) */}
            <div 
                className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a1a] border border-white/10 rounded-xl p-1 flex items-center gap-1 shadow-2xl z-50"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-1 pr-2 border-r border-white/10">
                    <button
                        onClick={() => setLayout("half-left")}
                        className={`p-1.5 rounded-lg transition-colors ${layout === "half-left" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                            }`}
                        title="Half Width (Left)"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setLayout("full")}
                        className={`p-1.5 rounded-lg transition-colors ${layout === "full" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                            }`}
                        title="Full Width"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setLayout("half-right")}
                        className={`p-1.5 rounded-lg transition-colors ${layout === "half-right" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                            }`}
                        title="Half Width (Right)"
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-1 pr-2 border-r border-white/10 ml-1">
                    <button
                        onClick={insertAbove}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Insert Text Above"
                    >
                        <ArrowUpToLine className="w-4 h-4" />
                    </button>
                    <button
                        onClick={insertBelow}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Insert Text Below"
                    >
                        <ArrowDownToLine className="w-4 h-4" />
                    </button>
                </div>
                <div className="pl-1">
                    <button
                        onClick={props.deleteNode}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Remove Document"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Document Render Area */}
            <div
                className={`w-full overflow-hidden border border-white/10 bg-[#111111] transition-all relative ${layout === "full" ? "min-h-[500px] h-[60vh]" : "min-h-[400px] h-[45vh]"
                    } ${isPdf ? "rounded-xl" : "h-auto min-h-0 rounded-xl"}`}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {isPdf ? (
                    <PDFSlideViewer url={url} filename={filename} />
                ) : (
                    <div className="p-4 flex justify-center w-full">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center gap-3 p-4 rounded-xl bg-[#2a2a2a]/50 border border-white/10 hover:bg-white/10 transition-colors text-white no-underline relative z-10"
                        >
                            <Presentation className="w-6 h-6 text-blue-400 flex-shrink-0" />
                            <span className="font-medium truncate overflow-hidden">
                                {filename ? `Download Presentation (${filename})` : "Download Presentation"}
                            </span>
                        </a>
                    </div>
                )}
            </div>
            {/* Float clear fix for half layouts */}
            {(layout === "half-left" || layout === "half-right") && (
                <div className="clear-both" />
            )}
        </NodeViewWrapper>
    );
}
