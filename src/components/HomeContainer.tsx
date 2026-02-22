"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HomeContainer({ children }: { children: ReactNode }) {
    return (
        <motion.main
            initial={{ filter: "grayscale(100%)" }}
            animate={{ filter: "grayscale(0%)" }}
            transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }} // Sync with loader
            className="min-h-screen bg-black selection:bg-blue-500/30"
        >
            {children}
        </motion.main>
    );
}
