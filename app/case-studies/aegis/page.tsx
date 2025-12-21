"use client"

import Image from "next/image"
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Code } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function AegisCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Define image groups by section
  const imageSections = {
    research: [
      { src: "/aegis-persona.png", alt: "Music therapist persona and user research" },
      { src: "/aegis-interview-notes.png", alt: "Interview notes and insights" },
    ],
    ideation: [
      { src: "/aegis-sketch-dashboard.png", alt: "Early dashboard concept sketches" },
      { src: "/aegis-sketch-wizard.png", alt: "Privacy setup wizard wireframe sketches" },
      { src: "/aegis-sketch-extension.png", alt: "Browser extension wireframe sketches" },
    ],
    heuristics: [
      { src: "/aegis-heuristic-before.png", alt: "Text-heavy UI before heuristic redesign" },
      { src: "/aegis-heuristic-after.png", alt: "Donut chart UI after heuristic improvements" },
    ],
    final: [
      { src: "/aegis-final-data-log.png", alt: "Color-coded data usage log" },
      { src: "/aegis-final-trust-score.png", alt: "Final trust score interface with donut chart" },
      { src: "/aegis-final-trust-score-breakdown.png", alt: "Trust score breakdown details" },
      { src: "/aegis-final-settings.png", alt: "Extension settings and preferences" },
      { src: "/aegis-final-autofill-part1.png", alt: "Smart autofill system - Part 1" },
      { src: "/aegis-final-autofill-part2.png", alt: "Smart autofill system - Part 2" },
      { src: "/aegis-final-report-flow.png", alt: "Report suspicious site flow" },
      { src: "/aegis-final-tutorial.png", alt: "Onboarding tutorial screens" },
    ],
  }

  const openLightbox = (section: string, index: number) => {
    setCurrentSection(section)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const nextImage = () => {
    const sectionImages = imageSections[currentSection as keyof typeof imageSections]
    setCurrentImageIndex((prev) => (prev + 1) % sectionImages.length)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const prevImage = () => {
    const sectionImages = imageSections[currentSection as keyof typeof imageSections]
    setCurrentImageIndex((prev) => (prev - 1 + sectionImages.length) % sectionImages.length)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()

    if (e.shiftKey && zoomLevel > 1) {
      setPanPosition((prev) => ({
        ...prev,
        x: prev.x - e.deltaY,
      }))
    } else if (e.ctrlKey && zoomLevel > 1) {
      setPanPosition((prev) => ({
        ...prev,
        y: prev.y - e.deltaY,
      }))
    } else {
      const zoomDelta = -e.deltaY * 0.001
      setZoomLevel((prev) => {
        const newZoom = Math.max(0.5, Math.min(3, prev + zoomDelta))
        return newZoom
      })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "+" || e.key === "=") zoomIn()
      if (e.key === "-") zoomOut()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, currentSection, currentImageIndex])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [lightboxOpen])

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Top Navigation */}
      <div className="relative z-10 border-b border-white/30 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO PORTFOLIO
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-8">
            <span className="text-xs text-white/60 tracking-widest">{"[CASE STUDY]"}</span>
          </div>

          <div className="flex items-start justify-between mb-3">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              AEGIS
            </h1>
            <a
              href="https://megamitensei.fandom.com/wiki/Aigis"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-auto h-auto hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Image
                src="/aigis-easter-egg-2.png"
                alt="Aigis easter egg"
                width={400}
                height={400}
                className="object-contain w-auto h-auto max-h-[120px] md:max-h-[150px]"
                quality={100}
              />
            </a>
          </div>

          <div className="relative aspect-[21/9] mb-12 border border-white/50 overflow-hidden">
            <Image
              src="/aegis-header.png"
              alt="Aegis browser extension"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <div className="max-w-full">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mb-8">
              A lightweight browser extension that puts trust and privacy back in your hands. Aegis shows you real-time website safety scores. The community reports threats, and smart autofill protects your data without slowing you down.
            </p>
            <div className="inline-block bg-[#5AD0FF]/10 border border-[#5AD0FF]/50 px-6 py-3">
              <p className="text-sm font-bold tracking-wide text-[#5AD0FF]">
                FOCUS: Invisible Security for Non-Technical Users
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Tools Section */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">PROJECT DETAILS</h2>
              <p className="text-sm text-white/60 mb-4">TEAM MEMBERS</p>
              <div className="space-y-4">
                <div className="border-l-2 border-[#5AD0FF] pl-4">
                  <p className="font-bold text-lg">Rajit Goel</p>
                  <p className="text-sm text-white/60">Fullstack, Database, Prototyper, Facilitator/Observer, Manager</p>
                </div>
                <div className="border-l-2 border-[#3E3578] pl-4">
                  <p className="font-bold text-lg">Kevin Philip</p>
                  <p className="text-sm text-white/60">Frontend/UI, Demoer, Presenter, Interviewer</p>
                </div>
                <div className="border-l-2 border-[#FFD233] pl-4">
                  <p className="font-bold text-lg">Alan Nguyen</p>
                  <p className="text-sm text-white/60">Reporting, QA, Notetaker</p>
                </div>
                <div className="border-l-2 border-[#4ADE80] pl-4">
                  <p className="font-bold text-lg">Tri Dang</p>
                  <p className="text-sm text-white/60">Backend, Facilitator, Notetaker</p>
                </div>
                <div className="border-l-2 border-[#F87171] pl-4">
                  <p className="font-bold text-lg">Anav Bajpai</p>
                  <p className="text-sm text-white/60">Notetaker, Accessibility</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">COURSE</p>
                <p className="font-bold text-lg">Human Computer Interaction</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">TEAM NAME</p>
                <p className="font-bold text-lg">Incognito Mode</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-4">TOOLS USED</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "JavaScript",
                  "Supabase",
                  "Email.js",
                  "Chrome Extensions API",
                  "Figma",
                ].map((tool) => (
                  <div
                    key={tool}
                    className="border border-white/50 p-4 hover:bg-white hover:text-black transition-colors cursor-default"
                  >
                    <p className="text-sm font-medium">{tool}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60 mb-4">METHODS USED</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "User Interviews",
                    "Empathy Mapping",
                    "Persona Development",
                    "Wireframing",
                    "Heuristic Evaluation",
                    "User Testing",
                  ].map((method) => (
                    <div
                      key={method}
                      className="border border-white/50 p-4 hover:bg-white hover:text-black transition-colors cursor-default"
                    >
                      <p className="text-sm font-medium">{method}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Conflict */}
      <section className="relative border-b border-white/30">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[01]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                  THE CORE CONFLICT
                </h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  convenience kills security
                </p>
              </div>

              <div className="relative h-[400px] md:h-[500px]">
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "30px",
                    top: "40px",
                  }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="8,0 100,0 92,100 0,100"
                    fill="none"
                    stroke="#5AD0FF"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-10 h-full flex items-center">
                    <p className="text-base md:text-lg text-black leading-relaxed max-w-[430px] ml-16">
                      Working adults face a constant dilemma. They value privacy, but they prioritize convenience. Our research found that even security-conscious users (like our Participant A, a CTO) compromise their safety by using risky autofill and reusing passwords just to save time during checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Insights */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[02]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            RESEARCH & INSIGHTS
          </h2>

          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Interview Participants</h3>
            <p className="text-lg text-white/80 mb-12 max-w-4xl">
              We conducted interviews with 3 working professionals in total at a local coffee shop. Each revealed unique perspectives on privacy, security, and the constant tension between convenience and protection in their daily digital interactions. Here are the two other participants we interviewed in addition to our primary participant, which we'll discuss later.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="border border-[#5AD0FF]/50 p-6 bg-[#5AD0FF]/5">
                <h4 className="text-xl font-bold mb-3 text-[#5AD0FF]">PARTICIPANT A</h4>
                <p className="text-sm text-white/60 mb-3">Working Professional</p>
                <p className="text-white/70 text-sm mb-4">
                  Uses technology daily for banking and shopping. Prioritizes convenience over security, using generated passwords stored online and autofill despite frustrations. Relies on institutions to have safeguards, viewing data leaks as unavoidable. Uses 2FA only when required.
                </p>
                <p className="text-xs text-[#5AD0FF] font-bold">KEY INSIGHT: "Institutions have safeguards, so I don't worry much"</p>
              </div>

              <div className="border border-[#4ADE80]/50 p-6 bg-[#4ADE80]/5">
                <h4 className="text-xl font-bold mb-3 text-[#4ADE80]">PARTICIPANT C</h4>
                <p className="text-sm text-white/60 mb-3">Nurse</p>
                <p className="text-white/70 text-sm mb-4">
                  Shops online regularly but prefers in-store purchases for trust. After experiencing fraud, checks bank account daily and values fraud alerts. Reads Terms & Conditions only for suspicious sites. Trusts banking apps more than shopping platforms. Balances convenience with selective caution.
                </p>
                <p className="text-xs text-[#4ADE80] font-bold">KEY INSIGHT: "I check my bank daily after the fraud incident"</p>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Empathy Maps</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              We synthesized our interview findings into empathy maps to understand what participants think, feel, say, and do when interacting with digital services.
            </p>
            

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div
                className="relative aspect-square border border-[#FFFFFF]/50 overflow-hidden cursor-pointer hover:border-[#FFFFFF] transition-colors"
                onClick={() => openLightbox("research", 1)}
              >
                <Image
                  src="/aegis-empathy-map-a.png"
                  alt="Empathy Map - Participant A"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div
                className="relative aspect-square border border-[#FFFFFF]/50 overflow-hidden cursor-pointer hover:border-[#FFFFFF] transition-colors"
                onClick={() => openLightbox("research", 3)}
              >
                <Image
                  src="/aegis-empathy-map-c.png"
                  alt="Empathy Map - Participant C"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Primary Persona: The Music Therapist</h3>
            <p className="text-lg text-white/80 mb-12 max-w-4xl">
              We focused on a specific archetype: the non-technical professional. Our primary persona is a music therapist who uses her iPad daily for work. She only worries about data privacy after she gets spam texts. She relies on visual cues like "Amazon Choice" labels to determine safety, rather than technical indicators. This gave us our key insight: users need "invisible security" that protects them without adding friction to their workflow.
            </p>

            <div className="mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="relative aspect-square border border-[#FFFFFF]/50 overflow-hidden cursor-pointer hover:border-[#FFFFFF] transition-colors"
                  onClick={() => openLightbox("research", 2)}
                >
                  <Image
                    src="/aegis-empathy-map-b.png"
                    alt="Empathy Map - Participant B (Music Therapist)"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
                <div
                  className="relative aspect-video border border-[#FFFFFF]/50 overflow-hidden cursor-pointer hover:border-[#FFFFFF] transition-colors"
                  onClick={() => openLightbox("research", 0)}
                >
                  <Image
                    src="/aegis-persona-music-therapist.png"
                    alt="Music Therapist Persona"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">KEY INSIGHTS</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#5AD0FF]/50 p-8 bg-[#5AD0FF]/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#5AD0FF]">
                REACTIVE SECURITY
              </h4>
              <p className="text-white/70">
                Users only think about privacy after something bad happens, like receiving spam texts or suspicious charges.
              </p>
            </div>
            <div className="border border-[#FFD233]/50 p-8 bg-[#FFD233]/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#FFD233]">
                VISUAL TRUST SIGNALS
              </h4>
              <p className="text-white/70">
                Non-technical users rely on badges and labels rather than technical indicators like HTTPS or domain age.
              </p>
            </div>
            <div className="border border-[#4ADE80]/50 p-8 bg-[#4ADE80]/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#4ADE80]">
                CONVENIENCE WINS
              </h4>
              <p className="text-white/70">
                Even CTOs and security professionals cut corners on password hygiene to speed up checkout flows.
              </p>
            </div>
            <div className="border border-white/50 p-8 bg-white/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white">
                DELEGATED TRUST
              </h4>
              <p className="text-white/70">
                Users trust platforms like Amazon to vet sellers, rather than investigating sites themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Solutions */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[03]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            THE THREE SOLUTIONS
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            We explored three different modalities before selecting the winner. Each approach had strengths, but only one fit the "invisible security" model our users needed.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("ideation", 0)}
            >
              <Image
                src="/aegis-sketch-dashboard.png"
                alt="Early dashboard concept sketches"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("ideation", 1)}
            >
              <Image
                src="/aegis-sketch-wizard.png"
                alt="Privacy setup wizard wireframe sketches"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("ideation", 2)}
            >
              <Image
                src="/aegis-sketch-extension.png"
                alt="Browser extension wireframe sketches"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="border border-[#F87171]/50 p-8 bg-[#F87171]/5">
              <h4 className="text-2xl font-bold mb-4 text-[#F87171]">01 // PRIVACY DASHBOARD</h4>
              <p className="text-white/70 mb-3">
                A centralized hub to view all permissions and data sharing across sites.
              </p>
              <p className="text-sm text-[#F87171] font-bold">VERDICT: REJECTED</p>
              <p className="text-sm text-white/60">
                Too passive. Users wouldn't visit it often enough to be effective. Out of sight means out of mind.
              </p>
            </div>

            <div className="border border-[#FFD233]/50 p-8 bg-[#FFD233]/5">
              <h4 className="text-2xl font-bold mb-4 text-[#FFD233]">02 // PRIVACY SETUP WIZARD</h4>
              <p className="text-white/70 mb-3">
                A one-time onboarding flow to configure security settings and preferences.
              </p>
              <p className="text-sm text-[#FFD233] font-bold">VERDICT: REJECTED</p>
              <p className="text-sm text-white/60">
                Good for onboarding, but didn't help users make real-time decisions when they needed it most.
              </p>
            </div>

            <div className="border border-[#4ADE80]/50 p-8 bg-[#4ADE80]/5">
              <h4 className="text-2xl font-bold mb-4 text-[#4ADE80]">
                03 // TRUST & SAFETY BROWSER EXTENSION
              </h4>
              <p className="text-white/70 mb-3">
                A lightweight overlay that lives on the page, providing real-time trust scores and secure autofill exactly when the user needs it.
              </p>
              <p className="text-sm text-[#4ADE80] font-bold">VERDICT: SELECTED</p>
              <p className="text-sm text-white/60">
                Context-aware protection that doesn't require users to change their habits. Security becomes invisible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="relative border-b border-white/30">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-24">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[04]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                  MAIN FEATURES
                </h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  three tasks, three complexity levels
                </p>
              </div>

              <div className="relative h-[400px] md:h-[500px]">
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
                  }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="8,0 100,0 92,100 0,100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-10 h-full flex items-center">
                    <p className="text-base md:text-lg text-black leading-relaxed max-w-[430px] ml-15">
                      We designed three core tasks that map to different complexity levels. Simple tasks like viewing trust scores happen instantly. Moderate tasks like reporting suspicious sites take a few clicks. Complex tasks like managing autofill profiles give power users full control.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="border border-[#4ADE80]/50 p-8 bg-[#4ADE80]/5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-[#4ADE80]">TASK 1: VIEW TRUST SCORE</h3>
                    <p className="text-sm text-white/50">COMPLEXITY: SIMPLE</p>
                  </div>
                </div>
                <p className="text-white/70 text-lg mb-4">
                  An immediate, color-coded donut chart showing a site's safety rating from 0-100%. The score is based on aggregated user reviews and sentiment analysis. Green means safe, yellow means caution, red means danger. No technical jargon, just a quick visual signal.
                </p>
              </div>

              <div className="border border-[#FFD233]/50 p-8 bg-[#FFD233]/5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-[#FFD233]">TASK 2: REPORT SUSPICIOUS SITES</h3>
                    <p className="text-sm text-white/50">COMPLEXITY: MODERATE</p>
                  </div>
                </div>
                <p className="text-white/70 text-lg mb-4">
                  A quick way for the community to flag dangerous sites that automated scanners might miss. Users can submit a URL, describe the issue, and select threat categories. The report gets validated through strict form parsing to prevent spam.
                </p>
              </div>

              <div className="border border-[#5AD0FF]/50 p-8 bg-[#5AD0FF]/10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-[#5AD0FF]">TASK 3: MANAGE PERMISSIONS</h3>
                    <p className="text-sm text-white/50">COMPLEXITY: COMPLEX</p>
                  </div>
                </div>
                <p className="text-white/70 text-lg mb-4">
                  A smart autofill system that lets users create profiles like "Personal" vs "Work" and restricts sensitive data like credit cards to trusted sites only. The Data Usage Log shows exactly what information a site is requesting, color-coded by risk level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iteration & Heuristic Redesign */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[05]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            ITERATION & HEURISTIC REDESIGN
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            Our user testing revealed specific usability issues which we fixed using Nielsen's Heuristics. Here's how we transformed the interface to make information understandable and guide the user through the extension.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("heuristics", 0)}
            >
              <Image
                src="/aegis-heuristic-before.png"
                alt="Text-heavy UI before heuristic redesign"
                fill
                quality={75}
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
                <p className="text-sm font-bold text-[#F87171]">BEFORE: Requires Recall of Data Accessed</p>
              </div>
            </div>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("heuristics", 1)}
            >
              <Image
                src="/aegis-heuristic-after.png"
                alt="Donut chart UI after heuristic improvements"
                fill
                quality={75}
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
                <p className="text-sm font-bold text-[#4ADE80]">AFTER: Supports Instant Recognition</p>
              </div>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">HEURISTIC VIOLATIONS & FIXES</h3>

          <div className="space-y-8">
            <div className="border-l-4 border-[#FFD233] pl-6 py-4 bg-[#FFD233]/5">
              <h4 className="text-xl font-bold mb-3 text-[#FFD233]">
                VIOLATION H6: RECOGNITION VS. RECALL
              </h4>
              <p className="text-white/70 mb-3">
                <strong className="text-white">Problem:</strong> Users couldn't track what data was being shared across sessions.
              </p>
              <p className="text-white/70">
                <strong className="text-[#4ADE80]">Fix:</strong> We added a color-coded Data Log showing Green for Safe data like name/email, and Yellow for Caution data like credit cards. Users can instantly recognize data sensitivity without having to remember previous interactions.
              </p>
            </div>

            <div className="border-l-4 border-[#5AD0FF] pl-6 py-4 bg-[#5AD0FF]/10">
              <h4 className="text-xl font-bold mb-3 text-[#5AD0FF]">VIOLATION H3: USER CONTROL</h4>
              <p className="text-white/70 mb-3">
                <strong className="text-white">Problem:</strong> The UI lost its state when switching tabs, and users couldn't undo an autofill action.
              </p>
              <p className="text-white/70">
                <strong className="text-[#4ADE80]">Fix:</strong> We implemented Chrome Local Storage for state persistence across tabs and added a "Revert" button to undo autofill mistakes. Now users maintain control even when multitasking.
              </p>
            </div>

            <div className="border-l-4 border-[#F87171] pl-6 py-4 bg-[#F87171]/5">
              <h4 className="text-xl font-bold mb-3 text-[#F87171]">VIOLATION H5: ERROR PREVENTION</h4>
              <p className="text-white/70 mb-3">
                <strong className="text-white">Problem:</strong> Users could submit empty reports or invalid URLs, creating noise in the system.
              </p>
              <p className="text-white/70">
                <strong className="text-[#4ADE80]">Fix:</strong> We added strict form validation to parse URLs and ensure all required fields are filled. The system now catches mistakes before they're submitted.
              </p>
            </div>

            <div className="border-l-4 border-[#4ADE80] pl-6 py-4 bg-[#4ADE80]/5">
              <h4 className="text-xl font-bold mb-3 text-[#4ADE80]">VIOLATION H4: CONSISTENCY</h4>
              <p className="text-white/70 mb-3">
                <strong className="text-white">Problem:</strong> We mixed terms like "Delete" and "Clear" for similar destructive actions.
              </p>
              <p className="text-white/70">
                <strong className="text-[#4ADE80]">Fix:</strong> Standardized all destructive actions to use "Clear" for consistency. Now users know exactly what to expect from each action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Implementation */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[06]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            FINAL IMPLEMENTATION
          </h2>

          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Tech Stack & Quality</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              We built Aegis with Vanilla JavaScript for lightweight performance, Supabase for backend data storage of scores and reviews, and Email.js for report notifications. Unlike heavy antivirus software, Aegis is context-aware and educational. It doesn't just block sites, it shows users exactly what information a site is requesting through the Data Usage Log.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="border border-white/50 p-6 bg-white/10">
                <h4 className="text-2xl font-bold mb-2 text-white">Lightweight</h4>
                <p className="text-sm text-white/60">
                  Vanilla JS keeps the extension under 500KB, faster than bloated security suites.
                </p>
              </div>
              <div className="border border-[#4ADE80]/50 p-6 bg-[#4ADE80]/5">
                <h4 className="text-2xl font-bold mb-2 text-[#4ADE80]">Context-Aware</h4>
                <p className="text-sm text-white/60">
                  Security shows up exactly when you need it, not buried in settings menus.
                </p>
              </div>
              <div className="border border-[#FFD233]/50 p-6 bg-[#FFD233]/5">
                <h4 className="text-2xl font-bold mb-2 text-[#FFD233]">Educational</h4>
                <p className="text-sm text-white/60">
                  Shows users what data is at risk, helping them learn safe browsing habits.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Final Screens</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {imageSections.final.map((image, idx) => (
              <div
                key={idx}
                className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
                onClick={() => openLightbox("final", idx)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section className="relative border-b border-white/30">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-xs text-white/60 tracking-widest">{"[07]"}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                PROJECT SUMMARY
              </h2>
              <p className="text-sm md:text-base text-white/50">
                making security invisible without making it optional
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="relative h-[300px] md:h-[350px]">
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
                  }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="8,0 100,0 92,100 0,100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-8 h-full flex items-center justify-center">
                    <p className="text-xs md:text-sm text-black leading-relaxed text-center max-w-[280px]">
                      Convenience always beats security in practice. Users value privacy but sacrifice it to save seconds at checkout. Even security professionals cut corners when the friction is too high. Traditional solutions fail because they force users to choose between speed and safety.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[350px]">
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
                  }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="8,0 100,0 92,100 0,100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-8 h-full flex items-center justify-center">
                    <p className="text-xs md:text-sm text-black leading-relaxed text-center max-w-[280px]">
                      Aegis makes security invisible. Real-time trust scores appear exactly when users need them. Smart autofill protects sensitive data without slowing down checkout. The Data Usage Log educates users about what they're sharing without requiring them to read privacy policies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[350px]">
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
                  }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="8,0 100,0 92,100 0,100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-8 h-full flex items-center justify-center">
                    <p className="text-xs md:text-sm text-black leading-relaxed text-center max-w-[280px]">
                      Community-powered protection scales better than algorithms alone. Users report threats that automated scanners miss. Color-coded data logs help people recognize patterns without memorizing rules. The result is security that adapts to user behavior instead of fighting it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo & Code */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[08]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            DEMO & SOURCE CODE
          </h2>

          <div className="mb-12">
            <div className="relative aspect-video bg-black border border-white/20">
              <iframe
                src="https://www.youtube.com/embed/5ndbzVFQ15c"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
                title="Aegis Demo Video"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Drakatoa/Aegis"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block transition-transform hover:translate-x-2"
            >
              <svg
                className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                viewBox="0 0 160 50"
                preserveAspectRatio="xMinYMin meet"
                style={{
                  height: "100%",
                }}
              >
                <polygon points="0,0 160,0 147,50 0,50" fill="white" className="transition-all" />
              </svg>
              <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                <span>VIEW CODE</span>
                <Code className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/30 py-12 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO PORTFOLIO
          </Link>
          <p className="text-xs text-white/40">{"© 2025 RAJIT GOEL"}</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && currentSection && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white transition-colors bg-black/50 p-3 rounded-full border border-[#5AD0FF]/20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              disabled={currentImageIndex === 0}
              className={`absolute left-6 z-50 transition-colors bg-black/50 p-3 rounded-full border border-[#5AD0FF]/20 ${
                currentImageIndex === 0
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/80 hover:text-white"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              disabled={currentImageIndex === imageSections[currentSection as keyof typeof imageSections].length - 1}
              className={`absolute right-6 z-50 transition-colors bg-black/50 p-3 rounded-full border border-[#5AD0FF]/20 ${
                currentImageIndex === imageSections[currentSection as keyof typeof imageSections].length - 1
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/80 hover:text-white"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/50 p-2 rounded-full border border-[#5AD0FF]/20">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  zoomOut()
                }}
                className="text-white/80 hover:text-white transition-colors p-2"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white/80 text-sm font-medium min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  zoomIn()
                }}
                className="text-white/80 hover:text-white transition-colors p-2"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-6 left-6 z-50 bg-black/50 px-4 py-2 rounded-full border border-[#5AD0FF]/20">
              <span className="text-white/80 text-sm font-medium">
                {currentImageIndex + 1} / {imageSections[currentSection as keyof typeof imageSections].length}
              </span>
            </div>

            <div
              className="relative max-w-7xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{
                cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            >
              <div
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                  transformOrigin: "center center",
                }}
              >
                <Image
                  src={imageSections[currentSection as keyof typeof imageSections][currentImageIndex].src}
                  alt={imageSections[currentSection as keyof typeof imageSections][currentImageIndex].alt}
                  width={1920}
                  height={1080}
                  className="object-contain w-auto h-auto max-w-full max-h-[85vh]"
                  quality={90}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
