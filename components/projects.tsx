"use client"

import { useState, useMemo, useEffect } from "react"
import { ProjectSlide } from "./project-slide"
import { ProjectGrid } from "./project-grid"
import Image from "next/image"

type FilterType = "all" | "case-studies" | "code"
type ViewType = "carousel" | "grid"

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState<FilterType>("all")
  const [view, setView] = useState<ViewType>("carousel")

  const projects = [
    {
      id: "001",
      title: "PREFACE",
      description:
        "A capstone project with Fisher Investments reimagining how hiring works. Instead of cover letters, applicants complete interactive, role-specific courses that build real skills and earn verifiable certificates. Employers get detailed assessment breakdowns across technical proficiency, soft skills, and values alignment. Built high-fidelity Figma prototypes and React components for the applicant dashboard and HR portal.",
      tech: ["Next.js", "TypeScript", "React", "Figma", "UX Research"],
      status: "CASE STUDY",
      image: "/prefaceproject.png",
      links: {
        project: "https://aed-preface.vercel.app/",
        code: "https://github.com/Drakatoa/aed-preface-atcm4341",
        caseStudy: "/case-studies/preface",
        videoUrl: "https://drive.google.com/file/d/1EEE9ZcNRo40xqruDH688TkFfKuZ9k0vG/preview",
        videoLabel: "WATCH PROMO",
      },
    },
    {
      id: "002",
      title: "AEGIS",
      description:
        "A lightweight browser extension that puts trust and privacy back in the user's hands. Provides real-time website safety scores based on aggregated reviews and sentiment analysis, community-powered threat reporting for flagging dangerous sites automated scanners might miss, and smart autofill that creates profiles (Personal vs Work) and restricts sensitive data to trusted sites only. Built with vanilla JavaScript for performance under 500KB.",
      tech: ["Vanilla JavaScript", "Supabase", "Email.js", "Chrome Extensions API", "Figma"],
      status: "CASE STUDY",
      image: "/aegisproject.png",
      links: {
        // project: "https://drive.google.com/file/d/1r0OKNek3FWYNxlZFuWaseIb7fTSuNMB1/view?usp=sharing",
        code: "https://github.com/Drakatoa/Aegis",
        caseStudy: "/case-studies/aegis",
        videoUrl: "https://www.youtube.com/embed/5ndbzVFQ15c",
        videoLabel: "WATCH DEMO",
      },
    },
    {
      id: "003",
      title: "PROJECT PAWKOUR",
      description:
        "A third-person parkour game built in Unity where you control a cat escaping from a secret laboratory. Features fluid movement including running, jumping, dashing, and wall-running through a low-poly lab environment. Custom C# scripts handle physics-based movement, dynamic camera following, and adaptive music that intensifies with player velocity. Team project that combined animation, UI design, lighting, and custom audio composition.",
      tech: ["Unity", "C#", "OpenGL", "Figma"],
      status: "COMPLETE",
      image: "/projectpawkour.png",
      links: {
        // project: "https://drive.google.com/file/d/1-pmvv_ZrK1DE11ah-lo9y2lI_5p6kzeo/view?usp=sharing",
        code: "https://github.com/Drakatoa/Project-Pawkour",
        videoUrl: "https://drive.google.com/file/d/1mvEWaFJAOHNpSeNnPKCat9HdkTO29SjV/preview",
        videoLabel: "WATCH SPEEDRUN",
      },
    },
    {
      id: "004",
      title: "AURALIS",
      description:
        "A sound generation platform that creates studio-quality audio effects from text prompts. Uses PyTorch AudioLDM for real-time synthesis with CUDA acceleration and Google Gemini for adaptive prompt refinement. Built the frontend with Next.js and Supabase auth, plus a Flask REST API backend for low-latency audio streaming. Includes a public sound library with likes and engagement tracking.",
      tech: ["Next.js", "Flask", "PyTorch AudioLDM", "PostgreSQL", "Supabase", "Gemini API"],
      status: "IN PROGRESS",
      image: "/auralisproject.png",
      links: {
        code: "https://github.com/Drakatoa/Auralis",
      },
    },
    {
      id: "005",
      title: "IDEATE - AI WHITEBOARD",
      description:
        "An ideation platform that turns hand-drawn sketches and written concepts into structured product blueprints. It generates flowcharts, business pitches, competitive analyses, and 90-day roadmaps using NVIDIA Nemotron's vision and text models. Built the interactive whiteboard with Canvas API for precise drawing and shape recognition, plus Next.js REST APIs for sketch analysis and Mermaid diagram generation. Won top-5 at HackUTD 2025 for the NVIDIA track.",
      tech: ["Next.js 16", "TypeScript", "PostgreSQL", "Supabase", "Nemotron", "Canvas API"],
      status: "COMPLETE",
      image: "/ideateproject.png",
      links: {
        project: "https://ideatehackutd2025.vercel.app/",
        code: "https://github.com/Drakatoa/ideatehackutd2025",
        devpost: "https://devpost.com/software/ideate-mratxn",
        videoUrl: "https://www.youtube.com/embed/2ebeNaF3sto",
        videoLabel: "WATCH DEMO",
      },
    },
    {
      id: "006",
      title: "DESIGN FOR INCLUSION",
      description:
        "HCI research on nonbinary student experiences at UTD after 28% reported not feeling a sense of belonging. Conducted qualitative interviews that revealed students only found resources through informal networks and existing policies lacked enforcement. Proposed interventions including a centralized LGBTQ+ resource hub, anonymous feedback system for misgendering incidents, and inclusive event feed. Presented findings to UTD faculty and administration.",
      tech: ["User Research", "Figma", "Miro"],
      status: "CASE STUDY",
      image: "/deiproject.png",
      links: {
        caseStudy: "/case-studies/inclusion",
      },
    },
    {
      id: "007",
      title: "HACKMATE",
      description:
        "A web platform for connecting hackathon participants and forming teams. Built frontend components with React for navigation, group management tools, and contact forms integrated with backend APIs. Focused on making team formation and project collaboration feel smooth and intuitive.",
      tech: ["React", "CSS", "Figma"],
      status: "COMPLETE",
      image: "/hackmateproject.png",
      links: {
        code: "https://github.com/Evelas78/HackMate",
      },
    },
    {
      id: "008",
      title: "HOMETOWN OLYMPICS: NEW DELHI",
      description:
        "A visual identity system for a hypothetical 2024 Olympics hosted in New Delhi. The design celebrates India's vibrant culture through a lotus-inspired logo that merges the national flower with the Olympic torch. Drew from New Delhi's rich heritage including Mughal architecture, street markets, and festivals like Diwali and Holi. Created cohesive branding with traditional Indian textile patterns in saffron, maroon, gold, and purple to reflect courage, passion, and royalty.",
      tech: ["Figma", "Graphic Design", "Branding"],
      status: "CASE STUDY",
      image: "/delhiproject.png",
      links: {
        caseStudy: "/case-studies/delhi-olympics",
      },
    },
    {
      id: "009",
      title: "ZENZ",
      description:
        "An AI-powered mental health app designed to help users manage stress, practice mindfulness, and track emotional well-being in the post-pandemic world. Features guided meditation sessions for relaxation, journaling and mood tracking for self-reflection, AI-based mental health support, and personalized wellness activities. Created calming visual identity with lotus imagery and serene color palette (light blue, pink, beige) to promote peace and emotional resilience through daily wellness practices.",
      tech: ["Figma", "UI/UX Design", "Mobile Design"],
      status: "CASE STUDY",
      image: "/zenzproject.png",
      links: {
        caseStudy: "/case-studies/zenz",
      },
    },
    {
      id: "010",
      title: "ARC",
      description:
        "A human-centered IoT fitness ecosystem that transforms raw workout data into meaningful insights. Uses AI to interpret effort quality, near-failure moments, and recovery patterns rather than just counting reps. Features adaptive visualizations, real-time form guidance through wearables, and social progress sharing. Designed to make fitness more mindful and motivating by revealing the invisible effort that drives real growth through intelligent feedback and community connection.",
      tech: ["Figma", "IoT Design", "UI/UX Design", "Mobile Design"],
      status: "CASE STUDY",
      image: "/arcproject.png",
      links: {
        caseStudy: "/case-studies/arc",
      },
    },
    {
      id: "011",
      title: "UTD CSA SHIRT DESIGN",
      description:
        "A brand design project for UTD Chinese Student Association's shirt for the 2025-2026 academic year. Created a playful grunge-style design featuring Wang, our cute tiger mascot, riding a Lao Gan Ma rocket bottle. The design celebrates the '5 Spices' theme representing our family groups, with a front emblem that playfully references P.F. Chang's with 'P.F. Wang's.' Collaborated with Chloe Tee and Liz Michel on art and design while handling layout, typography, and overall composition.",
      tech: ["Figma", "Graphic Design", "Branding"],
      status: "CASE STUDY",
      image: "/csaproject.png",
      links: {
        caseStudy: "/case-studies/utd-csa",
      },
    },
  ]

  // Load view/filter/index preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("projectsPrefs")
      if (!raw) return
      const parsed = JSON.parse(raw) as {
        filter?: FilterType
        view?: ViewType
        index?: number
      }
      if (parsed.filter && ["all", "case-studies", "code"].includes(parsed.filter)) {
        setFilter(parsed.filter)
      }
      if (parsed.view && ["carousel", "grid"].includes(parsed.view)) {
        setView(parsed.view)
      }
      if (typeof parsed.index === "number" && parsed.index >= 0) {
        setCurrentIndex(parsed.index)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(
      "projectsPrefs",
      JSON.stringify({ filter, view, index: currentIndex }),
    )
  }, [filter, view, currentIndex])

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (filter === "case-studies") {
      return projects.filter((p) => p.status === "CASE STUDY")
    }
    if (filter === "code") {
      // Code projects: anything with a valid code link (includes some case studies like PREFACE + AEGIS)
      return projects.filter((p) => p.links.code && p.links.code !== "#")
    }
    return projects
  }, [filter])

  // Clamp index to filtered list length
  const safeIndex =
    filteredProjects.length > 0 ? Math.min(currentIndex, filteredProjects.length - 1) : 0
  const currentProject = filteredProjects[safeIndex] || filteredProjects[0]
  const adjustedIndex = filteredProjects.length > 0 ? safeIndex % filteredProjects.length : 0

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter)
    setCurrentIndex(0)
  }

  return (
    <section id="projects" className="relative">
      <div className="relative w-full min-h-screen bg-black overflow-hidden text-white">
        <div className="relative z-10 w-full flex flex-col p-6 md:p-8 lg:p-16">
          {/* Header */}
          <div className="w-full mb-6 lg:mb-8">
            <div className={`flex items-center justify-between ${view === "carousel" && currentProject?.title === "AEGIS" ? "" : "mb-6"}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{"PROJECTS"}</h2>
              {/* Easter egg only shows on AEGIS project in carousel view */}
              {view === "carousel" && currentProject?.title === "AEGIS" && (
                <Image
                  src="/aigis-easter-egg.png"
                  alt="Aigis easter egg"
                  width={400}
                  height={400}
                  className="object-contain w-auto h-auto max-h-[120px] md:max-h-[150px]"
                  quality={100}
                />
              )}
            </div>
            <div className="h-px w-full bg-white mb-6" />

            {/* Filter Tabs and View Toggle */}
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${view === "carousel" ? "mb-[-30px]" : "mb-8"}`}>
              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`px-4 py-2 text-sm font-black tracking-wider border transition-all ${
                    filter === "all"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/30 hover:border-white/50 hover:text-white"
                  }`}
                >
                  ALL
                </button>
                <button
                  onClick={() => handleFilterChange("case-studies")}
                  className={`px-4 py-2 text-sm font-black tracking-wider border transition-all ${
                    filter === "case-studies"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/30 hover:border-white/50 hover:text-white"
                  }`}
                >
                  CASE STUDIES
                </button>
                <button
                  onClick={() => handleFilterChange("code")}
                  className={`px-4 py-2 text-sm font-black tracking-wider border transition-all ${
                    filter === "code"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/30 hover:border-white/50 hover:text-white"
                  }`}
                >
                  CODE
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 border border-white/30 p-1">
                <button
                  onClick={() => setView("carousel")}
                  className={`px-4 py-2 text-xs font-black tracking-wider transition-all ${
                    view === "carousel"
                      ? "bg-white text-black"
                      : "bg-transparent text-white/70 hover:text-white"
                  }`}
                >
                  CAROUSEL
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`px-4 py-2 text-xs font-black tracking-wider transition-all ${
                    view === "grid"
                      ? "bg-white text-black"
                      : "bg-transparent text-white/70 hover:text-white"
                  }`}
                >
                  GRID
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {view === "carousel" ? (
            <div className="flex-1 -mx-6 md:-mx-8 lg:-mx-16">
              <ProjectSlide
                title={currentProject?.title || "Project Name"}
                description={currentProject?.description || "Project Description"}
                tags={currentProject?.tech || []}
                imageUrl={currentProject?.image || "/project-showcase.jpg"}
                status={currentProject?.status || "COMPLETE"}
                index={adjustedIndex + 1}
                total={filteredProjects.length}
                projectUrl={currentProject?.links.project}
                codeUrl={currentProject?.links.code}
                caseStudyUrl={currentProject?.links.caseStudy}
                videoUrl={currentProject?.links.videoUrl}
                videoLabel={currentProject?.links.videoLabel}
                devpostUrl={currentProject?.links.devpost}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          ) : (
            <div className="flex-1">
              <ProjectGrid projects={filteredProjects} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
