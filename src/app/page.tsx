import { Navbar } from "@/components/Navbar";
export const dynamic = "force-dynamic";

import { Hero } from "@/components/Hero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { GlobalLoader } from "@/components/GlobalLoader";
import { HomeContainer } from "@/components/HomeContainer";
import { AboutMe } from "@/components/AboutMe";
import { ContactAnimationProvider } from "@/context/ContactAnimationContext";
import { PlaneOverlay } from "@/components/PlaneOverlay";
import { listProjects, getSettings } from "@/lib/cms/storage";

export default async function Home() {
  const [projects, settings] = await Promise.all([
    listProjects(),
    getSettings()
  ]);

  // Filter only published and starred projects for the homepage gallery
  const featuredProjects = projects.filter(p => p.status === 'published' && p.starred);

  return (
    <ContactAnimationProvider>
      <GlobalLoader />
      <PlaneOverlay />
      <HomeContainer>
        <Navbar siteTitle={settings.siteTitle} />
        <Hero />
        <ProjectGallery projects={featuredProjects} />
        <AboutMe />
        <footer className="py-24 text-center text-neutral-600 border-t border-neutral-900">
          <p className="font-medium text-sm">© {new Date().getFullYear()} {settings.siteTitle || "Meet Shah"} | Portfolio Redesign V2. Crafted with code & chaos.</p>
        </footer>
      </HomeContainer>
    </ContactAnimationProvider>
  );
}
