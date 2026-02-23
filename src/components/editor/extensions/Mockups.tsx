import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { useState, useCallback, useRef, useEffect } from "react";
import {
    ImageIcon, LayoutGrid, Palette, X, Upload, GripVertical, Plus,
    Smartphone, Tablet, Laptop, Monitor, MonitorOff, StretchHorizontal,
    MonitorCheck, SmartphoneCharging, ChevronLeft, ChevronRight
} from "lucide-react";

export interface MockupImage {
    id: string;
    url: string;
    caption?: string;
}

// Helper to determine aspect ratio classes when deviceType is 'none'
const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
        case '16:9': return 'aspect-[16/9]';
        case '4:3': return 'aspect-[4/3]';
        case '1:1': return 'aspect-square';
        case '3:4': return 'aspect-[3/4]';
        case '9:16': return 'aspect-[9/16]';
        default: return '';
    }
};

export interface MockupAttrs {
    images: MockupImage[];
    layout: string;
    columns: number;
    deviceType: string;
    mockupStyle: string;
    bezelType: string;
    colorScheme: string;
    hasShadow: boolean;
    cornerRadius: number;
    aspectRatio: string;
}

const MockupFrame = ({ img, attrs }: { img: MockupImage, attrs: MockupAttrs }) => {
    const { deviceType, mockupStyle, bezelType, colorScheme, hasShadow, cornerRadius, aspectRatio } = attrs;

    // Photorealistic styling palettes
    let frameColor = colorScheme === 'light'
        ? 'bg-gradient-to-br from-[#f0f0f0] via-[#e5e5e5] to-[#d4d4d4] shadow-[inset_0_1px_1px_rgba(255,255,255,1)]'
        : 'bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]';

    const borderColor = colorScheme === 'light'
        ? 'border-[#c0c0c0] outline outline-1 outline-white/50'
        : 'border-[#333] outline outline-1 outline-black/50';

    const screenBg = colorScheme === 'light' ? 'bg-white' : 'bg-black';

    // Elegant, deep, modern shadow (Fix applied to outer container)
    const shadowClass = hasShadow ? 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]' : '';

    if (deviceType === 'none') {
        const arClass = aspectRatio !== 'original' ? getAspectRatioClass(aspectRatio) : '';
        return (
            <div className={`overflow-hidden relative w-full ${arClass} ${hasShadow ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : ''}`} style={{ borderRadius: `${cornerRadius}px` }}>
                {arClass ? (
                    <div className="absolute inset-0 overflow-y-auto hide-scrollbar">
                        <img src={img.url} alt="mockup" className="w-full h-auto min-h-full object-cover" />
                    </div>
                ) : (
                    <img src={img.url} alt="mockup" className="w-full h-auto block" />
                )}
            </div>
        );
    }

    // Photorealistic Device Dimensions & Bezels
    let px = "px-2 md:px-3", py = "py-2 md:py-3", rx = "rounded-[2rem] md:rounded-[2.5rem]", screenRx = "rounded-[1.7rem] md:rounded-[2.2rem]";

    if (deviceType === 'tablet') {
        px = "px-4 md:px-5"; py = "py-4 md:py-5"; rx = "rounded-3xl md:rounded-[2.5rem]"; screenRx = "rounded-2xl md:rounded-[2rem]";
    } else if (deviceType === 'laptop') {
        px = "px-2 md:px-3"; py = "pt-2 md:pt-3 pb-6 md:pb-8"; rx = "rounded-xl md:rounded-2xl"; screenRx = "rounded-lg md:rounded-xl";
    } else if (deviceType === 'desktop') {
        px = "px-3 md:px-4"; py = "pt-3 md:pt-4 pb-12 md:pb-16"; rx = "rounded-2xl md:rounded-3xl"; screenRx = "rounded-xl md:rounded-2xl";
    }

    // Apply specific mockup abstraction styles
    let finalFrameColor = frameColor;
    if (mockupStyle === 'style-2') {
        px = "px-5 md:px-8"; py = "py-5 md:py-8"; // Thicker brutalist borders
    } else if (mockupStyle === 'style-3') {
        rx = "rounded-md"; screenRx = "rounded-sm"; px = "px-1.5"; py = "py-1.5"; // Sharp thin modern
        finalFrameColor = colorScheme === 'light' ? 'bg-[#fafafa]' : 'bg-[#111]';
    } else if (mockupStyle === 'style-4') {
        finalFrameColor = "bg-white/10 backdrop-blur-md"; // Glassmorphism outline
    } else if (mockupStyle === 'style-5') {
        py = "pt-10 pb-0"; px = "px-0"; rx = "rounded-t-xl rounded-b-none"; screenRx = "rounded-none"; // Browser Top bar only
        finalFrameColor = colorScheme === 'light' ? 'bg-[#f1f5f9]' : 'bg-[#1e293b]';
    }

    return (
        <div className={`flex flex-col items-center justify-end h-full w-full ${shadowClass}`}>
            <div className={`relative flex flex-col w-full h-auto ${finalFrameColor} border ${borderColor} ${px} ${py} ${rx} transition-all duration-300 z-10`}>

                {/* Glass Reflection / Glare (Adds realistic 3D feel to frame) */}
                {mockupStyle === 'style-1' && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none mix-blend-overlay rounded-inherit z-20" />
                )}

                {/* macOS Style Browser Top Bar */}
                {mockupStyle === 'style-5' && (
                    <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 space-x-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                    </div>
                )}

                {/* Screen constraints block */}
                <div className={`relative flex flex-col w-full ${screenBg} ${screenRx} overflow-hidden border ${colorScheme === 'light' ? 'border-black/5' : 'border-white/5'} shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]`}>

                    {/* Realistic iPhone Bezel Overlays */}
                    {mockupStyle !== 'style-5' && (
                        <div className="absolute top-0 inset-x-0 z-30 flex justify-center pointer-events-none">
                            {bezelType === 'dynamic-island' && (
                                <div className="w-[30%] max-w-[120px] h-6 mt-2 bg-black rounded-full shadow-[inset_0_-1px_2px_rgba(255,255,255,0.15)] flex items-center justify-between px-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                                    <div className="w-3 h-3 rounded-full bg-blue-900/40 border border-blue-800/50" />
                                </div>
                            )}
                            {bezelType === 'notch' && (
                                <div className="w-[45%] max-w-[160px] h-7 bg-black rounded-b-[1.2rem] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-2 pt-1">
                                    <div className="w-10 h-1 rounded-full bg-slate-800" />
                                    <div className="w-2 h-2 rounded-full bg-blue-900/30" />
                                </div>
                            )}
                            {bezelType === 'top-bar' && (
                                <div className="w-full h-10 bg-[#1a1a1a]/80 backdrop-blur-xl flex items-center px-4 space-x-2 border-b border-white/10" >
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Image Container */}
                    <div className={`w-full relative overflow-y-auto hide-scrollbar ${deviceType === 'mobile' ? 'max-h-[calc(100cqw*1.777)] aspect-[9/16] @container' : ''}`}>
                        <img src={img.url} className="w-full h-auto block" alt={img.caption || "mockup"} />
                    </div>
                </div>
            </div>

            {/* Redesigned Photorealistic Stands (Rendered OUTSIDE the frame z-index hierarchy) */}

            {/* iMac-style Stand (Metallic gradient wedge) */}
            {deviceType === 'desktop' && mockupStyle !== 'style-5' && (
                <div className="flex flex-col items-center w-full z-0 -mt-2">
                    {/* Stand Neck */}
                    <div className={`w-[15%] h-12 bg-gradient-to-b from-[#b0b0b0] via-[#d4d4d4] to-[#a0a0a0] dark:from-[#333] dark:via-[#444] dark:to-[#222] border-x border-[#999] dark:border-[#111] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]`} />
                    {/* Stand Base Foot */}
                    <div className={`w-[35%] h-3 bg-gradient-to-b from-[#e0e0e0] to-[#b0b0b0] dark:from-[#444] dark:to-[#222] border border-[#a0a0a0] dark:border-[#111] rounded-t-sm rounded-b-2xl shadow-[0_10px_20px_rgba(0,0,0,0.5)]`} />
                </div>
            )}

            {/* MacBook-style Base Lip (Metallic bottom hinge area) */}
            {deviceType === 'laptop' && mockupStyle !== 'style-5' && (
                <div className={`w-[115%] h-4 bg-gradient-to-b from-[#e5e5e5] to-[#c0c0c0] dark:from-[#3a3a3a] dark:to-[#1a1a1a] border border-[#a0a0a0] dark:border-[#0a0a0a] rounded-b-2xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] -mt-1 z-20 flex items-start justify-center`}>
                    <div className="w-[15%] h-[3px] bg-black/10 dark:bg-white/5 rounded-b-md mt-[1px]" /> {/* Trackpad intent */}
                </div>
            )}
        </div>
    );
};

export const MockupsBlock = Node.create({
    name: "mockupsBlock",
    group: "block",
    atom: true,

    addAttributes() {
        return {
            images: { default: [] },
            layout: { default: "grid" }, // 'grid', 'carousel', 'slider', 'tilted'
            columns: { default: 3 },
            deviceType: { default: "none" }, // 'mobile', 'tablet', 'laptop', 'desktop', 'none'
            mockupStyle: { default: "standard" },
            bezelType: { default: "notch" },
            colorScheme: { default: "dark" },
            hasShadow: { default: false },
            cornerRadius: { default: 12 },
            aspectRatio: { default: "original" }, // '16:9', '4:3', '1:1', '3:4', '9:16', 'original'
            alignment: { default: "center" }, // 'left', 'right', 'center'
        };
    },

    parseHTML() {
        return [{ tag: 'div[data-type="mockups-block"]' }];
    },

    renderHTML({ HTMLAttributes }) {
        const { images = [], layout = 'grid', columns = 3, deviceType, mockupStyle, bezelType, colorScheme, hasShadow, cornerRadius, aspectRatio, alignment = 'center' } = HTMLAttributes;

        // Function to create a statically rendered Mockup Frame
        const createMockupFrameHTML = (img: MockupImage) => {
            let frameColor = colorScheme === 'light'
                ? 'bg-gradient-to-br from-[#f0f0f0] via-[#e5e5e5] to-[#d4d4d4] shadow-[inset_0_1px_1px_rgba(255,255,255,1)]'
                : 'bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]';

            const borderColor = colorScheme === 'light'
                ? 'border-[#c0c0c0] outline outline-1 outline-white/50'
                : 'border-[#333] outline outline-1 outline-black/50';

            const screenBg = colorScheme === 'light' ? 'bg-white' : 'bg-black';
            const shadowClass = hasShadow ? 'drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]' : '';

            if (deviceType === 'none') {
                const arClass = aspectRatio !== 'original' ? getAspectRatioClass(aspectRatio) : '';
                const hasAr = arClass !== '';
                return ['div', { class: `overflow-hidden relative w-full ${arClass} ${hasShadow ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : ''}`, style: `border-radius: ${cornerRadius}px` },
                    hasAr
                        ? ['div', { class: "absolute inset-0 overflow-y-auto hide-scrollbar" }, ['img', { src: img.url, alt: img.caption || "mockup", class: "w-full h-auto min-h-full object-cover" }]]
                        : ['img', { src: img.url, alt: img.caption || "mockup", class: "w-full h-auto block" }]
                ];
            }

            let px = "px-2 md:px-3", py = "py-2 md:py-3", rx = "rounded-[2rem] md:rounded-[2.5rem]", screenRx = "rounded-[1.7rem] md:rounded-[2.2rem]";

            if (deviceType === 'tablet') {
                px = "px-4 md:px-5"; py = "py-4 md:py-5"; rx = "rounded-3xl md:rounded-[2.5rem]"; screenRx = "rounded-2xl md:rounded-[2rem]";
            } else if (deviceType === 'laptop') {
                px = "px-2 md:px-3"; py = "pt-2 md:pt-3 pb-6 md:pb-8"; rx = "rounded-xl md:rounded-2xl"; screenRx = "rounded-lg md:rounded-xl";
            } else if (deviceType === 'desktop') {
                px = "px-3 md:px-4"; py = "pt-3 md:pt-4 pb-12 md:pb-16"; rx = "rounded-2xl md:rounded-3xl"; screenRx = "rounded-xl md:rounded-2xl";
            }

            let finalFrameColor = frameColor;
            if (mockupStyle === 'style-2') {
                px = "px-5 md:px-8"; py = "py-5 md:py-8";
            } else if (mockupStyle === 'style-3') {
                rx = "rounded-md"; screenRx = "rounded-sm"; px = "px-1.5"; py = "py-1.5";
                finalFrameColor = colorScheme === 'light' ? 'bg-[#fafafa]' : 'bg-[#111]';
            } else if (mockupStyle === 'style-4') {
                finalFrameColor = "bg-white/10 backdrop-blur-md";
            } else if (mockupStyle === 'style-5') {
                py = "pt-10 pb-0"; px = "px-0"; rx = "rounded-t-xl rounded-b-none"; screenRx = "rounded-none";
                finalFrameColor = colorScheme === 'light' ? 'bg-[#f1f5f9]' : 'bg-[#1e293b]';
            }

            const bezelHTML = mockupStyle !== 'style-5' ?
                ['div', { class: "absolute top-0 inset-x-0 z-30 flex justify-center pointer-events-none" },
                    bezelType === 'dynamic-island' ? ['div', { class: "w-[30%] max-w-[120px] h-6 mt-2 bg-black rounded-full shadow-[inset_0_-1px_2px_rgba(255,255,255,0.15)] flex items-center justify-between px-2" },
                        ['div', { class: "w-2 h-2 rounded-full bg-slate-800" }],
                        ['div', { class: "w-3 h-3 rounded-full bg-blue-900/40 border border-blue-800/50" }]
                    ] :
                        bezelType === 'notch' ? ['div', { class: "w-[45%] max-w-[160px] h-7 bg-black rounded-b-[1.2rem] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-2 pt-1" },
                            ['div', { class: "w-10 h-1 rounded-full bg-slate-800" }],
                            ['div', { class: "w-2 h-2 rounded-full bg-blue-900/30" }]
                        ] :
                            ['div', { class: "w-full h-10 bg-[#1a1a1a]/80 backdrop-blur-xl flex items-center px-4 space-x-2 border-b border-white/10" },
                                ['div', { class: "w-3 h-3 rounded-full bg-[#ff5f56]" }],
                                ['div', { class: "w-3 h-3 rounded-full bg-[#ffbd2e]" }],
                                ['div', { class: "w-3 h-3 rounded-full bg-[#27c93f]" }]
                            ]
                ] : null;

            const topBarHTML = mockupStyle === 'style-5' ?
                ['div', { class: "absolute top-0 left-0 right-0 h-10 flex items-center px-4 space-x-2 border-b border-white/5" },
                    ['div', { class: "w-3 h-3 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" }],
                    ['div', { class: "w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" }],
                    ['div', { class: "w-3 h-3 rounded-full bg-[#27c93f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" }]
                ] : null;

            const glassGlareHTML = mockupStyle === 'style-1' ?
                ['div', { class: "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none mix-blend-overlay rounded-inherit z-20" }] : null;

            const standHTMLDesktop1 = deviceType === 'desktop' && mockupStyle !== 'style-5' ?
                ['div', { class: `w-[15%] h-12 bg-gradient-to-b from-[#b0b0b0] via-[#d4d4d4] to-[#a0a0a0] dark:from-[#333] dark:via-[#444] dark:to-[#222] border-x border-[#999] dark:border-[#111] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]` }] : null;

            const standHTMLDesktop2 = deviceType === 'desktop' && mockupStyle !== 'style-5' ?
                ['div', { class: `w-[35%] h-3 bg-gradient-to-b from-[#e0e0e0] to-[#b0b0b0] dark:from-[#444] dark:to-[#222] border border-[#a0a0a0] dark:border-[#111] rounded-t-sm rounded-b-2xl shadow-[0_10px_20px_rgba(0,0,0,0.5)]` }] : null;

            const standHTMLLaptop = deviceType === 'laptop' && mockupStyle !== 'style-5' ?
                ['div', { class: `w-[115%] h-4 bg-gradient-to-b from-[#e5e5e5] to-[#c0c0c0] dark:from-[#3a3a3a] dark:to-[#1a1a1a] border border-[#a0a0a0] dark:border-[#0a0a0a] rounded-b-2xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] -mt-1 z-20 flex items-start justify-center` },
                    ['div', { class: "w-[15%] h-[3px] bg-black/10 dark:bg-white/5 rounded-b-md mt-[1px]" }]
                ] : null;

            const mainDivContent = [
                'div', { class: `relative flex flex-col w-full h-auto ${finalFrameColor} border ${borderColor} ${px} ${py} ${rx} transition-all duration-300 z-10` },
                ...(glassGlareHTML ? [glassGlareHTML] : []),
                ...(topBarHTML ? [topBarHTML] : []),
                ['div', { class: `relative flex flex-col w-full ${screenBg} ${screenRx} overflow-hidden border ${colorScheme === 'light' ? 'border-black/5' : 'border-white/5'} shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]` },
                    ...(bezelHTML ? [bezelHTML] : []),
                    ['div', { class: `w-full relative overflow-y-auto hide-scrollbar ${deviceType === 'mobile' ? 'max-h-[calc(100cqw*1.777)] aspect-[9/16] @container' : ''}` },
                        ['img', { src: img.url, class: "w-full h-auto block", alt: img.caption || "mockup" }]
                    ]
                ]
            ];

            return ['div', { class: `flex flex-col items-center justify-end h-full w-full ${shadowClass}` },
                mainDivContent,
                ...(deviceType === 'desktop' && mockupStyle !== 'style-5' ? [
                    ['div', { class: "flex flex-col items-center w-full z-0 -mt-2" },
                        standHTMLDesktop1!,
                        standHTMLDesktop2!
                    ]
                ] : []),
                ...(standHTMLLaptop ? [standHTMLLaptop] : [])
            ];
        };

        const imageNodes = images.map((img: MockupImage) => createMockupFrameHTML(img));

        let containerAttrs = { class: "mockups-block-container my-8" };
        let contentArr: any[] = [];

        if (layout === 'grid') {
            contentArr = ['div', { class: `grid gap-6 p-4 max-w-7xl mx-auto w-full items-start`, style: `grid-template-columns: repeat(${columns}, minmax(0, 1fr))` }, ...imageNodes];
        } else if (layout === 'slider') {
            contentArr = ['div', { class: "flex items-start gap-6 p-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full", style: "scroll-snap-type: x mandatory;" },
                ...imageNodes.map((node: any) => ['div', { class: "flex-none w-[85%] md:w-[60%] snap-center shrink-0 first:ml-[7.5%] md:first:ml-[20%] last:mr-[7.5%] md:last:mr-[20%]" }, node])
            ];
        } else if (layout === 'carousel') {
            contentArr = ['div', { class: "relative flex justify-center items-center py-16 bg-transparent overflow-hidden group w-full h-[85vh] min-h-[600px] my-6 rounded-xl" },
                // Add placeholder navigation buttons for the static frontend
                ['button', { class: "absolute left-4 md:left-12 z-[100] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30", "data-carousel-prev": "true" },
                    ['svg', { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, ['polyline', { points: "15 18 9 12 15 6" }]]
                ],
                ['button', { class: "absolute right-4 md:right-12 z-[100] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30", "data-carousel-next": "true" },
                    ['svg', { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, ['polyline', { points: "9 18 15 12 9 6" }]]
                ],
                ['div', { class: "flex items-center justify-center w-full relative h-[100%] max-h-[1000px] carousel-track" },
                    ...imageNodes.map((node: any, i: number) => {
                        // Static frontend renders the first item as active
                        const offset = i;
                        const absOffset = Math.abs(offset);
                        // Scale downs: 1 -> 0.85 -> 0.70
                        const scale = 1 - (absOffset * 0.15);
                        // Translation proportional to their scaled size to keep them nicely side-by-side
                        const translateX = offset * 115;
                        const zIndex = 50 - absOffset;
                        // Fade out lightly or hide if > 2
                        const opacity = absOffset > 2 ? 0 : 1;

                        const transform = `translateX(${translateX}%) scale(${scale})`;
                        // Base width uses VW to fill exactly 5 items across max
                        return ['div', { class: "absolute w-[65vw] sm:w-[45vw] md:w-[32vw] lg:w-[26vw] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-center carousel-slide", "data-index": i, style: `transform: ${transform}; z-index: ${zIndex}; opacity: ${opacity};` }, node];
                    })
                ]
            ];
        } else if (layout === 'tilted') {
            contentArr = ['div', { class: "p-4 md:p-12 overflow-hidden bg-[#141414] rounded-xl w-full relative flex items-center justify-center min-h-[600px] my-6 border-y border-white/5" },
                ['div', { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 w-[150%] transform -rotate-12 scale-110" },
                    ...images.map((img: any, i: number) => {
                        // Clean, unified masonry stagger pattern
                        const translateYs = [0, 40, -30, 20, -10];
                        const translateY = translateYs[i % translateYs.length];
                        return ['div', {
                            class: "relative w-full transition-transform duration-500 hover:scale-[1.05]",
                            style: `transform: translateY(${translateY}px); z-index: ${i + 1};`
                        }, createMockupFrameHTML(img)];
                    })
                ]
            ];
        }

        return ["div", mergeAttributes(HTMLAttributes, containerAttrs), contentArr];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MockupsNodeView);
    },
});

const MockupsNodeView = (props: any) => {
    const {
        images, layout, columns, deviceType, mockupStyle,
        bezelType, colorScheme, hasShadow, cornerRadius, aspectRatio, alignment = 'center'
    } = props.node.attrs;

    const [activeTab, setActiveTab] = useState<"images" | "layout" | "styles">("images");
    const [isEditing, setIsEditing] = useState(images.length === 0); // Open editor by default if empty
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

    const updateAttr = (key: string, value: any) => {
        props.updateAttributes({ [key]: value });
    };

    // --- Image Upload Logic ---
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (files: FileList | File[]) => {
        setUploading(true);
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith("image/")) continue;

            const formData = new FormData();
            formData.append("file", file);
            try {
                const res = await fetch("/api/cms/upload", { method: "POST", body: formData });
                if (res.ok) {
                    const data = await res.json();
                    newImages.push({
                        id: Math.random().toString(36).substring(7),
                        url: data.url,
                    });
                }
            } catch (error) {
                console.error("Upload failed", error);
            }
        }

        updateAttr("images", newImages);
        setUploading(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files);
        }
    };

    const removeImage = (id: string) => {
        updateAttr("images", images.filter((img: MockupImage) => img.id !== id));
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === images.length - 1)) return;
        const newImages = [...images];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        updateAttr("images", newImages);
    };


    // --- UI Renderers ---

    const renderImagesTab = () => (
        <div className="space-y-4">
            <div
                className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/[0.02] hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleFileInput} />
                <div className="w-12 h-12 rounded-full bg-white/5 mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                    {uploading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Upload className="w-5 h-5" />}
                </div>
                <p className="text-sm font-medium text-neutral-300">Click or drag images to upload</p>
                <p className="text-xs text-neutral-500 mt-1">Supports PNG, JPG, GIF, WEBP</p>
            </div>

            {images.length > 0 && (
                <div className="space-y-2 mt-4">
                    {images.map((img: MockupImage, index: number) => (
                        <div key={img.id} className="flex items-center gap-3 bg-[#111] p-2 rounded-lg border border-white/5">
                            <div className="flex flex-col gap-1 px-1">
                                <button onClick={() => moveImage(index, 'up')} disabled={index === 0} className="text-neutral-600 hover:text-white disabled:opacity-30"><GripVertical className="w-3 h-3 rotate-90" /></button>
                                <button onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1} className="text-neutral-600 hover:text-white disabled:opacity-30"><GripVertical className="w-3 h-3 rotate-90" /></button>
                            </div>
                            <img src={img.url} alt="mockup" className="w-12 h-12 rounded object-cover bg-white/5" />
                            <div className="flex-1">
                                <span className="text-xs font-medium text-neutral-400">Image {index + 1}</span>
                            </div>
                            <button onClick={() => removeImage(img.id)} className="p-2 text-neutral-500 hover:text-red-400 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderLayoutTab = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Layout</label>
                <div className="grid grid-cols-2 gap-2">
                    {['grid', 'carousel', 'slider', 'tilted'].map(l => (
                        <button
                            key={l}
                            onClick={() => updateAttr('layout', l)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm capitalize transition-colors ${layout === l ? 'border-white/20 bg-white/10 text-white' : 'border-white/5 bg-transparent text-neutral-400 hover:bg-white/5'}`}
                        >
                            {l === 'grid' && <LayoutGrid className="w-4 h-4" />}
                            {l === 'carousel' && <StretchHorizontal className="w-4 h-4" />}
                            {l === 'slider' && <StretchHorizontal className="w-4 h-4" />}
                            {l === 'tilted' && <LayoutGrid className="w-4 h-4 rotate-12" />}
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            {layout === 'grid' && (
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Number of columns</label>
                        <span className="text-xs font-medium text-white bg-white/10 px-2 py-0.5 rounded">{columns}</span>
                    </div>
                    <input
                        type="range" min="1" max="8" value={columns}
                        onChange={(e) => updateAttr('columns', parseInt(e.target.value))}
                        className="w-full accent-white"
                    />
                </div>
            )}
        </div>
    );

    const renderStylesTab = () => (
        <div className="space-y-6">
            {/* Float / Alignment Settings */}
            <div>
                <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3 block">Alignment</label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: 'left', label: 'L (50%)' },
                        { id: 'center', label: 'Full' },
                        { id: 'right', label: 'R (50%)' }
                    ].map((algn) => (
                        <button
                            key={algn.id}
                            onClick={() => updateAttr('alignment', algn.id)}
                            className={`py-2 px-1 text-xs rounded-lg border font-medium transition-all ${alignment === algn.id
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {algn.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Device type</label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                        { id: 'tablet', icon: Tablet, label: 'Tablet' },
                        { id: 'laptop', icon: Laptop, label: 'Laptop' },
                        { id: 'desktop', icon: Monitor, label: 'Desktop' },
                        { id: 'none', icon: MonitorOff, label: 'None' },
                    ].map(d => (
                        <button
                            key={d.id}
                            onClick={() => updateAttr('deviceType', d.id)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-colors ${deviceType === d.id ? 'border-white/20 bg-white/10 text-white' : 'border-white/5 bg-transparent text-neutral-400 hover:bg-white/5'}`}
                        >
                            <d.icon className="w-5 h-5" />
                            <span className="text-[10px] uppercase tracking-wider font-semibold">{d.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {deviceType === 'none' ? (
                <>
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Corner Radius</label>
                            <span className="text-xs font-medium text-white bg-white/10 px-2 py-0.5 rounded">{cornerRadius}px</span>
                        </div>
                        <input
                            type="range" min="0" max="64" value={cornerRadius}
                            onChange={(e) => updateAttr('cornerRadius', parseInt(e.target.value))}
                            className="w-full accent-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Aspect Ratio</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['16:9', '4:3', '1:1', '3:4', '9:16', 'original'].map(ar => (
                                <button
                                    key={ar}
                                    onClick={() => updateAttr('aspectRatio', ar)}
                                    className={`py-2 rounded-lg border text-xs font-medium tracking-wide transition-colors ${aspectRatio === ar ? 'border-white/20 bg-white/10 text-white' : 'border-white/5 bg-transparent text-neutral-400 hover:bg-white/5'}`}
                                >
                                    {ar}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Mockup style</label>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((styleId) => (
                                <button
                                    key={`style-${styleId}`}
                                    onClick={() => updateAttr('mockupStyle', `style-${styleId}`)}
                                    className={`w-12 h-12 rounded-lg border transition-all flex items-center justify-center overflow-hidden relative ${mockupStyle === `style-${styleId}` ? 'border-white bg-[#222]' : 'border-white/5 bg-[#111] hover:bg-white/5'}`}
                                >
                                    {/* Abstract SVG representation of the mockup frame corner styles based on user screenshot */}
                                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 absolute bottom-0 right-0 translate-x-1 translate-y-1">
                                        {styleId === 1 && <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" />}
                                        {styleId === 2 && <rect x="2" y="2" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="4" />}
                                        {styleId === 3 && <rect x="6" y="6" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1" />}
                                        {styleId === 4 && <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="2" />}
                                        {styleId === 5 && <path d="M4 12V6C4 4.89543 4.89543 4 6 4H12" stroke="currentColor" strokeWidth="2" />}
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Bezel type</label>
                        <div className="flex gap-2">
                            {['dynamic-island', 'notch', 'top-bar'].map((bezel) => (
                                <button
                                    key={bezel}
                                    onClick={() => updateAttr('bezelType', bezel)}
                                    className={`w-16 h-12 rounded-lg border transition-all flex items-start justify-center pt-1.5 ${bezelType === bezel ? 'border-white bg-[#222]' : 'border-white/5 bg-[#111] hover:bg-white/5'}`}
                                >
                                    <svg width="32" height="16" viewBox="0 0 32 16" fill="currentColor" className="text-neutral-500">
                                        {bezel === 'dynamic-island' && <rect x="8" y="0" width="16" height="5" rx="2.5" />}
                                        {bezel === 'notch' && <path d="M8 0H24V2C24 4.20914 22.2091 6 20 6H12C9.79086 6 8 4.20914 8 2V0Z" />}
                                        {bezel === 'top-bar' && <rect x="0" y="0" width="32" height="4" />}
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Color scheme</label>
                        <div className="flex gap-2">
                            {['light', 'dark'].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => updateAttr('colorScheme', color)}
                                    className={`w-12 h-12 rounded-lg border transition-all flex items-center justify-center ${colorScheme === color ? 'border-white bg-[#222]' : 'border-white/5 bg-[#111] hover:bg-white/5'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full border border-white/10 ${color === 'light' ? 'bg-white' : 'bg-black'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">Device shadow</label>
                        <div className="flex gap-2">
                            {[false, true].map((shadowVal) => (
                                <button
                                    key={shadowVal.toString()}
                                    onClick={() => updateAttr('hasShadow', shadowVal)}
                                    className={`w-12 h-12 rounded-lg border transition-all flex items-center justify-center ${hasShadow === shadowVal ? 'border-white bg-[#222]' : 'border-white/5 bg-[#111] hover:bg-white/5'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full border border-white/50 ${shadowVal ? 'shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );

    let layoutClass = "mockups-block-editor my-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300";
    if (alignment === 'left') {
        layoutClass += " md:float-left md:w-[48%] md:mr-8 md:mb-8 md:clear-left z-10 relative";
    } else if (alignment === 'right') {
        layoutClass += " md:float-right md:w-[48%] md:ml-8 md:mb-8 md:clear-right z-10 relative";
    } else {
        layoutClass += " w-full clear-both"; // Center
    }

    return (
        <NodeViewWrapper className={layoutClass} contentEditable={false}>
            {/* Consistent Headers Container */}
            <div>
                <div className={`flex items-center justify-between ${images.length === 0 ? 'mb-6 pb-4 border-b border-white/5' : ''}`}>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-widest m-0">Mockups Grid</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        {images.length > 0 && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                            >
                                <Palette className="w-3.5 h-3.5" />
                                Edit Mockups
                            </button>
                        )}
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

                {images.length === 0 && (
                    <div className="text-center py-8">
                        <MonitorCheck className="w-12 h-12 mx-auto text-neutral-700 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Mockups Block</h3>
                        <p className="text-sm text-neutral-500 mb-6">Upload images and wrap them in beautiful device frames.</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
                        >
                            Configure Mockups
                        </button>
                    </div>
                )}
            </div>

            {images.length > 0 && (
                <div className="mt-6">
                    <div>
                        {/* Editor Preview Active */}
                        <div className="text-xs text-neutral-500 mb-4 uppercase tracking-widest text-center">Editor Preview Active ({images.length} images)</div>

                        {layout === 'grid' && (
                            <div className="grid gap-6 p-4 bg-white/[0.01] rounded-xl overflow-hidden items-start" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                                {images.map((img: MockupImage, i: number) => (
                                    <MockupFrame key={i} img={img} attrs={props.node.attrs as MockupAttrs} />
                                ))}
                            </div>
                        )}

                        {layout === 'slider' && (
                            <div className="flex gap-4 p-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar bg-white/[0.01] rounded-xl w-full items-start" style={{ scrollSnapType: 'x mandatory' }}>
                                {images.map((img: MockupImage, i: number) => (
                                    <div key={i} className="flex-none w-[80%] max-w-[600px] snap-center shrink-0 first:ml-[10%] last:mr-[10%]">
                                        <MockupFrame img={img} attrs={props.node.attrs as MockupAttrs} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {layout === 'carousel' && (
                            <div className="relative flex justify-center items-center py-12 bg-[#141414] overflow-hidden group border-y border-white/5 w-full h-[85vh] min-h-[600px] my-6 rounded-xl">

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveCarouselIndex(prev => Math.max(0, prev - 1)); }}
                                            disabled={activeCarouselIndex === 0}
                                            className="absolute left-4 md:left-12 z-[100] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hover:scale-105"
                                        >
                                            <ChevronLeft className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveCarouselIndex(prev => Math.min(images.length - 1, prev + 1)); }}
                                            disabled={activeCarouselIndex === images.length - 1}
                                            className="absolute right-4 md:right-12 z-[100] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hover:scale-105"
                                        >
                                            <ChevronRight className="w-8 h-8" />
                                        </button>
                                    </>
                                )}

                                <div className="flex items-center justify-center w-full relative h-[100%] max-h-[1000px]">
                                    {images.map((img: MockupImage, i: number) => {
                                        const offset = i - activeCarouselIndex;
                                        const absOffset = Math.abs(offset);

                                        // Scaling logic to show 5 items max on screen (Center, Left1, Right1, Left2, Right2)
                                        const scale = 1 - (absOffset * 0.15); // 1.0 -> 0.85 -> 0.70
                                        const translateX = offset * 115; // Translates based on base width. 115% gives a tight gap.
                                        const zIndex = 50 - absOffset;
                                        const opacity = absOffset > 2 ? 0 : 1; // Keep full opacity for visible 5 items

                                        const transform = `translateX(${translateX}%) scale(${scale})`;

                                        // Width set using VW relative to viewport to guarantee breaking out format
                                        return (
                                            <div key={i} className="absolute w-[65vw] sm:w-[45vw] md:w-[32vw] lg:w-[26vw] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-center" style={{ transform, zIndex, opacity, pointerEvents: absOffset === 0 ? 'auto' : 'none' }}>
                                                <MockupFrame img={img} attrs={props.node.attrs as MockupAttrs} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {layout === 'tilted' && (
                            <div className="p-4 md:p-12 overflow-hidden bg-[#141414] rounded-xl w-full relative flex items-center justify-center min-h-[600px] my-6 border-y border-white/5">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 w-[150%] transform -rotate-12 scale-110">
                                    {images.map((img: MockupImage, i: number) => {
                                        // Clean, unified masonry stagger pattern
                                        const translateYs = [0, 40, -30, 20, -10];
                                        const translateY = translateYs[i % translateYs.length];

                                        return (
                                            <div
                                                key={i}
                                                className="relative w-full transition-transform duration-500 hover:scale-[1.05]"
                                                style={{ transform: `translateY(${translateY}px)`, zIndex: i + 1 }}
                                            >
                                                <MockupFrame img={img} attrs={props.node.attrs as MockupAttrs} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Edit Section Modal / Sidebar overlay */}
            {isEditing && (
                <div className="fixed top-24 right-4 md:right-8 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-[200] overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
                        <h3 className="text-base font-medium text-white">Edit section</h3>
                        <button onClick={() => setIsEditing(false)} className="text-neutral-400 hover:text-white p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex border-b border-white/5 px-2 bg-[#1a1a1a]">
                        {[
                            { id: 'images', label: 'Images' },
                            { id: 'layout', label: 'Layout' },
                            { id: 'styles', label: 'Styles' },
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id as any)}
                                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === t.id ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-white hover:border-white/30'}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                        {activeTab === 'images' && renderImagesTab()}
                        {activeTab === 'layout' && renderLayoutTab()}
                        {activeTab === 'styles' && renderStylesTab()}
                    </div>
                </div>
            )}
        </NodeViewWrapper>
    );
};
