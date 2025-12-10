import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { WorkExperience } from "@/components/work-experience"
import { Resume } from "@/components/resume"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <WorkExperience />
      <Projects />
      <Resume />
      <Contact />
    </main>
  )
}
