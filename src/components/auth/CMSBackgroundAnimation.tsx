"use client";

import { motion } from "framer-motion";
import {
    FolderOpen,
    Settings,
    FileText,
    LayoutDashboard,
    ChevronRight,
    MoreVertical,
    Plus,
    Search,
    Image as ImageIcon,
    Heading1,
    Code,
    Quote,
    Settings2
} from "lucide-react";

export function CMSBackgroundAnimation() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 selection:bg-transparent bg-[#020202]">

            {/* Background radial gradient to give some depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] z-0" />

            {/* Container for floating cards */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-40 md:opacity-[0.35] blur-[1px] md:blur-[1px] transition-all mix-blend-lighten" style={{ perspective: "2000px" }}>

                {/* =========================================
            CARD 1: DASHBOARD LIST (Top Right)
           ========================================= */}
                <motion.div
                    initial={{ opacity: 0, rotateY: -15, rotateX: 10, rotateZ: 2, scale: 0.8, x: 200, y: -250 }}
                    animate={{
                        opacity: 1,
                        rotateY: [-15, -12, -15],
                        rotateX: [10, 12, 10],
                        rotateZ: [2, 1, 2],
                        y: [-250, -270, -250],
                        x: 180
                    }}
                    transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
                    className="absolute w-[600px] h-[400px] rounded-2xl border border-white/10 bg-[#080808]/90 shadow-2xl overflow-hidden flex backdrop-blur-md"
                >
                    {/* Fake Sidebar */}
                    <div className="w-[160px] border-r border-white/5 bg-[#050505] p-4 flex flex-col gap-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
                                <span className="text-[9px] font-bold text-white">MS</span>
                            </div>
                            <span className="text-[11px] font-medium text-neutral-300">Meet Shah</span>
                        </div>
                        <div className="space-y-1">
                            <div className="px-2 py-1.5 flex items-center gap-2 rounded-md bg-white/5 text-neutral-200 text-[10px]">
                                <LayoutDashboard className="w-3 h-3" /> Overview
                            </div>
                            <div className="px-2 py-1.5 flex items-center gap-2 text-neutral-500 text-[10px]">
                                <FolderOpen className="w-3 h-3" /> Projects
                            </div>
                        </div>
                    </div>
                    {/* Fake Content */}
                    <div className="flex-1 p-5 relative overflow-hidden flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-base font-semibold tracking-tight text-white mb-1">Case Studies</h1>
                            <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-neutral-300 flex items-center gap-1 border border-white/5">
                                <Plus className="w-2.5 h-2.5" /> New
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                                            <FileText className="w-3.5 h-3.5 text-neutral-400" />
                                        </div>
                                        <div>
                                            <div className="h-3 w-32 bg-white/10 rounded-sm mb-1.5" />
                                            <div className="h-2 w-20 bg-white/5 rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* =========================================
            CARD 2: EDITOR (Center Left)
           ========================================= */}
                <motion.div
                    initial={{ opacity: 0, rotateY: 15, rotateX: 5, rotateZ: -2, scale: 0.9, x: -200, y: 0 }}
                    animate={{
                        opacity: 1,
                        rotateY: [15, 18, 15],
                        rotateX: [5, 8, 5],
                        rotateZ: [-2, -3, -2],
                        y: [0, 20, 0],
                        x: -220
                    }}
                    transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                    className="absolute w-[700px] h-[500px] rounded-2xl border border-white/10 bg-[#0a0a0a]/95 shadow-[0_0_100px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col backdrop-blur-xl z-20"
                >
                    {/* Topbar */}
                    <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                            <span className="text-neutral-400">Projects</span> /
                            <span className="text-white">Editor</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-[9px] text-emerald-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" /> Auto-saving
                            </div>
                        </div>
                    </div>
                    {/* Editor Content */}
                    <div className="flex-1 px-12 py-10 relative overflow-hidden flex flex-col gap-6">
                        <div className="relative flex">
                            <div className="text-2xl font-semibold tracking-tight text-white/90 font-serif">Redesigning the architecture.</div>
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-0.5 h-8 bg-neutral-500 ml-1"
                            />
                        </div>
                        <div className="space-y-4 w-4/5">
                            <div className="h-2.5 w-full bg-white/10 rounded-sm" />
                            <div className="h-2.5 w-11/12 bg-white/10 rounded-sm" />
                            <div className="h-2.5 w-4/5 bg-white/10 rounded-sm" />
                        </div>
                        <div className="w-full h-32 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mt-2">
                            <ImageIcon className="w-6 h-6 text-neutral-600" />
                        </div>

                        {/* Slash Command Mockup */}
                        <div className="w-56 rounded-xl bg-[#131313] border border-white/10 shadow-2xl overflow-hidden absolute flex flex-col z-20" style={{ left: "48px", top: "320px" }}>
                            <div className="p-1 space-y-0.5">
                                <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                                        <Heading1 className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-medium text-white">Heading 1</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg">
                                    <div className="w-6 h-6 rounded border border-white/5 flex items-center justify-center">
                                        <Quote className="w-3 h-3 text-neutral-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-medium text-neutral-300">Quote Block</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* =========================================
            CARD 3: MEDIA MENU / SETTINGS (Bottom Right)
           ========================================= */}
                <motion.div
                    initial={{ opacity: 0, rotateY: -10, rotateX: -15, rotateZ: -1, scale: 0.85, x: 150, y: 280 }}
                    animate={{
                        opacity: 1,
                        rotateY: [-10, -5, -10],
                        rotateX: [-15, -10, -15],
                        rotateZ: [-1, 0, -1],
                        y: [280, 260, 280],
                        x: 180
                    }}
                    transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
                    className="absolute w-[450px] h-[300px] rounded-2xl border border-white/10 bg-[#080808]/90 shadow-2xl overflow-hidden flex flex-col backdrop-blur-md"
                >
                    <div className="p-5 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-sm font-medium text-white flex items-center gap-2">
                            <Settings2 className="w-4 h-4 text-neutral-400" /> Site Settings
                        </h2>
                    </div>
                    <div className="p-5 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-3 w-24 bg-white/10 rounded-sm mb-1.5" />
                                <div className="h-2 w-48 bg-white/5 rounded-sm" />
                            </div>
                            <div className="w-10 h-5 rounded-full bg-white/10 relative">
                                <div className="absolute right-1 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-3 w-32 bg-white/10 rounded-sm mb-1.5" />
                                <div className="h-2 w-40 bg-white/5 rounded-sm" />
                            </div>
                            <div className="w-10 h-5 rounded-full bg-white/5 relative">
                                <div className="absolute left-1 top-0.5 w-4 h-4 rounded-full bg-neutral-500 shadow-sm" />
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-neutral-500 p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                            <div className="h-2 w-full bg-white/5 rounded-sm mb-2" />
                            <div className="h-2 w-3/4 bg-white/5 rounded-sm" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
