"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContactAnimation } from "@/context/ContactAnimationContext";

export function PlaneOverlay() {
    const { planePathStart, contactRef, setIsContactCta, viewDeckRef, setIsViewDeckCta, resetAnimation } = useContactAnimation();
    const [pathD, setPathD] = useState<string | null>(null);
    const [pathD2, setPathD2] = useState<string | null>(null);
    const [phase, setPhase] = useState<"idle" | "drawing" | "fading">("idle");

    useEffect(() => {
        if (planePathStart) {
            const startX = planePathStart.x;
            const startY = planePathStart.y;

            let pathsCalculated = 0;

            if (contactRef.current) {
                // Target the center of the contact button (Top Right)
                const contactRect = contactRef.current.getBoundingClientRect();
                const endX = contactRect.left + contactRect.width / 2;
                const endY = contactRect.top + contactRect.height / 2;

                const totalDx = endX - startX;
                const totalDy = endY - startY;

                const loop1X = startX + totalDx * 0.35;
                const loop1Y = startY + totalDy * 0.4 - 50;
                const r1 = 60;

                const loop2X = startX + totalDx * 0.7;
                const loop2Y = startY + totalDy * 0.7 + 50;
                const r2 = 50;

                const rawPath = `
                    M ${startX} ${startY}
                    C ${startX + 50} ${startY - 20}, ${loop1X + r1} ${loop1Y + r1}, ${loop1X + r1} ${loop1Y}
                    C ${loop1X + r1} ${loop1Y - r1 * 1.5}, ${loop1X - r1 * 1.2} ${loop1Y - r1 * 1.5}, ${loop1X - r1 * 1.2} ${loop1Y}
                    C ${loop1X - r1 * 1.2} ${loop1Y + r1 * 1.5}, ${loop2X + r2} ${loop2Y + r2}, ${loop2X + r2} ${loop2Y}
                    C ${loop2X + r2} ${loop2Y - r2 * 1.5}, ${loop2X - r2 * 1.2} ${loop2Y - r2 * 1.5}, ${loop2X - r2 * 1.2} ${loop2Y}
                    C ${loop2X - r2 * 1.2} ${loop2Y + r2 * 1.5}, ${endX - 50} ${endY + 50}, ${endX} ${endY}
                `;
                setPathD(rawPath.replace(/\s+/g, ' ').trim());
                pathsCalculated++;
            }

            if (viewDeckRef.current) {
                // Target the center of the View Deck button (Bottom Center)
                const deckRect = viewDeckRef.current.getBoundingClientRect();
                const endX2 = deckRect.left + deckRect.width / 2;
                const endY2 = deckRect.top + deckRect.height / 2;

                const totalDy2 = endY2 - startY;

                // Create a distinct looping path that swings left before sweeping down to View Deck
                const loop3X = startX - 80;
                const loop3Y = startY + totalDy2 * 0.4;
                const r3 = 50;

                const rawPath2 = `
                    M ${startX} ${startY}
                    C ${startX - 60} ${startY + 20}, ${loop3X - r3} ${loop3Y + r3}, ${loop3X - r3} ${loop3Y}
                    C ${loop3X - r3} ${loop3Y - r3 * 1.5}, ${loop3X + r3 * 1.5} ${loop3Y - r3 * 1.5}, ${loop3X + r3 * 1.5} ${loop3Y}
                    C ${loop3X + r3 * 1.5} ${loop3Y + r3 * 1.5}, ${endX2 - 40} ${endY2 - 40}, ${endX2} ${endY2}
                `;
                setPathD2(rawPath2.replace(/\s+/g, ' ').trim());
                pathsCalculated++;
            }

            if (pathsCalculated > 0) {
                setPhase("drawing");
            }
        }
    }, [planePathStart, contactRef, viewDeckRef]);

    const checkCompletion = () => {
        // Simple timeout since animations are deterministic duration
        setTimeout(() => setPhase("fading"), 1000);
        setTimeout(() => {
            setPhase("idle");
            resetAnimation();
        }, 2000);
    };

    const handlePlane1Reached = () => {
        setIsContactCta(true);
        if (!pathD2) checkCompletion();
    };

    const handlePlane2Reached = () => {
        setIsViewDeckCta(true);
        checkCompletion();
    };

    if (phase === "idle" || (!pathD && !pathD2)) return null;

    const colors = {
        trail: "#38bdf8", // Sky-400 (Clean, bright blue)
        planeBorder: "#0284c7" // Sky-600 dark blue for the outline to pop
    };

    const isDrawing = phase === "drawing";
    const animDuration = 2.2;
    const flightEase = [0.25, 1, 0.5, 1] as [number, number, number, number];

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            <AnimatePresence>
                {isDrawing && (
                    <motion.svg
                        className="w-full h-full absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        <defs>
                            {pathD && (
                                <mask id="dash-mask-1">
                                    <motion.path
                                        d={pathD}
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="10"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: animDuration, ease: flightEase }}
                                    />
                                </mask>
                            )}
                            {pathD2 && (
                                <mask id="dash-mask-2">
                                    <motion.path
                                        d={pathD2}
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="10"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: animDuration, ease: flightEase }}
                                    />
                                </mask>
                            )}
                        </defs>

                        {/* Plane 1 (Contact) */}
                        {pathD && (
                            <>
                                <path
                                    d={pathD}
                                    fill="none"
                                    stroke={colors.trail}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="8 12"
                                    opacity="0.8"
                                    mask="url(#dash-mask-1)"
                                />
                                <motion.g
                                    initial={{ offsetDistance: "0%", opacity: 0, scale: 0.5 }}
                                    animate={{ offsetDistance: "100%", opacity: 1, scale: 1.5 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{ offsetPath: `path('${pathD}')`, offsetRotate: "auto" }}
                                    transition={{ duration: animDuration, ease: flightEase }}
                                    onAnimationComplete={handlePlane1Reached}
                                >
                                    <g transform="translate(0, 0) rotate(15) scale(0.8)">
                                        <path d="M -15 15 L 20 0 L -15 -15 Z" fill={colors.trail} stroke={colors.planeBorder} strokeWidth="2" strokeLinejoin="round" />
                                        <path d="M -15 15 L -5 0 L 20 0 Z" fill={colors.planeBorder} stroke={colors.planeBorder} strokeWidth="2" strokeLinejoin="round" />
                                    </g>
                                </motion.g>
                            </>
                        )}

                        {/* Plane 2 (View Deck) */}
                        {pathD2 && (
                            <>
                                <path
                                    d={pathD2}
                                    fill="none"
                                    stroke={colors.trail} // Using matching color
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="8 12"
                                    opacity="0.8"
                                    mask="url(#dash-mask-2)"
                                />
                                <motion.g
                                    initial={{ offsetDistance: "0%", opacity: 0, scale: 0.5 }}
                                    animate={{ offsetDistance: "100%", opacity: 1, scale: 1.5 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{ offsetPath: `path('${pathD2}')`, offsetRotate: "auto" }}
                                    // Make Plane 2 slightly slower or offset for a cool dual-flight effect
                                    transition={{ duration: animDuration * 1.1, ease: flightEase }}
                                    onAnimationComplete={handlePlane2Reached}
                                >
                                    <g transform="translate(0, 0) rotate(15) scale(0.8)">
                                        <path d="M -15 15 L 20 0 L -15 -15 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
                                        <path d="M -15 15 L -5 0 L 20 0 Z" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
                                    </g>
                                </motion.g>
                            </>
                        )}
                    </motion.svg>
                )}
            </AnimatePresence>
        </div>
    );
}
