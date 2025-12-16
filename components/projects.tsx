"use client"

import { useState } from "react"
import { ProjectSlide } from "./project-slide"

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      id: "001",
      title: "IDEATE - AN AI-POWERED WHITEBOARD",
      description:
        "An ideation platform that turns hand-drawn sketches and written concepts into structured product blueprints. It generates flowcharts, business pitches, competitive analyses, and 90-day roadmaps using NVIDIA Nemotron's vision and text models. Built the interactive whiteboard with Canvas API for precise drawing and shape recognition, plus Next.js REST APIs for sketch analysis and Mermaid diagram generation. Won top-5 at HackUTD 2025 for the NVIDIA track.",
      tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Supabase", "Nemotron", "Canvas API"],
      status: "COMPLETE",
      image: "/project-showcase.jpg",
      links: {
        project: "https://github.com/Drakatoa",
        code: "https://github.com/Drakatoa",
      },
    },
    {
      id: "002",
      title: "AURALIS",
      description:
        "A sound generation platform that creates studio-quality audio effects from text prompts. Uses PyTorch AudioLDM for real-time synthesis with CUDA acceleration and Google Gemini for adaptive prompt refinement. Built the frontend with Next.js and Supabase auth, plus a Flask REST API backend for low-latency audio streaming. Includes a public sound library with likes and engagement tracking.",
      tech: ["Next.js", "Flask", "PyTorch AudioLDM", "PostgreSQL", "Supabase", "Gemini API"],
      status: "IN PROGRESS",
      image: "/neural-network-visualization-black-white.jpg",
      links: {
        project: "https://github.com/Drakatoa",
        code: "https://github.com/Drakatoa",
      },
    },
    {
      id: "003",
      title: "PREFACE",
      description:
        "A capstone project with Fisher Investments reimagining how hiring works. Instead of cover letters, applicants complete interactive, role-specific courses that build real skills and earn verifiable certificates. Employers get detailed assessment breakdowns across technical proficiency, soft skills, and values alignment. Built high-fidelity Figma prototypes and React components for the applicant dashboard and HR portal.",
      tech: ["Figma", "React", "UX Research"],
      status: "CASE STUDY",
      image: "/placeholder.jpg",
      links: {
        project: "https://aed-preface.vercel.app/",
        code: "#",
        caseStudy: "/case-studies/preface",
      },
    },
    {
      id: "004",
      title: "DESIGNING FOR REAL INCLUSION",
      description:
        "HCI research on nonbinary student experiences at UTD after 28% reported not feeling a sense of belonging. Conducted qualitative interviews that revealed students only found resources through informal networks and existing policies lacked enforcement. Proposed interventions including a centralized LGBTQ+ resource hub, anonymous feedback system for misgendering incidents, and inclusive event feed. Presented findings to UTD faculty and administration.",
      tech: ["Qualitative Research", "Figma", "UX"],
      status: "CASE STUDY",
      image: "/placeholder-user.jpg",
      links: {
        project: "https://www.behance.net/rajitgoel",
        code: "#",
        caseStudy: "/case-studies/inclusion",
      },
    },
    {
      id: "005",
      title: "HACKMATE",
      description:
        "A web platform for connecting hackathon participants and forming teams. Built frontend components with React for navigation, group management tools, and contact forms integrated with backend APIs. Focused on making team formation and project collaboration feel smooth and intuitive.",
      tech: ["React", "CSS", "Figma"],
      status: "COMPLETE",
      image: "/dark-abstract-tech-project-black-white.jpg",
      links: {
        project: "https://github.com/Drakatoa",
        code: "https://github.com/Drakatoa",
      },
    },
    {
      id: "006",
      title: "PROJECT PAWKOUR",
      description:
        "A third-person parkour game built in Unity where you control a cat escaping from a secret laboratory. Features fluid movement including running, jumping, dashing, and wall-running through a low-poly lab environment. Custom C# scripts handle physics-based movement, dynamic camera following, and adaptive music that intensifies with player velocity. Team project that combined animation, UI design, lighting, and custom audio composition.",
      tech: ["Unity", "C#", "OpenGL", "Figma"],
      status: "COMPLETE",
      image: "/placeholder.jpg",
      links: {
        project: "/pawkour-game.zip",
        code: "https://github.com/Drakatoa/Project-Pawkour",
        videoUrl: "/pawkour-demo.mp4",
      },
    },
  ]

  const currentProject = projects[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="relative">
      <ProjectSlide
        title={currentProject.title}
        description={currentProject.description}
        tags={currentProject.tech}
        imageUrl={currentProject.image}
        status={currentProject.status}
        index={currentIndex + 1}
        total={projects.length}
        projectUrl={currentProject.links.project}
        codeUrl={currentProject.links.code}
        caseStudyUrl={currentProject.links.caseStudy}
        videoUrl={currentProject.links.videoUrl}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  )
}
