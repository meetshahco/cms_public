"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function GlobalLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500); // 2.5s simulated load
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="flex items-center gap-4"
                        >
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <span className="font-heading text-4xl font-bold text-white tracking-widest uppercase">
                                Meet Shah
                            </span>
                            <div className="h-2 w-2 rounded-full bg-white" />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
