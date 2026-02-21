import { Navbar } from "@/components/Navbar";
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

  // Filter only published projects for front-end
  const publishedProjects = projects.filter(p => p.status === 'published');

  return (
    <ContactAnimationProvider>
      <GlobalLoader />
      <PlaneOverlay />
      <HomeContainer>
        <Navbar siteTitle={settings.siteTitle} />
        <Hero />
        <ProjectGallery projects={publishedProjects} />
        <AboutMe />
        <footer className="py-24 text-center text-neutral-600 border-t border-neutral-900">
          <p className="font-medium text-sm">© {new Date().getFullYear()} {settings.siteTitle || "Meet Shah"}. Crafted with code & chaos.</p>
        </footer>
      </HomeContainer>
    </ContactAnimationProvider>
  );
}
