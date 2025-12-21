"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { useState, useEffect } from "react"

export default function ZenzPage() {
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
      { src: "/zenz-wireframe-sketches.png", alt: "Wireframe sketches showing user flow and key screens" },
    ],
    branding: [
      { src: "/zenz-brand-identity-inspiration.png", alt: "Brand identity inspirations - imagery and color palettes" },
      { src: "/zenz-brand-identity-colors.png", alt: "Brand identity color palette" },
      { src: "/zenz-brand-identity-logo-typography.png", alt: "Brand identity logos and typography" },
    ],
    screens: [
      { src: "/zenz-final-1.png", alt: "Splash screen and app icon on home screen" },
      { src: "/zenz-final-2.png", alt: "Splash screen with Get Started button" },
      { src: "/zenz-final-3.png", alt: "Sign up and login screen" },
      { src: "/zenz-final-4.png", alt: "User profile setup with mental health goals" },
      { src: "/zenz-final-5.png", alt: "Notification permission request" },
      { src: "/zenz-final-6.png", alt: "Home dashboard with welcome message and activities" },
      { src: "/zenz-final-7.png", alt: "Guided meditation selection screen" },
      { src: "/zenz-final-8.png", alt: "Journaling and mood tracker screen" },
      { src: "/zenz-final-9.png", alt: "Suggested activities screen" },
      { src: "/zenz-final-10.png", alt: "Breathing meditation screen" },
      { src: "/zenz-final-11.png", alt: "Mantra meditation screen" },
      { src: "/zenz-final-12.png", alt: "Yoga meditation screen" },
      { src: "/zenz-final-13.png", alt: "Settings screen with profile settings" },
      { src: "/zenz-final-14.png", alt: "Talk to a therapist - AI chat interface" },
      { src: "/zenz-final-15.png", alt: "Talk to a therapist - conversation with AI" },
      { src: "/zenz-final-16.png", alt: "Past journal entries screen" },
      { src: "/zenz-final-17.png", alt: "Notifications screen" },
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

          <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">ZENZ</h1>

          <div className="relative aspect-[21/9] mb-12 border border-white/20 overflow-hidden">
            <Image
              src="/zenz-header.png"
              alt="Zenz mental health app branding"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
            A mental health app that helps people manage stress and practice mindfulness in the post-pandemic world. Zenz gives you private tools for daily wellness and emotional resilience.
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
                <div className="border-l-2 border-[#EA67BC] pl-4">
                  <p className="text-sm text-white/60 mb-1">ROLE</p>
                  <p className="font-bold text-lg">UI/UX Designer</p>
                </div>
                <div className="border-l-2 border-[#C4FAFF] pl-4">
                  <p className="text-sm text-white/60 mb-1">COURSE</p>
                  <p className="font-bold text-lg">Interaction Design I</p>
                </div>
                <div className="border-l-2 border-[#EDE8D0] pl-4">
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
                    "Visual Research",
                    "Inspiration Gathering",
                    "Wireframing",
                    "Use Case Development",
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

      {/* The New Normal Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[01]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">THE NEW NORMAL</h2>

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
                    The pandemic brought significant challenges to mental health, with isolation, stress, and anxiety
                    becoming prevalent as traditional avenues for support, like in-person therapy, became less
                    accessible. This shift highlighted the importance of remote mental wellness solutions, leading to
                    the rise of apps like Zenz.
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
                <div className="p-6 md:p-10 ml-10 mt-13 w-135 flex items-center">
                  <p className="text-base md:text-lg text-black leading-relaxed">
                    Zenz addresses the "New Normal" by giving you private tools like guided meditations and journaling. It tracks your mood and offers AI insights. As people adjust to hybrid work and busy schedules, Zenz fits mental wellness into daily routines without adding pressure.
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
            <div className="border border-[#EA67BC]/50 p-8 bg-[#EA67BC]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#EA67BC]">
                ESTABLISH REQUIREMENTS
              </h3>
              <p className="text-white/70 leading-relaxed">
                How can a mental wellness app help people manage stress and practice mindfulness while staying accessible and easy to use?
              </p>
            </div>

            <div className="border border-[#C4FAFF]/50 p-8 bg-[#C4FAFF]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#C4FAFF]">NEW-USE SCENARIOS</h3>
              <p className="text-white/70 leading-relaxed">
                A young professional feels overwhelmed by work and seeks a convenient, personalized self-care tool to
                integrate into their busy schedule.
              </p>
            </div>

            <div className="border border-[#EDE8D0]/50 p-8 bg-[#EDE8D0]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#EDE8D0]">
                FINAL DESIGN PARAMETERS
              </h3>
              <p className="text-white/70 leading-relaxed">
                Zenz gives you guided meditations, journaling, and mood tracking. AI insights help you understand patterns, and you can set goals and reminders that work for you.
              </p>
            </div>

            <div className="border border-[#EA67BC]/50 p-8 bg-[#EA67BC]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#EA67BC]">DESIGN EXPLORATION</h3>
              <p className="text-white/70 leading-relaxed">
                Focus on a calming color palette (light blue, pink, beige) and intuitive navigation. The app uses
                Zen-inspired elements, like lotus imagery, to create a serene and inviting experience.
              </p>
            </div>

            <div className="border border-[#C4FAFF]/50 p-8 bg-[#C4FAFF]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#C4FAFF]">PROOF OF CONCEPT</h3>
              <p className="text-white/70 leading-relaxed">
                The final interface flows smoothly from meditation to journaling to mood tracking. Everything connects naturally.
              </p>
            </div>

            <div className="border border-[#EDE8D0]/50 p-8 bg-[#EDE8D0]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#EDE8D0]">
                FINAL DESIGN SPECIFICATION
              </h3>
              <p className="text-white/70 leading-relaxed">
                The prototype design is ready for development, ensuring it is adaptable for mobile devices and includes
                robust data privacy measures for user trust.
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
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#EA67BC]">Meet Julia</h3>
                <p className="text-xl text-white/60 mb-6">30-year-old Project Manager</p>
              </div>

              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  Julia is juggling a demanding career and family responsibilities in a fast-paced world. Recently, she's
                  been feeling overwhelmed and anxious, struggling to maintain balance in her life. Traditional therapy
                  feels like too much of a commitment, and she needs something that fits seamlessly into her busy
                  schedule.
                </p>
                <p>
                  She's looking for quick, effective ways to manage her mental health without adding more pressure to her
                  already packed days. Julia wants to feel more in control and ready to tackle each day with confidence.
                </p>
              </div>

              <div className="pt-6 border-t border-white/20 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-[#C4FAFF] mb-2">Pain Points</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#C4FAFF] mt-1">•</span>
                      <span>Experiencing stress and anxiety from work-life balance challenges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#C4FAFF] mt-1">•</span>
                      <span>Lacks time for regular therapy sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#C4FAFF] mt-1">•</span>
                      <span>Needs accessible mental health tools that fit her schedule</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#EDE8D0] mb-2">Goals</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#EDE8D0] mt-1">•</span>
                      <span>Find quick, effective ways to manage stress and anxiety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#EDE8D0] mt-1">•</span>
                      <span>Integrate self-care into her daily routine without added pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#EDE8D0] mt-1">•</span>
                      <span>Feel more in control of her mental health and emotional well-being</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative aspect-square border border-white/20 overflow-hidden bg-white/5">
              <Image
                src="/zenz-julia.png"
                alt="Julia - User Persona"
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
            Early wireframes that map the journey from first launch through daily use. The sketches work through meditation flows, journaling, mood tracking, and how the AI therapist fits in. These establish the structure before moving to final designs.
          </p>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("wireframes", 0)}
          >
            <Image
              src="/zenz-wireframe-sketches.png"
              alt="Wireframe sketches showing user flow and key screens"
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
            The visual identity centers around the lotus flower, symbolizing purity, enlightenment, and rebirth in
            Eastern philosophy. The calming color palette and soft typography create a serene, approachable experience
            that promotes peace and self-reflection.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="border border-[#EA67BC]/50 p-8 bg-[#EA67BC]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#EA67BC]">LOGO & SYMBOL</h3>
              <p className="text-white/70 leading-relaxed">
                The lotus flower serves as the central symbol, representing growth from difficulty into beauty. Just as
                the lotus blooms from muddy waters, users can rise from stress to find inner peace.
              </p>
            </div>

            <div className="border border-[#C4FAFF]/50 p-8 bg-[#C4FAFF]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#C4FAFF]">COLOR PALETTE</h3>
              <p className="text-white/70 leading-relaxed">
                Soft blues for tranquility, gentle pinks for compassion and warmth, and beige tones for comfort create
                a calming visual environment that reduces anxiety and promotes mindfulness.
              </p>
            </div>

            <div className="border border-[#EDE8D0]/50 p-8 bg-[#EDE8D0]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#EDE8D0]">TYPOGRAPHY</h3>
              <p className="text-white/70 leading-relaxed">
                Pacifico gives headings a friendly, approachable feel, while Nunito Sans keeps body text readable across all screens and accessibility needs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
            Final screen designs that cover the full experience. You start at the splash screen, then move through meditation, journaling, mood tracking, suggested activities, and AI therapist support. Every screen keeps the calming colors and easy navigation from the brand identity.
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
            Try the interactive prototype to see how everything flows together, from onboarding through meditation, journaling, mood tracking, and AI therapist interactions.
          </p>

          <a
            href="https://www.figma.com/proto/kgl4D7CnXkYnVTUd5uUc8E/Interaction-Design-I?page-id=0%3A1&node-id=103-626&viewport=-6646%2C1159%2C0.16&t=1hv8o1n7IASxqHeI-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=103%3A626"
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
