"use client";

import { Hero } from "@/components/ui/Hero";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { About } from "@/components/ui/About";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden selection:bg-purple-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="text-xl font-bold font-outfit tracking-tight">meet.</div>
        <div className="flex gap-8 text-sm font-medium text-gray-400">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="mailto:hello@meetshah.design" className="px-4 py-2 bg-white text-black rounded-full hover:scale-105 transition-transform">Get in touch</a>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Projects Section (Netflix Style) */}
      <ProjectGallery />

      {/* About Section (Orbital) */}
      <div id="about">
        <About />
      </div>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5 mt-20">
        <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Meet Shah. Crafted with precision.</p>
      </footer>
    </main>
  );
}
