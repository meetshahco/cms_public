"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { GlobalLoader } from "@/components/GlobalLoader";
import { motion } from "framer-motion";

import { AboutMe } from "@/components/AboutMe";
import { ContactAnimationProvider } from "@/context/ContactAnimationContext";
import { PlaneOverlay } from "@/components/PlaneOverlay";

export default function Home() {
  return (
    <ContactAnimationProvider>
      <GlobalLoader />
      <PlaneOverlay />
      <motion.main
        initial={{ filter: "grayscale(100%)" }}
        animate={{ filter: "grayscale(0%)" }}
        transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }} // Sync with loader
        className="min-h-screen bg-black selection:bg-blue-500/30"
      >
        <Navbar />
        <Hero />
        <ProjectGallery />
        <AboutMe />
        <footer className="py-24 text-center text-neutral-600 border-t border-neutral-900">
          <p className="font-medium text-sm">© {new Date().getFullYear()} Meet Shah. Crafted with code & chaos.</p>
        </footer>
      </motion.main>
    </ContactAnimationProvider>
  );
}
