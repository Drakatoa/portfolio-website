"use client"

import { useState, useMemo, useEffect } from "react"
import { ProjectSlide } from "./project-slide"
import { ProjectGrid } from "./project-grid"
import Image from "next/image"
import { LayoutGrid } from "lucide-react"

type FilterType = "all" | "case-studies" | "code"
type ViewType = "carousel" | "grid"

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  status: string
  image: string
  links: {
    project?: string
    projectLabel?: string
    code?: string
    caseStudy?: string
    videoUrl?: string
    videoLabel?: string
    devpost?: string
  }
}

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState<FilterType>("all")
  const [view, setView] = useState<ViewType>("carousel")

  const projects: Project[] = [
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
        "A lightweight browser extension that puts trust and privacy back in the user's hands. Provides real-time website safety scores based on aggregated reviews and sentiment analysis, community-powered threat reporting for flagging dangerous sites automated scanners might miss, and smart autofill that restricts sensitive data to trusted sites only. Built with vanilla JavaScript for performance under 500KB.",
      tech: ["JavaScript", "Supabase", "Email.js", "Chrome Extensions API", "Figma"],
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
      id: "012",
      title: "SONARE.LIVE",
      description:
        "What if your webcam was a rhythm game controller? A fully client-side lyric performance game built for the Hatsune Miku 'Magical Mirai 2026' Programming Contest. Draw shapes with your mouse or your bare hands to perform lyrics in real time. MediaPipe hand tracking with 1-Euro filtering feeds a custom shape-recognition pipeline, while a 4-layer procedural animation system drives a VRM character with lip-sync, music-driven emotion, and pointer-relative gaze. No UI framework, no backend, and inference runs in a Web Worker to protect render FPS.",
      tech: ["JavaScript", "Vite", "Three.js", "MediaPipe", "WebGL/GLSL", "Web Workers"],
      status: "COMPLETE",
      image: "/sonare.live.png",
      links: {
        project: "https://porukana.itch.io/sonarelive",
        projectLabel: "PLAY GAME",
        code: "https://github.com/Drakatoa/magical-mirai-competition-2026",
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
      status: "COMPLETE",
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
      id: "013",
      title: "ARRESTORIQ",
      description:
        "10,000+ flame arrestor configurations, one validated platform. An industry-sponsored UTD capstone for Emerson unifying test data, CFD simulation, and bill-of-materials records in a single cross-platform desktop and mobile app. Data is ingested through the Emerson Data Interchange standard via a Haxe-compiled parsing engine that runs natively in both JavaScript and Python. The full product catalog is embedded for offline-first operation, a regression engine fits four model types to pressure-drop data for cross-product comparison, and hierarchical BOM trees deep-link into Emerson's records, with search running ~5x faster than Emerson's internal tool.",
      tech: ["React Native", "Expo", "Electron", "TypeScript", "Haxe", "Python"],
      status: "COMPLETE",
      image: "/arrestoriq.png",
      links: {
        project: "/arrestoriqposter.pdf",
        projectLabel: "VIEW POSTER",
      },
    },
    {
      id: "014",
      title: "EUKARYA",
      description:
        "Evolve from a single cell to a creature that walks on land. A Unity evolution simulator spanning six evolutionary stages across both 2D top-down and full 3D environments, including a transition mechanic that lets you breach the water's surface. Built the camera system, UI/UX, and audio architecture with a persistent cross-scene music manager, plus health, stamina, and overhealth mechanics driven by an edge-detection state machine that fires damage exactly once per attack.",
      tech: ["Unity", "C#", "Blender", "Figma"],
      status: "COMPLETE",
      image: "/eukarya.png",
      links: {
        code: "https://github.com/a-sriel/Eukarya",
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

  // Deep-linking: ?filter=case-studies preselects the filter (used by the nav),
  // and the nav dispatches an event when already on the home page
  useEffect(() => {
    if (typeof window === "undefined") return
    const applyFilter = (value: unknown) => {
      if (value === "all" || value === "case-studies" || value === "code") {
        setFilter(value)
        setCurrentIndex(0)
      }
    }
    applyFilter(new URLSearchParams(window.location.search).get("filter"))
    const onSetFilter = (e: Event) => applyFilter((e as CustomEvent).detail)
    window.addEventListener("projects:set-filter", onSetFilter)
    return () => window.removeEventListener("projects:set-filter", onSetFilter)
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

  // Project counts per filter, shown in the tab labels
  const counts = useMemo(
    () => ({
      all: projects.length,
      caseStudies: projects.filter((p) => p.status === "CASE STUDY").length,
      code: projects.filter((p) => p.links.code && p.links.code !== "#").length,
    }),
    [],
  )

  // Keyboard navigation for the carousel
  useEffect(() => {
    if (view !== "carousel") return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [view, filteredProjects.length])

  return (
    <section id="projects" className="relative">
      <div
        className={`relative w-full bg-black overflow-hidden text-white ${
          view === "carousel" ? "carousel-full" : "min-h-screen"
        }`}
      >
        <div className="relative z-10 w-full lg:h-full flex flex-col p-6 md:p-8 lg:px-16 lg:pt-16 lg:pb-0">
          {/* Header */}
          <div className="w-full mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">{"PROJECTS"}</h2>
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
                  ALL ({counts.all})
                </button>
                <button
                  onClick={() => handleFilterChange("case-studies")}
                  className={`px-4 py-2 text-sm font-black tracking-wider border transition-all ${
                    filter === "case-studies"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/30 hover:border-white/50 hover:text-white"
                  }`}
                >
                  CASE STUDIES ({counts.caseStudies})
                </button>
                <button
                  onClick={() => handleFilterChange("code")}
                  className={`px-4 py-2 text-sm font-black tracking-wider border transition-all ${
                    filter === "code"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/30 hover:border-white/50 hover:text-white"
                  }`}
                >
                  CODE ({counts.code})
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 border border-white/30 p-1">
                <button
                  onClick={() => setView("carousel")}
                  className={`px-4 py-2 text-xs font-black tracking-wider transition-all flex items-center gap-2 ${
                    view === "carousel"
                      ? "bg-white text-black"
                      : "bg-transparent text-white/70 hover:text-white"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 448 449"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M143.156 1.64692C127.063 5.54392 110.614 18.5749 102.801 33.6169C94.924 48.7839 95.5 33.7479 95.5 224.066C95.5 414.384 94.924 399.348 102.801 414.515C110.731 429.783 127.126 442.645 143.614 446.531C153.128 448.774 293.872 448.774 303.386 446.531C319.924 442.633 336.255 429.796 344.265 414.401C351.99 399.552 351.469 413.323 351.485 223.71C351.502 33.7839 352.077 48.7849 344.199 33.6169C336.269 18.3489 319.874 5.48692 303.386 1.60092C294.212 -0.562083 152.11 -0.520082 143.156 1.64692ZM296.682 33.8899C305.848 36.9579 314.958 46.2669 317.735 55.4029C319.587 61.4989 319.587 386.633 317.735 392.729C314.874 402.141 305.575 411.44 296.163 414.301C292.98 415.268 275.873 415.566 223.5 415.566C171.127 415.566 154.02 415.268 150.837 414.301C141.717 411.529 132.455 402.477 129.296 393.248C127.627 388.369 126.86 71.3409 128.493 60.7329C129.759 52.4999 132.27 47.2959 137.5 42.0659C142.395 37.1709 147.903 34.3209 154.717 33.1559C163.109 31.7229 292.198 32.3899 296.682 33.8899ZM32.5 65.9519C18.721 70.4069 9.679 78.2079 3.685 90.8159L0 98.5659V224.066V349.566L3.259 356.474C7.546 365.561 12.517 371.474 19.858 376.219C27.751 381.321 36.852 384.066 45.871 384.066C54.417 384.066 58.979 382.027 61.673 377.004C63.955 372.748 64.075 364.08 61.914 359.526C59.728 354.919 56.61 353.156 48.001 351.659C39.539 350.187 36.273 348.385 33.771 343.807C32.105 340.758 32 333.653 32 224.066C32 114.479 32.105 107.374 33.771 104.325C36.273 99.7469 39.539 97.9449 48.001 96.4729C52.061 95.7669 56.494 94.4609 57.855 93.5689C61.375 91.2619 63.5 86.1179 63.5 79.8989C63.5 73.2539 61.031 68.3559 56.438 65.8929C51.95 63.4859 40.036 63.5149 32.5 65.9519ZM390.756 65.7109C385.925 68.0929 383.5 72.7109 383.5 79.5329C383.5 86.0929 385.563 91.2219 389.145 93.5689C390.506 94.4609 394.939 95.7669 398.999 96.4729C407.461 97.9449 410.727 99.7469 413.229 104.325C414.895 107.374 415 114.479 415 224.066C415 338.793 414.97 340.617 413 343.885C410.321 348.33 406.137 350.71 399.5 351.564C387.94 353.051 383.5 357.528 383.5 367.7C383.5 379.181 388.739 384.066 401.053 384.066C417.982 384.066 434.765 374.349 441.787 360.482C447.805 348.598 447.5 355.888 447.5 224.066C447.5 116.036 447.332 102.861 445.888 97.9979C440.958 81.3799 430.186 70.6079 413.568 65.6779C406.532 63.5899 395.025 63.6059 390.756 65.7109Z"
                      fill={view === "carousel" ? "#000000" : "currentColor"}
                    />
                  </svg>
                  <span>CAROUSEL</span>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`px-4 py-2 text-xs font-black tracking-wider transition-all flex items-center gap-2 ${
                    view === "grid"
                      ? "bg-white text-black"
                      : "bg-transparent text-white/70 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>GRID</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {view === "carousel" ? (
            <div className="flex-1 min-h-0 -mx-6 md:-mx-8 lg:-mx-16 relative">
              <ProjectSlide
                title={currentProject?.title || "Project Name"}
                description={currentProject?.description || "Project Description"}
                tags={currentProject?.tech || []}
                imageUrl={currentProject?.image || "/project-showcase.jpg"}
                status={currentProject?.status || "COMPLETE"}
                index={adjustedIndex + 1}
                total={filteredProjects.length}
                projectUrl={currentProject?.links.project}
                projectLabel={currentProject?.links.projectLabel}
                codeUrl={currentProject?.links.code}
                caseStudyUrl={currentProject?.links.caseStudy}
                videoUrl={currentProject?.links.videoUrl}
                videoLabel={currentProject?.links.videoLabel}
                devpostUrl={currentProject?.links.devpost}
                onNext={handleNext}
                onPrev={handlePrev}
              />

              {/* Position dots - one per project, tooltip with name on hover */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2">
                {filteredProjects.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to ${p.title}`}
                    className="group relative p-1.5"
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full border border-white transition-all ${
                        i === safeIndex
                          ? "bg-white scale-125"
                          : "bg-transparent group-hover:bg-white/50"
                      }`}
                    />
                    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap border border-white/30 bg-black/90 px-2.5 py-1 text-[10px] font-black tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.title}
                    </span>
                  </button>
                ))}
              </div>
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
