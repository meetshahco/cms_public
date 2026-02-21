"use client";

import { Mail, Phone, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ContactAnimationProvider } from "@/context/ContactAnimationContext";

export default function ContactPage() {
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
                            Let&apos;s build something.
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-md mx-auto">
                            A full contact experience is in the works. For now, you can reach me directly through any of the channels below.
                        </p>
                    </motion.div>

                    {/* Contact Links Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
                    >
                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/in/m-design"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] group-hover:scale-110 transition-transform duration-300">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold text-white">LinkedIn</h3>
                                <p className="text-sm text-neutral-400">@m-design</p>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:hey@meetshah.co"
                            className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold text-white">Email</h3>
                                <p className="text-sm text-neutral-400">hey@meetshah.co</p>
                            </div>
                        </a>

                        {/* Phone/WhatsApp */}
                        <a
                            href="https://wa.me/919033230878"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform duration-300">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold text-white">WhatsApp</h3>
                                <p className="text-sm text-neutral-400">+91 90332 30878</p>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </main>
        </ContactAnimationProvider>
    );
}
