"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { useState, useEffect } from "react"

export default function DelhiOlympicsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Define image groups by section
  const imageSections = {
    logo: [
      { src: "/delhi-logo-with-symbolism.png", alt: "Logo design with symbolic origins and inspirations explained" },
      { src: "/delhi-sketch-part1.png", alt: "Logo design sketches and iterations - Part 1" },
      { src: "/delhi-sketch-part2.png", alt: "Logo design sketches and iterations - Part 2" },
      { src: "/delhi-sketch-part3.png", alt: "Final logo design in light and dark variations" },
    ],
    colors: [
      // Color palette images can be added here if needed
    ],
    deliverables: [
      { src: "/delhi-medals-deliverable.png", alt: "Olympic medals design - gold, silver, and bronze" },
      { src: "/delhi-tickets-banner-deliverable.png", alt: "Event tickets and promotional banners" },
      { src: "/delhi-motifs-final.png", alt: "Traditional Indian textile patterns and decorative motifs" },
    ],
    references: [
      { src: "/delhi-figma-references.png", alt: "Design inspiration and reference mood board" },
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

          <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">HOMETOWN OLYMPICS: NEW DELHI</h1>

          <div className="relative aspect-[21/9] mb-12 border border-white/20 overflow-hidden">
            <Image
              src="/delhi-header.png"
              alt="Hometown Olympics New Delhi branding"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
            A visual identity system for a hypothetical 2024 Olympics hosted in New Delhi, India (my parent's hometown). This project
            celebrates the vibrant culture and rich heritage of India's capital through
            cohesive branding that merges modern Olympic values with traditional Indian motifs.
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
                <div className="border-l-2 border-[#FF9933] pl-4">
                  <p className="text-sm text-white/60 mb-1">ROLE</p>
                  <p className="font-bold text-lg">Visual Designer, Brand Strategist</p>
                </div>
                <div className="border-l-2 border-[#FFD700] pl-4">
                  <p className="text-sm text-white/60 mb-1">COURSE</p>
                  <p className="font-bold text-lg">Design II</p>
                </div>
                <div className="border-l-2 border-[#9C27B0] pl-4">
                  <p className="text-sm text-white/60 mb-1">PROJECT TYPE</p>
                  <p className="font-bold text-lg">Branding & Visual Identity</p>
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
                    "Logo Design",
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

      {/* Design Ideals Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[01]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">DESIGN IDEALS</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            New Delhi's identity is shaped by centuries of cultural heritage, vibrant street life, and festive
            traditions. The visual system draws inspiration from three core attributes that define the city's
            spirit and energy.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-[#FF9933]/50 p-8 bg-[#FF9933]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#FF9933]">
                CULTURAL HERITAGE
              </h3>
              <p className="text-white/70 leading-relaxed">
                New Delhi's rich history spans from Mughal architecture to colonial influences. The design draws
                from iconic landmarks like the Red Fort, India Gate, and Lotus Temple, celebrating centuries of
                architectural grandeur.
              </p>
            </div>

            <div className="border border-[#FFD700]/50 p-8 bg-[#FFD700]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#FFD700]">
                VIBRANT MARKETS
              </h3>
              <p className="text-white/70 leading-relaxed">
                Chandni Chowk's bustling streets, colorful textiles, and aromatic spices inspired the visual
                energy. Traditional patterns from Indian fabrics and street art inform the design's dynamic
                aesthetic.
              </p>
            </div>

            <div className="border border-[#9C27B0]/50 p-8 bg-[#9C27B0]/10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#9C27B0]">FESTIVAL SPIRIT</h3>
              <p className="text-white/70 leading-relaxed">
                Diwali's lights, Holi's colors, and the celebration of unity in diversity capture Delhi's festive
                soul. The design reflects this joyous energy and sense of community that defines Indian
                celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Design Section */}
      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[02]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">THE LOGO</h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  lotus flower meets olympic torch
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
                      The lotus is India's national flower, symbolizing purity, enlightenment, and rebirth. Merged seamlessly with the Olympic torch rising from the center, the logo creates a unique visual identity that honors both local culture and global athletic excellence. The lotus blooms from muddy waters, reaching toward the light, just as athletes rise from challenges to achieve greatness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">Logo Inspiration & Design</h3>
              <p className="text-lg text-white/80 mb-8 max-w-4xl">
                The logo design process explored multiple iterations, from initial sketches to final variations. The final design merges the lotus flower with the Olympic torch, creating a unique visual identity that honors both Indian culture and Olympic values.
              </p>
              
              <div className="mb-12">
                <h4 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Symbolic Origins</h4>
                <p className="text-white/70 mb-6 max-w-3xl">
                  Each element of the logo draws from specific cultural motifs and Olympic symbols. The lotus represents India's national flower and the Lotus Temple, the torch base references the Ashoka Chakra from the Indian flag, and the colors reflect the vibrant spices and national fruit (mango) of India.
                </p>
                <div
                  className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                  onClick={() => openLightbox("logo", 0)}
                >
                  <Image
                    src="/delhi-logo-with-symbolism.png"
                    alt="Logo design with symbolic origins and inspirations explained"
                    fill
                    quality={75}
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Design Process & Iterations</h4>
                <p className="text-white/70 mb-6 max-w-3xl">
                  The logo evolved through multiple sketch iterations, exploring different lotus petal arrangements, torch base designs, and text styling. The final design balances traditional Indian aesthetics with modern Olympic branding.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {imageSections.logo.slice(1).map((image, idx) => (
                    <div
                      key={idx + 1}
                      className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                      onClick={() => openLightbox("logo", idx + 1)}
                    >
                      <Image src={image.src} alt={image.alt} fill quality={75} className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[03]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">COLOR PALETTE</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            The color system draws from the Indian flag and traditional cultural meanings. Each color carries deep
            significance in Indian culture and reflects the values celebrated during the Olympic Games.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="border border-[#FF9933]/50 p-8 bg-[#FF9933]/10">
              <div className="w-full h-32 bg-[#FF9933] mb-6 border border-white/20"></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-[#FF9933]">SAFFRON</h3>
              <p className="text-white/70 leading-relaxed">
                Represents courage, sacrifice, and the spirit of renunciation. A key color in the Indian flag, it
                embodies strength and national pride that drives Olympic athletes.
              </p>
            </div>

            <div className="border border-[#8B0000]/50 p-8 bg-[#8B0000]/10">
              <div className="w-full h-32 bg-[#8B0000] mb-6 border border-white/20"></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-[#DC143C]">MAROON / RED</h3>
              <p className="text-white/70 leading-relaxed">
                Symbolizes passion, energy, and the vitality of competition. Red is prominent in Indian festivals
                and celebrations, representing joy and auspiciousness.
              </p>
            </div>

            <div className="border border-[#FFD700]/50 p-8 bg-[#FFD700]/10">
              <div className="w-full h-32 bg-[#FFD700] mb-6 border border-white/20"></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-[#FFD700]">GOLD</h3>
              <p className="text-white/70 leading-relaxed">
                Represents warmth, victory, and the pursuit of excellence. Gold captures the aspirational nature of
                the Olympics and India's rich heritage of craftsmanship.
              </p>
            </div>

            <div className="border border-[#9C27B0]/50 p-8 bg-[#9C27B0]/10">
              <div className="w-full h-32 bg-[#9C27B0] mb-6 border border-white/20"></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-[#9C27B0]">PURPLE</h3>
              <p className="text-white/70 leading-relaxed">
                Symbolizes royalty, wisdom, and spiritual depth. Purple reflects the regal history of Indian royalty
                and the dignified nature of Olympic competition.
              </p>
            </div>
          </div>

          {imageSections.colors.length > 0 && (
            <div className="mt-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">Color Applications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {imageSections.colors.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                    onClick={() => openLightbox("colors", idx)}
                  >
                    <Image src={image.src} alt={image.alt} fill quality={75} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[04]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">DELIVERABLES</h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            The visual identity extends across multiple touchpoints, from medals and tickets to banners and textile
            patterns. Each deliverable maintains the cohesive branding while celebrating Indian cultural motifs.
          </p>

          <div className="space-y-8 mb-16">
            <div className="border border-white/20 p-8 hover:border-white/40 transition-colors">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white/90">OLYMPIC MEDALS</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Designed medals incorporating the lotus-torch logo with traditional Indian motifs. Each medal
                features intricate textile patterns inspired by Indian fabrics, celebrating the craftsmanship and
                artistry of the region.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("deliverables", 0)}
              >
                <Image
                  src="/delhi-medals-deliverable.png"
                  alt="Olympic medals design - gold, silver, and bronze"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="border border-white/20 p-8 hover:border-white/40 transition-colors">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white/90">EVENT TICKETS & BANNERS</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Created vibrant ticket designs that blend modern Olympic branding with traditional Indian patterns.
                Each ticket serves as a collectible piece of art, featuring the signature color palette and cultural
                motifs. Large-scale banners feature athletes and the lotus logo, creating a cohesive visual experience throughout Olympic venues.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("deliverables", 1)}
              >
                <Image
                  src="/delhi-tickets-banner-deliverable.png"
                  alt="Event tickets and promotional banners"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="border border-white/20 p-8 hover:border-white/40 transition-colors">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white/90">TEXTILE PATTERNS</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Adapted traditional Indian textile patterns into modern Olympic branding elements. These patterns
                appear across all touchpoints, from uniforms to venue decorations, creating a unified cultural
                identity.
              </p>
              <div
                className="relative aspect-video border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors"
                onClick={() => openLightbox("deliverables", 2)}
              >
                <Image
                  src="/delhi-motifs-final.png"
                  alt="Traditional Indian textile patterns and decorative motifs"
                  fill
                  quality={75}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Resources Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[05]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            INSPIRATIONS & REFERENCES
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-4xl">
            A comprehensive mood board and reference collection showcasing the visual research and inspiration behind the New Delhi Olympics branding. This includes logo concepts, color palettes, cultural landmarks, traditional patterns, and symbolic elements that informed the final design system.
          </p>

          <div
            className="relative aspect-video border border-white/20 overflow-hidden mb-12 cursor-pointer hover:border-white/40 transition-colors"
            onClick={() => openLightbox("references", 0)}
          >
            <Image
              src="/delhi-figma-references.png"
              alt="Design inspiration and reference mood board"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-white/20 p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-white/90">Cultural Heritage</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF9933] mt-1">●</span>
                  <span>Red Fort and Mughal architectural elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FFD700] mt-1">●</span>
                  <span>India Gate monumentality and symmetry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9C27B0] mt-1">●</span>
                  <span>Lotus Temple's modern interpretation of tradition</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC143C] mt-1">●</span>
                  <span>Qutub Minar's intricate carvings and patterns</span>
                </li>
              </ul>
            </div>

            <div className="border border-white/20 p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-white/90">Visual Elements</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF9933] mt-1">●</span>
                  <span>Chandni Chowk market vibrancy and color</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FFD700] mt-1">●</span>
                  <span>Traditional Indian textile patterns and motifs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9C27B0] mt-1">●</span>
                  <span>Diwali festival lights and celebrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC143C] mt-1">●</span>
                  <span>Holi's explosion of color and joy</span>
                </li>
              </ul>
            </div>
          </div>
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
