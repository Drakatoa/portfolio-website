"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { useState, useEffect } from "react"

export default function ARCPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Define image groups by section
  const imageSections = {
    wireframes: [
      { src: "/arc-wireframes.png", alt: "LoFi wireframes showing user flow and key screens" },
    ],
    branding: [
      { src: "/arc-brand-identity.png", alt: "Brand identity with Rajdhani typography and dark theme" },
    ],
    screens: [
      { src: "/arc-screen-home.png", alt: "Home screen with workout summary" },
      { src: "/arc-screen-recent-sessions.png", alt: "Recent sessions screen" },
      { src: "/arc-screen-recent-sessions2.png", alt: "Recent sessions screen 2" },
      { src: "/arc-screen-progress-dashboard.png", alt: "Progress dashboard with analytics" },
      { src: "/arc-screen-profile.png", alt: "User profile screen" },
      { src: "/arc-screen-social.png", alt: "Social features and challenges" },
      
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

  // Keyboard navigation
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

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [lightboxOpen])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10 border-b border-white/20 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO PORTFOLIO
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-8">
            <span className="text-xs text-white/60 tracking-widest">{"[CASE STUDY]"}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">ARC</h1>

          <div className="relative aspect-[21/9] mb-12 border border-white/20 overflow-hidden">
            <Image
              src="/arc-header.png"
              alt="ARC IoT fitness ecosystem branding"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
            An IoT fitness ecosystem that turns workout data into something that actually matters. Instead of just counting reps, ARC uses AI to understand how hard you're really pushing, such as when you're close to failure, how your form changes, and what your recovery looks like. It's about making fitness more meaningful by showing you the effort that actually drives progress.
          </p>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">PROJECT DETAILS</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-[#6B7280] pl-4">
                  <p className="text-sm text-white/60 mb-1">ROLE</p>
                  <p className="font-bold text-lg">UI/UX Designer</p>
                </div>
                <div className="border-l-2 border-[#14B8A6] pl-4">
                  <p className="text-sm text-white/60 mb-1">COURSE</p>
                  <p className="font-bold text-lg">Interaction Design II</p>
                </div>
                <div className="border-l-2 border-[#F97316] pl-4">
                  <p className="text-sm text-white/60 mb-1">PROJECT TYPE</p>
                  <p className="font-bold text-lg">UI/UX Design</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-4">TOOLS USED</p>
              <div className="grid grid-cols-2 gap-4">
                {["Figma"].map((tool) => (
                  <div
                    key={tool}
                    className="border border-white/30 p-4 hover:bg-white hover:text-black transition-colors cursor-default"
                  >
                    <p className="text-sm font-medium">{tool}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60 mb-4">METHODS USED</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Bifocal Charts",
                    "User Personas",
                    "Wireframing",
                    "UI Design",
                    "Brand Identity Design",
                  ].map((method) => (
                    <div
                      key={method}
                      className="border border-white/30 p-4 hover:bg-white hover:text-black transition-colors cursor-default"
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

      {/* The Problem Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[01]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">THE PROBLEM</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[350px] md:h-[400px]">
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
                <div className="p-6 md:p-10 ml-10 mt-5 w-135 flex items-center">
                  <p className="text-base md:text-lg text-black leading-relaxed">
                    Your fitness tracker knows everything. Heart rate, calories, reps, split times. But what does any of it actually mean? Most apps just throw numbers at you without explaining how they connect to your goals. You end up with data overload and no real understanding of whether you're actually getting better.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[350px] md:h-[400px]">
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
                <div className="p-6 md:p-10 ml-10 mt-5 w-135 flex items-center">
                  <p className="text-base md:text-lg text-black leading-relaxed">
                    ARC actually reads between the lines. It watches for when you're pushing close to failure, notices when your speed drops off, tracks how many reps you had left in the tank. The AI connects these patterns so you can see what's really happening in your training. It's the difference between knowing you did 10 reps and understanding whether those 10 reps actually moved you forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Overview Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[02]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">DESIGN PROCESS OVERVIEW</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-[#6B7280]/50 p-8 bg-[#6B7280]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#9CA3AF]">
                ESTABLISH REQUIREMENTS
              </h3>
              <p className="text-white/70 leading-relaxed">
                How can an IoT fitness ecosystem transform raw workout data into meaningful insights that reveal effort quality to motivate users and foster community connection while allowing for privacy and personalization?
              </p>
            </div>

            <div className="border border-[#14B8A6]/50 p-8 bg-[#14B8A6]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#14B8A6]">NEW-USE SCENARIOS</h3>
              <p className="text-white/70 leading-relaxed">
                A dedicated gym-goer wants to understand not just how many reps they completed, but how close they were to failure and whether their form quality is improving over time in order to optimize their training.
              </p>
            </div>

            <div className="border border-[#F97316]/50 p-8 bg-[#F97316]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#F97316]">
                FINAL DESIGN PARAMETERS
              </h3>
              <p className="text-white/70 leading-relaxed">
                Wearable sensors feed data to ARC's AI, tracking near-failure moments and velocity changes. Dashboards adapt to show what matters, with real-time coaching and social challenges.
              </p>
            </div>

            <div className="border border-[#6B7280]/50 p-8 bg-[#6B7280]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#9CA3AF]">DESIGN EXPLORATION</h3>
              <p className="text-white/70 leading-relaxed">
                Focus on dark, professional UI with clear data visualizations. The interface prioritizes actionable insights over vanity metrics, using graphs and trend lines to reveal patterns that matter for real progress.
              </p>
            </div>

            <div className="border border-[#14B8A6]/50 p-8 bg-[#14B8A6]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#14B8A6]">PROOF OF CONCEPT</h3>
              <p className="text-white/70 leading-relaxed">
                The interface flows naturally from checking how your last workout went to seeing recovery trends. AI insights pop up when they're relevant, and you can jump into challenges with friends without losing your place.
              </p>
            </div>

            <div className="border border-[#F97316]/50 p-8 bg-[#F97316]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#F97316]">
                FINAL DESIGN SPECIFICATION
              </h3>
              <p className="text-white/70 leading-relaxed">
                The system connects to wearables through cloud infrastructure that processes everything in real-time. Privacy controls keep your data secure, and the architecture can scale as we add new features down the line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Persona Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[03]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">USER PERSONA</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#14B8A6]">Meet Harry</h3>
                <p className="text-xl text-white/60 mb-6">27-year-old Product Designer</p>
              </div>

              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  Harry tracks every workout religiously. But there's a problem: his fitness tracker collects tons of data, yet he still can't tell if he's actually getting stronger. Is he training hard enough? Is his form getting better? How close is he to his goals? The numbers don't answer these questions.
                </p>
                <p>
                  He's done with apps that just count reps. What he needs is something that sees the patterns he can't see, like when he's really pushing to failure, how his speed changes during sets, whether he's recovering properly. That's how he'll actually know if he's making progress.
                </p>
              </div>

              <div className="pt-6 border-t border-white/20 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-[#6B7280] mb-2">Pain Points</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B7280] mt-1">•</span>
                      <span>Overwhelmed by data that doesn't translate into actionable insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B7280] mt-1">•</span>
                      <span>Can't tell if he's training at optimal intensity or leaving gains on the table</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B7280] mt-1">•</span>
                      <span>Needs to see form quality and recovery trends, not just how many reps he did</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#F97316] mb-2">Goals</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F97316] mt-1">•</span>
                      <span>Know when he's actually pushing to failure so he can train more effectively</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F97316] mt-1">•</span>
                      <span>Spot patterns in how he recovers and performs week to week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F97316] mt-1">•</span>
                      <span>Get coaching that helps him train smarter, not just harder</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative aspect-square border border-white/20 overflow-hidden bg-white/5">
              <Image
                src="/arc-harry.png"
                alt="Harry - User Persona"
                fill
                quality={75}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wireframes Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[04]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            WIREFRAMES & USER FLOW
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            Early wireframes that map the full journey from first launch to daily use. The sketches work through how workout data flows in, how progress gets visualized, where coaching insights appear, and how social features fit in. These establish the structure before diving into the final designs.
          </p>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("wireframes", 0)}
          >
            <Image
              src="/arc-wireframes.png"
              alt="LoFi wireframes showing user flow and key screens"
              fill
              quality={75}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[05]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">BRAND IDENTITY</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            The visual identity is built for clarity. Dark theme keeps things professional, while teal and orange accents highlight what matters. It's designed to show metrics that actually help you, not just numbers that look impressive. Typography and layout make complex fitness data easy to read and understand.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="border border-[#6B7280]/50 p-8 bg-[#6B7280]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#9CA3AF]">LOGO & SYMBOL</h3>
              <p className="text-white/70 leading-relaxed">
                The ARC wordmark represents the arc of improvement, the journey from where you are to where you want to be. Clean, bold typography communicates strength and precision.
              </p>
            </div>

            <div className="border border-[#14B8A6]/50 p-8 bg-[#14B8A6]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#14B8A6]">COLOR PALETTE</h3>
              <p className="text-white/70 leading-relaxed">
                Dark greys and blacks provide a professional backdrop for data visualizations. Teal accents highlight insights and progress, while orange indicates areas needing attention or improvement.
              </p>
            </div>

            <div className="border border-[#F97316]/50 p-8 bg-[#F97316]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#F97316]">TYPOGRAPHY</h3>
              <p className="text-white/70 leading-relaxed">
                Rajdhani gives headings a technical, athletic feel, while Barlow keeps data-heavy screens readable across all device sizes.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {imageSections.branding.map((image, idx) => (
              <div
                key={idx}
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("branding", idx)}
              >
                <Image src={image.src} alt={image.alt} fill quality={75} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Screens Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[06]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">FINAL SCREEN DESIGNS</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            Final screen designs that cover the full experience. You start at the home dashboard, dive into workout details, check progress with AI insights layered in, manage your profile, and jump into challenges with friends. Every screen is built to make the data clear and useful.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {imageSections.screens.map((image, idx) => (
              <div
                key={idx}
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("screens", idx)}
              >
                <Image src={image.src} alt={image.alt} fill quality={75} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototype Link Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[07]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">INTERACTIVE PROTOTYPE</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            Try the interactive prototype to see how everything flows together, from first launch to tracking workouts, checking progress, getting AI insights, and competing with friends.
          </p>

          <a
            href="https://www.figma.com/proto/6SD371fF4AKi2JseX9QSwZ/ARC?page-id=0%3A1&node-id=15-12&viewport=573%2C-79%2C0.26&t=aKwp36k0FRYIXUSb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=15%3A12"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block transition-transform hover:translate-x-2"
          >
            <svg
              className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              viewBox="0 0 350 50"
              preserveAspectRatio="xMinYMin meet"
              style={{
                height: "100%",
              }}
            >
              <polygon points="0,0 350,0 327,50 0,50" fill="white" className="transition-all" />
            </svg>
            <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
              <span>VIEW PROTOTYPE</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/20 py-12 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm hover:text-white/70 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO PORTFOLIO
          </Link>
          <p className="text-xs text-white/40">{"© 2025 RAJIT GOEL"}</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && currentSection && imageSections[currentSection as keyof typeof imageSections] && imageSections[currentSection as keyof typeof imageSections].length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white transition-colors bg-black/50 p-3 rounded-full border border-white/20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              disabled={currentImageIndex === 0}
              className={`absolute left-6 z-50 transition-colors bg-black/50 p-3 rounded-full border border-white/20 ${
                currentImageIndex === 0 ? "text-white/20 cursor-not-allowed" : "text-white/80 hover:text-white"
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
              disabled={
                currentImageIndex === imageSections[currentSection as keyof typeof imageSections].length - 1
              }
              className={`absolute right-6 z-50 transition-colors bg-black/50 p-3 rounded-full border border-white/20 ${
                currentImageIndex === imageSections[currentSection as keyof typeof imageSections].length - 1
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/80 hover:text-white"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/50 p-2 rounded-full border border-white/20">
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

            {/* Image Counter */}
            <div className="absolute top-6 left-6 z-50 bg-black/50 px-4 py-2 rounded-full border border-white/20">
              <span className="text-white/80 text-sm font-medium">
                {currentImageIndex + 1} / {imageSections[currentSection as keyof typeof imageSections].length}
              </span>
            </div>

            {/* Image Container */}
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
