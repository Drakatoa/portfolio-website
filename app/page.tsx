import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { WorkExperience } from "@/components/work-experience"
import { Navigation } from "@/components/navigation"
import { CurrentlyInto } from "@/components/currently-into"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <WorkExperience />
      <Projects />
      <CurrentlyInto />
      <footer className="border-t border-white/20 py-8 px-6 text-center">
        <p className="text-xs text-white/40">
          {"© 2025 RAJIT GOEL ✦ ragoel123@gmail.com"}
        </p>
      </footer>
    </main>
  )
}
