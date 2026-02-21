"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ContactAnimationProvider } from "@/context/ContactAnimationContext";

export default function AboutPage() {
    return (
        <ContactAnimationProvider>
            <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
                <Navbar />

                {/* Background ambient glow matching hero */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full max-w-2xl relative z-10 flex flex-col items-center text-center">
                    {/* Coming Soon Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-16"
                    >
                        <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-md mb-6 border border-white/5">
                            Coming Soon
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
                            About Me.
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-md mx-auto">
                            I&apos;m curating the story behind my journey as a Product Designer. Stay tuned for a deeper look into who I am and what drives my work.
                        </p>
                    </motion.div>
                </div>
            </main>
        </ContactAnimationProvider>
    );
}
