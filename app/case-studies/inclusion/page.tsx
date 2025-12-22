"use client"

import Image from "next/image"
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function InclusionCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Define image groups by section
  const imageSections = {
    secondary: [
      { src: "/dei-pages-stripped.png", alt: "DEI pages and resources stripped from university websites" },
    ],
    research: [
      { src: "/empathy-map-inclusion.png", alt: "Empathy map showing nonbinary student experiences" },
      { src: "/persona-inclusion.png", alt: "User persona for nonbinary student" },
    ],
    journey: [
      { src: "/journey-map-inclusion-1.png", alt: "User journey map part 1" },
      { src: "/journey-map-inclusion-2.png", alt: "User journey map part 2" },
    ],
    features: [
      { src: "/recommendation-resource-hub.png", alt: "Recommendation 1: Centralized LGBTQ+ resource hub" },
      { src: "/recommendation-feedback-system.png", alt: "Recommendation 2: Feedback system and identity change guide" },
      { src: "/recommendation-event-feed.png", alt: "Recommendation 3: Event feed and opportunities hub" },
    ],
    data: [
      { src: "/average-value-usage-chart.png", alt: "Average value vs usage ratings for app features" },
      { src: "/lgbtq-vs-straight-charts.png", alt: "LGBTQ+ vs straight student feature ratings comparison" },
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

          <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">
            DESIGNING FOR REAL INCLUSION
          </h1>

          <div className="relative aspect-[21/9] mb-12 border border-white/20 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <Image
              src="/dei-header.png"
              alt="Designing for Real Inclusion header"
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-full">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mb-8">
              This is my HCI research examining nonbinary student experiences at UT Dallas after 28% reported not feeling a sense of belonging. I conducted qualitative interviews revealing students only found resources through informal networks and existing policies lacked enforcement. I then proposed three interventions: a centralized LGBTQ+ resource hub, an anonymous feedback system for misgendering incidents, and an inclusive event feed. Presented findings to UTD faculty.
            </p>
            <div className="inline-block bg-purple-500/20 border border-purple-500/30 px-6 py-3">
              <p className="text-sm font-bold tracking-wide">
                FOCUS: Nonbinary Inclusion at Universities
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">PROJECT DETAILS</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-purple-500 pl-4">
                  <p className="text-sm text-white/60 mb-1">ROLE</p>
                  <p className="font-bold text-lg">Lead Researcher, UX Designer, Interview Facilitator</p>
                </div>
                <div className="border-l-2 border-pink-500 pl-4">
                  <p className="text-sm text-white/60 mb-1">COURSE</p>
                  <p className="font-bold text-lg">Design Research</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="text-sm text-white/60 mb-1">PROJECT TYPE</p>
                  <p className="font-bold text-lg">Research & UX Design</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-4">TOOLS USED</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Figma",
                  "Miro",
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
                    "Secondary Research",
                    "Qualitative Interviews",
                    "Empathy Mapping",
                    "Persona Development",
                    "User Journey Mapping",
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
                  is this inclusion really real or just for show
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
                    <div className="max-w-[430px] ml-16">
                      <p className="text-base md:text-lg text-black leading-relaxed mb-4">
                        Nonbinary and gender-diverse students face systemic exclusion through institutional neglect. Despite existing DEI policies, students experience misgendering, invisible resources, and lack of support.
                      </p>
                    </div>
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
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">SECONDARY RESEARCH</h2>

          <p className="text-lg text-white/80 mb-8 max-w-4xl">
            Analysis revealed DEI centers being defunded across Texas and California, faculty reducing LGBTQ+ content due to fear of backlash, and institutions being slow to implement DEI-friendly policies. Students consistently rely on word of mouth for resources due to poor promotion and accessibility.
          </p>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden mb-2 cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("secondary", 0)}
          >
            <Image
              src="/dei-pages-stripped.png"
              alt="DEI pages and resources stripped from university websites"
              fill
              quality={75}
              className="object-contain"
            />
          </div>
          <p className="text-xs text-white/50 italic mb-12">
            DEI Pages and Resources stripped from university websites (Jessica Xing, The Huntington News)
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">KEY INSIGHTS FROM LITERATURE</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-purple-500/50 p-6 bg-purple-900/10">
              <h4 className="text-lg font-bold mb-3 text-purple-300">28%</h4>
              <p className="text-white/70 text-sm">
                of nonbinary students at UTD do not feel a sense of belonging (Basic Needs and Experience Survey)
              </p>
            </div>
            <div className="border border-pink-500/50 p-6 bg-pink-900/10">
              <h4 className="text-lg font-bold mb-3 text-pink-300">Institutional Rollbacks</h4>
              <p className="text-white/70 text-sm">
                DEI pages and resources being systematically removed from university websites across the country, reducing visibility of support services
              </p>
            </div>
            <div className="border border-blue-500/50 p-6 bg-blue-900/10">
              <h4 className="text-lg font-bold mb-3 text-blue-300">Faculty Self-Censorship</h4>
              <p className="text-white/70 text-sm">
                Professors reducing LGBTQ+ content in courses due to fear of political backlash and potential legal consequences
              </p>
            </div>
            <div className="border border-indigo-500/50 p-6 bg-indigo-900/10">
              <h4 className="text-lg font-bold mb-3 text-indigo-300">Hidden Knowledge Networks</h4>
              <p className="text-white/70 text-sm">
                Students discover resources like BNRC, Temoc's Closet, and pride organizations only through informal peer networks, not institutional channels
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
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">PRIMARY RESEARCH</h2>

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">QUALITATIVE INTERVIEWS</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              I conducted semi-structured interviews with nonbinary and gender-diverse students across UTD, University of Minnesota, and ArtCenter. Interviews lasted 25-50 minutes and uncovered critical pain points in daily university experiences.
            </p>

            <h4 className="text-xl font-bold mb-6 tracking-tight">KEY FINDINGS FROM INTERVIEWS</h4>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="border border-white/50 p-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">PERFORMATIVE PRONOUN SHARING</h4>
                <p className="text-white/70">
                  Professors ask for pronouns on day one but fail to remember or use them consistently, treating it as a performative gesture rather than genuine practice.
                </p>
              </div>
              <div className="border border-white/50 p-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">INVISIBLE RESOURCES</h4>
                <p className="text-white/70">
                  Critical support services remain hidden unless students actively search or hear through peers. BNRC, Temoc's Closet, and other resources lack institutional promotion.
                </p>
              </div>
              <div className="border border-white/50 p-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">AVOIDANCE OVER CORRECTION</h4>
                <p className="text-white/70">
                  Faculty avoid pronouns entirely instead of making effort to use correct ones, choosing silence over potential mistakes or learning.
                </p>
              </div>
              <div className="border border-white/50 p-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">LEGAL NAME DYSPHORIA</h4>
                <p className="text-white/70">
                  Legal names still appear in many systems triggering dysphoria, and with DEI rollbacks, students fear changing legal documents.
                </p>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">TARGET AUDIENCES</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-purple-900/20 border border-purple-500/30 p-8">
                <h4 className="text-xl font-bold mb-4 text-purple-300">PRIMARY AUDIENCE</h4>
                <p className="font-bold mb-2">Nonbinary and Gender-Diverse Gen Z Students</p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Age 18-25, primarily undergraduates</li>
                  <li>• Challenges: Misgendering, hidden support, social exclusion</li>
                  <li>• Aspirations: Visibility, real institutional support</li>
                  <li>• Communication: Digital-first, Discord/email with notifications</li>
                </ul>
              </div>
              <div className="bg-pink-900/20 border border-pink-500/30 p-8">
                <h4 className="text-xl font-bold mb-4 text-pink-300">SECONDARY AUDIENCE</h4>
                <p className="font-bold mb-2">Faculty, DEI Staff, Student Support Services</p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• Need better tools for inclusive communication</li>
                  <li>• Pain points: Lack of student feedback</li>
                  <li>• Gap between policy existence and actual usage</li>
                  <li>• Outdated event feeds with limited organizations</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">USER EMPATHY & JOURNEY</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              I built empathy maps and user personas to understand how the inclusion process actually feels. I also mapped the complete journey from arriving on campus to discovering resources, highlighting pain points where institutional support fails.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("research", 0)}
              >
                <Image
                  src="/empathy-map-inclusion.png"
                  alt="Empathy map showing nonbinary student experiences"
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
                  src="/persona-inclusion.png"
                  alt="User persona for nonbinary student"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <div
                className="relative aspect-[21/9] border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("journey", 0)}
              >
                <Image
                  src="/journey-map-inclusion-1.png"
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
                  src="/journey-map-inclusion-2.png"
                  alt="User journey map part 2"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">NOTABLE QUOTES</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-purple-500/50 p-6 bg-purple-900/10">
                <p className="text-white/90 italic mb-3">
                  "My prof asked for pronouns, then just guessed next week."
                </p>
                <p className="text-sm text-purple-300">On performative pronoun sharing</p>
              </div>
              <div className="border border-pink-500/50 p-6 bg-pink-900/10">
                <p className="text-white/90 italic mb-3">
                  "Without my friend at BNRC, I wouldn't even know it existed."
                </p>
                <p className="text-sm text-pink-300">On hidden resources</p>
              </div>
              <div className="border border-blue-500/50 p-6 bg-blue-900/10">
                <p className="text-white/90 italic mb-3">
                  "Professors just stop using pronouns altogether like they'd rather say nothing than get it right."
                </p>
                <p className="text-sm text-blue-300">On faculty avoidance</p>
              </div>
              <div className="border border-indigo-500/50 p-6 bg-indigo-900/10">
                <p className="text-white/90 italic mb-3">
                  "It's kinda weird like 'oh if you're gay or trans you should download this app.'"
                </p>
                <p className="text-sm text-indigo-300">On feature validation feedback</p>
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
                  making invisible resources visible and accessible
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
                      I proposed a mobile app with three main parts. First, a centralized LGBTQ+ resource hub with a searchable campus map. Second, an anonymous feedback system paired with identity change guides. Third, an inclusive event feed with networking opportunities. The goal was to reduce reliance on hidden knowledge and give structural support to those who need it.
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
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">PROPOSED FEATURES</h2>

          <div className="space-y-16">
            <div className="border-b border-white/20 pb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">01 // CENTRALIZED LGBTQ+ RESOURCE HUB</h3>
              <p className="text-white/70 text-lg mb-8 max-w-3xl">
                Searchable real-time campus map with pins for BNRC, Gender Center, Temoc's Closet, and other resources. Filter by category (health services, community events, support groups, bathrooms). Includes real-time office hours, event updates, and bookmarking capabilities.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden mb-8 cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("features", 0)}
              >
                <Image
                  src="/recommendation-resource-hub.png"
                  alt="Recommendation 1: Centralized LGBTQ+ resource hub"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div className="bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/30 p-8">
                <p className="font-bold text-purple-300 mb-2">VALUE RATING: 8.0/10</p>
                <p className="text-white/70 text-sm">
                  Reduces reliance on "hidden knowledge" and helps students navigate services and events they care about.
                </p>
              </div>
            </div>

            <div className="border-b border-white/20 pb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">02 // FEEDBACK SYSTEM + IDENTITY CHANGE GUIDE</h3>
              <p className="text-white/70 text-lg mb-8 max-w-3xl">
                Anonymous feedback tool for reporting misgendering and inclusion incidents without outing risks. Paired with step-by-step guides for updating names and pronouns across Comet Card, eLearning, Galaxy portal, and other university systems.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden mb-8 cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("features", 1)}
              >
                <Image
                  src="/recommendation-feedback-system.png"
                  alt="Recommendation 2: Feedback system and identity change guide"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div className="bg-gradient-to-br from-pink-900/20 to-transparent border border-pink-500/30 p-8">
                <p className="font-bold text-pink-300 mb-2">COMBINED VALUE: 8.0/10 (Feedback) + 8.3/10 (Identity Guide)</p>
                <p className="text-white/70 text-sm">
                  Students avoid reporting due to outing fears. This gives them a safe outlet and removes bureaucratic friction from identity updates.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">03 // EVENT FEED + OPPORTUNITIES HUB</h3>
              <p className="text-white/70 text-lg mb-8 max-w-3xl">
                Live, filterable stream of LGBTQ+ and general student org events, resource fairs, mental health pop-ups, and career opportunities. Follow organizations for personalized feeds. Built-in RSVP tool with save/share options. Integrates with resource map and calendar.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden mb-8 cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("features", 2)}
              >
                <Image
                  src="/recommendation-event-feed.png"
                  alt="Recommendation 3: Event feed and opportunities hub"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
              <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/30 p-8">
                <p className="font-bold text-blue-300 mb-2">VALUE RATING: 8.5/10 (Opportunities Feed)</p>
                <p className="text-white/70 text-sm">
                  Students often discover events after they've happened. Real-time feed keeps them informed about important opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[06]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">FEATURE VALIDATION</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            Surveyed students across different identities to validate proposed features. Measured both perceived value (1-10) and likelihood of usage (1-10). Results showed clear demand with notable differences between LGBTQ+ and straight student populations.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">LGBTQ+ VS STRAIGHT STUDENT RATINGS</h3>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden mb-12 cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("data", 1)}
          >
            <Image
              src="/lgbtq-vs-straight-charts.png"
              alt="LGBTQ+ vs straight student feature ratings comparison"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">AVERAGE VALUE & USAGE RATINGS</h3>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden mb-12 cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("data", 0)}
          >
            <Image
              src="/average-value-usage-chart.png"
              alt="Average value vs usage ratings for app features"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="border border-purple-500/50 p-6">
              <h4 className="text-2xl font-bold mb-2 text-purple-300">8.5</h4>
              <p className="text-sm text-white/60">LGBTQ+ Opportunities Feed</p>
              <p className="text-sm text-white/60">(Highest rated feature)</p>
            </div>
            <div className="border border-pink-500/50 p-6">
              <h4 className="text-2xl font-bold mb-2 text-pink-300">8.3</h4>
              <p className="text-sm text-white/60">Name & Identity Change Guide</p>
            </div>
            <div className="border border-blue-500/50 p-6">
              <h4 className="text-2xl font-bold mb-2 text-blue-300">8.0</h4>
              <p className="text-sm text-white/60">Centralized Resource Hub</p>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">KEY INSIGHTS FROM VALIDATION</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-purple-500/50 p-6 bg-purple-900/10">
              <h4 className="text-lg font-bold mb-3 text-purple-300">Usage Gap</h4>
              <p className="text-white/70 text-sm">
                Name Change Guide had high value (8.3) but lowest usage intent (3.27), suggests students want it but don't expect to use it frequently.
              </p>
            </div>
            <div className="border border-pink-500/50 p-6 bg-pink-900/10">
              <h4 className="text-lg font-bold mb-3 text-pink-300">Identity Specific Trends</h4>
              <p className="text-white/70 text-sm">
                LGBTQ+ students showed consistently higher intent to use features. Straight students appreciated ideas but rarely saw themselves engaging directly.
              </p>
            </div>
            <div className="border border-blue-500/50 p-6 bg-blue-900/10">
              <h4 className="text-lg font-bold mb-3 text-blue-300">Design Feedback</h4>
              <p className="text-white/70 text-sm">
                An interviewee gave the feedback that "It's kinda weird like 'oh if you're gay or trans you should download this app'", so it should be a general support tool with LGBTQ+ resources built in, not segregated.
              </p>
            </div>
            <div className="border border-indigo-500/50 p-6 bg-indigo-900/10">
              <h4 className="text-lg font-bold mb-3 text-indigo-300">High Perceived Value</h4>
              <p className="text-white/70 text-sm">
                All three features scored above 8.0 in perceived value, indicating strong demand for tools that address resource visibility, identity updates, and community engagement.
              </p>
            </div>
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
                what we learned and where to go from here
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
                      Performative inclusion harms students. DEI policies exist on paper but lack structural follow-through. Students experience daily misgendering, navigate bureaucratic identity changes alone, and discover critical resources only through peer networks.
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
                      Technology can reduce institutional friction. A centralized app makes hidden resources visible, gives students anonymous reporting channels, and keeps them informed about opportunities. Removes dependency on word-of-mouth knowledge transmission.
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
                      Community matters more than policy. Despite DEI rollbacks, the culture built by students remains strongest support system. Solutions should amplify existing community while addressing systemic gaps. Avoid segregation, integrate support into general university tools.
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
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">NEXT STEPS</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-300">USABILITY TESTING</h3>
              <p className="text-white/70 mb-4">
                Conduct usability testing with LGBTQ+ students across majors and identities, plus cisgender students. Iterate based on feedback and usage patterns collected through in-app surveys.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-pink-300">COLLABORATION</h3>
              <p className="text-white/70 mb-4">
                Seek support from UTD CS and ATEC capstone teams to develop prototype. Partner with student organizations, especially LGBTQ+ orgs like Pride @ UTD, for interface testing and event input.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 p-12">
            <h3 className="text-3xl font-bold mb-6">FULL PRESENTATION</h3>
            <p className="text-white/70 mb-8">
              View the complete research presentation with detailed findings, participant quotes, and recommendations presented to UTD faculty.
            </p>
            <a
              href="/Design Research Final Presentation - Rajit Goel.pdf"
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
                <span>VIEW PRESENTATION</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>
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

      {lightboxOpen && currentSection && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white transition-colors bg-black/50 p-3 rounded-full border border-white/20"
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

            <div className="absolute top-6 left-6 z-50 bg-black/50 px-4 py-2 rounded-full border border-white/20">
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
