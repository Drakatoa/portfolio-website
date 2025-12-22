"use client"

import Image from "next/image"
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function PrefaceCaseStudy() {
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
      { src: "/interview questions.png", alt: "Interview questions and research process" },
      { src: "/surveypercentages.png", alt: "Survey results and percentages" },
      { src: "/website-research-1.png", alt: "Competitor website research" },
    ],
    empathy: [
      { src: "/empathy-maps.png", alt: "Empathy map showing candidate experiences" },
      { src: "/gridmaps.png", alt: "2x2 maps and analysis" },
    ],
    journey: [
      { src: "/journeymappart1.png", alt: "User journey map part 1" },
      { src: "/journeymappart2.png", alt: "User journey map part 2" },
      { src: "/journeymappart3.png", alt: "User journey map part 3" },
    ],
    wireframes: [
      { src: "/initialwireframing-and-inspirations.png", alt: "Initial wireframing and inspirations" },
      { src: "/paper-wireframes-part1.png", alt: "Paper wireframe part 1" },
      { src: "/paper-wireframes-part2.png", alt: "Paper wireframe part 2" },
      { src: "/paper-wireframes-part3.png", alt: "Paper wireframe part 3" },
      { src: "/paper-wireframes-part4.png", alt: "Paper wireframe part 4" },
      { src: "/paper-wireframes-part5.png", alt: "Paper wireframe part 5" },
    ],
    iterations: [
      { src: "/HiFiDigitalDesigns.png", alt: "High-fidelity digital designs" },
    ],
    highfidelity: [
      { src: "/FinalScreen1.png", alt: "Final screen 1" },
      { src: "/FinalScreen2.png", alt: "Final screen 2" },
      { src: "/FinalScreen3.png", alt: "Final screen 3" },
      { src: "/FinalScreen4.png", alt: "Final screen 4" },
      { src: "/FinalScreen6.png", alt: "Final screen 6" },
      { src: "/FinalScreen7.png", alt: "Final screen 7" },
      { src: "/FinalScreen8.png", alt: "Final screen 8" },
      { src: "/FinalScreen9.png", alt: "Final screen 9" },
      { src: "/FinalScreen10.png", alt: "Final screen 10" },
      { src: "/FinalScreen11.png", alt: "Final screen 11" },
    ],
    branding: [
      { src: "/logoDesignsAndColors.png", alt: "Logo designs and color palette" },
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
      // Shift + scroll for panning horizontally
      setPanPosition((prev) => ({
        ...prev,
        x: prev.x - e.deltaY,
      }))
    } else if (e.ctrlKey && zoomLevel > 1) {
      // Ctrl + scroll for panning vertically (when zoomed)
      setPanPosition((prev) => ({
        ...prev,
        y: prev.y - e.deltaY,
      }))
    } else {
      // Regular scroll for zooming
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

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-8">
            <span className="text-xs text-white/60 tracking-widest">{"[CASE STUDY]"}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">PREFACE</h1>

          <div className="relative aspect-[21/9] mb-12 border border-white/20 overflow-hidden">
            <Image
              src="/prefaceheader.png"
              alt="Preface branding"
              fill
                  quality={75}
              className="object-contain"
            />
          </div>

          <div className="max-w-full flex items-start gap-8">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              A recruiting platform that helps employers find the right candidates faster. Instead of vague applications, candidates complete role-specific courses and earn certificates. Employers get a clear picture of skills and readiness before interviews.
            </p>
            <div className="flex-shrink-0 ml-30">
              <p className="text-xs font-black tracking-widest text-white/60 mb-3">IN PARTNERSHIP WITH</p>
              <div className="ml-3.5 bg-white p-1 border border-white/10 w-32 h-32 flex items-center justify-center">
                <Image
                  src="/fisher_investments_logo.jpg"
                  alt="Fisher Investments"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">PROJECT DETAILS</h2>
              <p className="text-sm text-white/60 mb-4">TEAM MEMBERS</p>
              <div className="space-y-4">
                <div className="border-l-2 border-violet-500 pl-4">
                  <p className="font-bold text-lg">Rajit Goel</p>
                  <p className="text-sm text-white/60">Wireframing, Prototyper, Coder</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <p className="font-bold text-lg">Burak Bas</p>
                  <p className="text-sm text-white/60">Researcher, Filmmaking, Graphic Design</p>
                </div>
                <div className="border-l-2 border-indigo-500 pl-4">
                  <p className="font-bold text-lg">Silas Solomon</p>
                  <p className="text-sm text-white/60">Project Manager, Designer, Event Planner</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="font-bold text-lg">Nathan Lee</p>
                  <p className="text-sm text-white/60">Storyteller, Logistics, Logo Designer</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <p className="font-bold text-lg">Cole Jesberg</p>
                  <p className="text-sm text-white/60">Synthesizer</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">COURSE</p>
                <p className="font-bold text-lg">Applied Experience Design</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">TEAM NAME</p>
                <p className="font-bold text-lg">Five-Leaf Clover</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-4">TOOLS USED</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Canva",
                  "Figma",
                  "FigJam",
                  "Adobe Premiere Pro",
                  "Next.js",
                  "TypeScript",
                  "React",
                  "Vercel",
                ].map((tool) => (
                  <div key={tool} className="border border-white/30 p-4 hover:bg-white hover:text-black transition-colors cursor-default">
                    <p className="text-sm font-medium">{tool}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60 mb-4">METHODS USED</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "User Interviews",
                    "Surveys",
                    "Competitor Research",
                    "Empathy Mapping",
                    "User Journey Mapping",
                    "Wireframing",
                    "High-Fidelity Prototyping",
                  ].map((method) => (
                    <div key={method} className="border border-white/30 p-4 hover:bg-white hover:text-black transition-colors cursor-default">
                      <p className="text-sm font-medium">{method}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[01]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">THE PROBLEM</h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  hiring is broken for everyone involved
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
                    <p className="text-base md:text-lg text-black leading-relaxed max-w-[430px] ml-16">
                      The hiring process for early career roles is slow, unclear, and impersonal. Candidates feel
                      discouraged when companies take too long to respond or stopped responding completely. Now we know
                      that this is a two-way problem, and needs a solution that works for both sides of the equation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[02]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">RESEARCH & INSIGHTS</h2>

          <div className="mb-16">
            <p className="text-lg text-white/80 mb-12 max-w-4xl">
              Here's a look behind the scenes of some of our research, both in-class and out of class. (FigJam was a lifesaver for this project!) We started by surveying candidates about their job search frustrations. 87% said they relied on LinkedIn, 80% felt ghosted by long response times, and 40% struggled just finding relevant opportunities. Our interview questions dug deeper into what actually blocks people during hiring. We also analyzed how companies like Fidelity, Fisher Investments, Charles Schwab, and Raymond James present career info on their sites, looking at what they emphasize and where candidates might get lost.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("research", 0)}
              >
                <Image
                  src="/interview questions.png"
                  alt="Interview questions and research process"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("research", 1)}
              >
                <Image
                  src="/surveypercentages.png"
                  alt="Survey results and percentages"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden md:col-span-2 cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("research", 2)}
              >
                <Image
                  src="/website-research-1.png"
                  alt="Competitor website research"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">KEY FINDINGS</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-violet-500/50 p-8 bg-violet-900/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-violet-300">GHOSTING & SLOW TIMELINES</h4>
              <p className="text-white/70">
                Candidates felt discouraged when companies took too long to respond or stopped responding completely.
              </p>
            </div>
            <div className="border border-purple-500/50 p-8 bg-purple-900/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-purple-300">COOKIE-CUTTER INTERVIEWS</h4>
              <p className="text-white/70">
                Interviews often felt scripted and didn't let candidates show personality, values, or real fit.
              </p>
            </div>
            <div className="border border-indigo-500/50 p-8 bg-indigo-900/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-indigo-300">
                VAGUE "ENTRY-LEVEL" EXPECTATIONS
              </h4>
              <p className="text-white/70">
                Many roles were labeled entry-level but still expected experience, making requirements feel unclear
                or unrealistic.
              </p>
            </div>
            <div className="border border-blue-500/50 p-8 bg-blue-900/10">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-blue-300">PLATFORM DEPENDENCE</h4>
              <p className="text-white/70">
                Most candidates relied heavily on sites like LinkedIn/Indeed, which made the search feel repetitive
                and crowded.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[03]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">USER EMPATHY</h2>

          <div className="space-y-8">
            <div>
              <p className="text-lg text-white/80 mb-6">
                We built empathy maps for different types of candidates to understand how the hiring process actually feels. They show what people see and hear in their search, and how they think, feel, speak, and act when they apply for roles. We also created 2x2 grids that chart traits like confidence, experience, and hope so we could design for real mindsets instead of averages.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden mb-8 cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("empathy", 0)}
              >
                <Image
                  src="/empathy-maps.png"
                  alt="Empathy map showing candidate experiences"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden mb-8 cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("empathy", 1)}
              >
                <Image
                  src="/gridmaps.png"
                  alt="2x2 maps and analysis"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">THE USER JOURNEY MAP</h3>
              <p className="text-lg text-white/80 mb-6">
                15-step candidate journey from discovery to hire
              </p>
              <div className="space-y-4">
                <div
                  className="relative aspect-[21/9] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("journey", 0)}
                >
                  <Image
                    src="/journeymappart1.png"
                    alt="User journey map part 1"
                    fill
                  quality={75}
                    className="object-contain"
                  />
                </div>
                <div
                  className="relative aspect-[21/9] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("journey", 1)}
                >
                  <Image
                    src="/journeymappart2.png"
                    alt="User journey map part 2"
                    fill
                  quality={75}
                    className="object-contain"
                  />
                </div>
                <div
                  className="relative aspect-[21/9] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("journey", 2)}
                >
                  <Image
                    src="/journeymappart3.png"
                    alt="User journey map part 3"
                    fill
                  quality={75}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[04]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">THE SOLUTION</h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  proof over promises, skills over resumes
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
                      We built a platform where employers define what they actually need for a role and candidates prove
                      they can do it through structured learning. Instead of guessing what a resume means, recruiters see
                      real preparation and earned certificates. Candidates can feel more confident knowing exactly what's expected,
                      and both sides waste less time on mismatched interviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[05]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">DESIGN PROCESS</h2>

          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">01 // WIREFRAMES</h3>
              <p className="text-white/70 mt-4">
                Our early sketches tried a lot of ideas, like a dating app style matching concept and an Action Center for tracking every step. Exploring those versions made it clear that extra dashboards would slow HR teams down instead of helping them. That pushed us toward the simpler course based flow I described earlier in our solution section.
              </p>
            </div>
            <div className="space-y-6">
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("wireframes", 0)}
              >
                <Image
                  src="/initialwireframing-and-inspirations.png"
                  alt="Initial wireframing and inspirations"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>

              {/* First row - 3 images (consistent portrait ratio) */}
              <div className="grid grid-cols-3 gap-6">
                <div
                  className="relative aspect-[3/4] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("wireframes", 1)}
                >
                  <Image
                    src="/paper-wireframes-part1.png"
                    alt="Paper wireframe part 1"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
                <div
                  className="relative aspect-[3/4] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("wireframes", 2)}
                >
                  <Image
                    src="/paper-wireframes-part2.png"
                    alt="Paper wireframe part 2"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
                <div
                  className="relative aspect-[3/4] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("wireframes", 3)}
                >
                  <Image
                    src="/paper-wireframes-part3.png"
                    alt="Paper wireframe part 3"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Second row - 2 images (wide + small portrait) aligned at bottom */}
              <div className="grid grid-cols-3 gap-6 items-end">
                <div
                  className="relative aspect-[4/3] col-span-2 border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("wireframes", 4)}
                >
                  <Image
                    src="/paper-wireframes-part4.png"
                    alt="Paper wireframe part 4"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
                <div
                  className="relative aspect-[3/4] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("wireframes", 5)}
                >
                  <Image
                    src="/paper-wireframes-part5.png"
                    alt="Paper wireframe part 5"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">02 // FIGMA HIGH FIDELITY SCREENS</h3>
              <p className="text-white/70 mt-4">
                These high fidelity screens in Figma helped us explore different feature sets and layouts before building anything. They kept us focused on what actually blocked candidates in their search, like unclear expectations, weak human connection, and unpredictable communication. Designing these flows also made it clear that employers needed a simple way to scan assessment scores, compare candidates at a glance, and see who was truly prepared. It pushed us to frame the experience as a benefit for candidates beyond one company, since they could show their certificates on LinkedIn and carry that proof with them.
              </p>
            </div>
            <div
              className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
              onClick={() => openLightbox("iterations", 0)}
            >
              <Image
                src="/HiFiDigitalDesigns.png"
                alt="High-fidelity digital designs"
                fill
                  quality={75}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">03 // BUILT PRODUCT SCREENS</h3>
              <p className="text-white/70 mt-4">
                These are the final product screens from the live site we built with TypeScript and Next.js. Together they show the full Preface flow from job discovery to skill proof to shareable results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 6, 7, 8, 9, 10, 11].map((num, idx) => (
                <div
                  key={num}
                  className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("highfidelity", idx)}
                >
                  <Image
                    src={`/FinalScreen${num}.png`}
                    alt={`Final screen ${num}`}
                    fill
                  quality={75}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[06]"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tighter">VISUAL IDENTITY</h2>

          <p className="text-lg text-white/80 mb-8">
            For Preface's brand identity, we aimed for a look that feels credible enough for finance but still welcoming for users. The purple based palette and soft gradients helped us balance "professional" with "approachable," so the product feels trustworthy without looking cold or corporate. For the logo, we moved from quick sketches to a simple mark that mixes the P with subtle check and X cues, so it hints at preparation, proof, and completion while staying clear at small sizes across the app, certificates, and profiles.
          </p>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("branding", 0)}
          >
            <Image
              src="/LogoDesignsAndColors.png"
              alt="Logo designs and color palette"
              fill
                  quality={75}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-xs text-white/60 tracking-widest">{"[07]"}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">PROJECT SUMMARY</h2>
              <p className="text-sm md:text-base text-white/50">
                turning the hiring problem into a two sided solution
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
                    top: "35px",
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
                      Early career hiring is broken. Candidates wait weeks for responses that never come. HR teams spend
                      hours screening resumes without knowing who can actually do the work. The process is vague,
                      impersonal, and inefficient for everyone involved.
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
                    top: "35px",
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
                      Preface turns potential into proof. Companies design role-specific learning paths with the Preface
                      team. Candidates complete the coursework and earn certificates that demonstrate real readiness.
                      Recruiters get detailed skill assessments that make hiring decisions faster and more accurate.
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
                    top: "35px",
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
                      This approach replaces guesswork with evidence. Both sides build trust through transparency. Strong
                      candidates stay engaged instead of dropping out. Teams hire with confidence instead of crossing
                      their fingers. The platform scales while keeping the process human.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[08]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">INTERACTIVE PROTOTYPE</h2>

          <div className="mb-16">
            <a
              href="https://aed-preface.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block transition-transform hover:translate-x-2"
            >
              <svg
                className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                viewBox="0 0 280 50"
                preserveAspectRatio="xMinYMin meet"
                style={{
                  height: "100%",
                }}
              >
                <polygon points="0,0 280,0 257,50 0,50" fill="white" className="transition-all" />
              </svg>
              <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                <span>VIEW PROTOTYPE</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">PROMOTIONAL VIDEO</h3>
          <div className="relative aspect-video border border-white/20 overflow-hidden">
            <iframe
              src="https://drive.google.com/file/d/1EEE9ZcNRo40xqruDH688TkFfKuZ9k0vG/preview"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
              title="Preface promotional video"
            />
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/20 py-12 bg-black">
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
      {lightboxOpen && currentSection && (
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
