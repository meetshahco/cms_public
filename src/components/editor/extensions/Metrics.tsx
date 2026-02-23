import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { Plus, X } from "lucide-react";

export const MetricsBlock = Node.create({
    name: "metricsBlock",
    group: "block",
    atom: true,

    addAttributes() {
        return {
            metrics: {
                default: [
                    { label: "", value: "" },
                ],
            },
            alignment: {
                default: 'center', // 'left', 'right', 'center'
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="metrics-block"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        let metrics = HTMLAttributes.metrics || [];
        if (typeof metrics === 'string') {
            try { metrics = JSON.parse(metrics); } catch { metrics = []; }
        } else if (!Array.isArray(metrics)) {
            metrics = [];
        }
        const alignment = HTMLAttributes.alignment || 'center';

        // Base static layout
        let wrapperClass = "metrics-grid my-8 mb-16 p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm";
        if (alignment === 'left') {
            wrapperClass += " md:float-left md:w-[48%] md:mr-6 md:mb-6 md:clear-left";
        } else if (alignment === 'right') {
            wrapperClass += " md:float-right md:w-[48%] md:ml-6 md:mb-6 md:clear-right";
        } else {
            wrapperClass += " w-full clear-both";
        }

        return [
            "div",
            mergeAttributes(HTMLAttributes, { "data-type": "metrics-block", "class": wrapperClass }),
            [
                "div",
                { class: "grid grid-cols-2 gap-6 md:gap-8" }, // Changed to 2 cols for smaller footprint
                ...metrics.map((m: any) => [
                    "div",
                    { class: "flex flex-col border-l-2 border-white/10 pl-5" },
                    ["span", { class: "text-4xl md:text-5xl font-medium tracking-tight text-white mb-2" }, m.value || "-"],
                    ["span", { class: "text-sm text-neutral-500 uppercase tracking-widest font-medium" }, m.label || "Metric"],
                ])
            ]
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MetricsNodeView);
    },
});

import { useState, useEffect } from "react";

const MetricsNodeView = (props: any) => {
    const { alignment } = props.node.attrs;

    const parseMetrics = (val: any) => {
        if (typeof val === 'string') {
            try { return JSON.parse(val); } catch { return []; }
        }
        return Array.isArray(val) ? val : [];
    };

    const initialMetrics = parseMetrics(props.node.attrs.metrics);

    // Use local state for fast, uninterrupted typing
    const [localMetrics, setLocalMetrics] = useState(initialMetrics.length > 0 ? initialMetrics : [{ label: "", value: "" }]);
    const [localAlignment, setLocalAlignment] = useState(alignment || 'center');

    // Sync from CMS (e.g. if user hits Undo in Tiptap)
    useEffect(() => {
        const parsed = parseMetrics(props.node.attrs.metrics);
        setLocalMetrics(parsed.length > 0 ? parsed : [{ label: "", value: "" }]);
        setLocalAlignment(props.node.attrs.alignment || 'center');
    }, [props.node.attrs.metrics, props.node.attrs.alignment]);

    const updateLocalMetric = (index: number, field: "label" | "value", newValue: string) => {
        const updated = localMetrics.map((m: any, i: number) =>
            i === index ? { ...m, [field]: newValue } : m
        );
        setLocalMetrics(updated);
    };

    const commitMetrics = () => {
        props.updateAttributes({ metrics: localMetrics });
    };

    const commitAlignment = (newAlign: string) => {
        setLocalAlignment(newAlign);
        props.updateAttributes({ alignment: newAlign });
    };

    const addMetric = () => {
        const updated = [...localMetrics, { label: "", value: "" }];
        setLocalMetrics(updated);
        props.updateAttributes({ metrics: updated });
    };

    const removeMetric = (index: number) => {
        const updated = localMetrics.filter((_: any, i: number) => i !== index);
        if (updated.length === 0) {
            props.deleteNode();
        } else {
            setLocalMetrics(updated);
            props.updateAttributes({ metrics: updated });
        }
    };

    let editorWrapperClass = "metrics-block-editor my-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300";
    if (localAlignment === 'left') {
        editorWrapperClass += " md:float-left md:w-[48%] md:mr-6 md:mb-6 md:clear-left";
    } else if (localAlignment === 'right') {
        editorWrapperClass += " md:float-right md:w-[48%] md:ml-6 md:mb-6 md:clear-right";
    } else {
        editorWrapperClass += " w-full clear-both"; // Center/Full width
    }

    return (
        <NodeViewWrapper className={editorWrapperClass} contentEditable={false}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-widest m-0 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Metrics Grid
                    </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {/* Alignment Toggle Group */}
                    <div className="flex bg-[#111] border border-white/10 rounded-lg overflow-hidden mr-2">
                        <button onClick={() => commitAlignment('left')} className={`px-3 py-1.5 transition-colors text-xs font-medium border-r border-white/5 ${localAlignment === 'left' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}>
                            Left (50%)
                        </button>
                        <button onClick={() => commitAlignment('center')} className={`px-3 py-1.5 transition-colors text-xs font-medium border-r border-white/5 ${localAlignment === 'center' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}>
                            Full
                        </button>
                        <button onClick={() => commitAlignment('right')} className={`px-3 py-1.5 transition-colors text-xs font-medium ${localAlignment === 'right' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'}`}>
                            Right (50%)
                        </button>
                    </div>

                    <button
                        onClick={addMetric}
                        className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Metric
                    </button>
                    <button
                        onClick={props.deleteNode}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/10"
                        title="Delete Entire Block"
                    >
                        <X className="w-3.5 h-3.5" />
                        Remove Grid
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {localMetrics.map((m: any, i: number) => (
                    <div key={i} className="relative group bg-[#111] p-5 rounded-xl border border-white/5 cursor-text">
                        <button
                            onClick={() => removeMetric(i)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Remove individual metric"
                        >
                            <X className="w-3 h-3" />
                        </button>
                        <input
                            type="text"
                            value={m.value}
                            onChange={(e) => updateLocalMetric(i, "value", e.target.value)}
                            onBlur={commitMetrics}
                            onKeyDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onMouseUp={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-transparent text-3xl font-bold text-white mb-2 outline-none placeholder-neutral-700"
                            placeholder="e.g. 300%"
                        />
                        <input
                            type="text"
                            value={m.label}
                            onChange={(e) => updateLocalMetric(i, "label", e.target.value)}
                            onBlur={commitMetrics}
                            onKeyDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onMouseUp={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-transparent text-xs text-neutral-400 font-medium uppercase tracking-widest outline-none placeholder-neutral-700"
                            placeholder="e.g. Conversion"
                        />
                    </div>
                ))}
            </div>
        </NodeViewWrapper>
    );
};
