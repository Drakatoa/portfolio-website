"use client"

import Image from "next/image"
import { CaseStudyShell, CaseStudyLabel, CaseStudyMeta, SectionNumber, caseStudyProject, lightboxControl } from "@/components/case-study-shell"
import { SlantCard } from "@/components/slant-card"
import caseStudy from "@/components/case-study.module.css"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { useState, useEffect } from "react"

const project = caseStudyProject("utd-csa")

export default function UTDCsaCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Define image groups by section
  const imageSections = {
    moodboard: [
      { src: "/csa-initial-moodboard-inspirations.png", alt: "Initial moodboard and inspirations" },
    ],
    initial: [
      { src: "/csa-initial-designs.png", alt: "Initial design concepts" },
    ],
    chloeSketch: [
      { src: "/csa-chloe-sketch.png", alt: "Chloe's initial sketch for grunge block aesthetic" },
      { src: "/csa-chloe-final-sketch.png", alt: "Chloe's final sketch of Wang riding the rocket" },
    ],
    fleshedOut: [
      { src: "/csa-fleshed-out-designs-with-chloe-art.png", alt: "Fleshed out designs with Chloe's art added" },
    ],
    backFinal: [
      { src: "/csa-final-back-designs.png", alt: "Final back design variations" },
    ],
    frontFinal: [
      { src: "/csa-front-emblem-liz-art.png", alt: "Liz's front emblem art" },
      { src: "/csa-final-front-designs.png", alt: "Final front design variations" },
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
    <CaseStudyShell project={project}>
      {/* Hero Section */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-8">
            <CaseStudyLabel />
          </div>

          <div className="flex items-start justify-between mb-5">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              UTD CSA SHIRT DESIGN
            </h1>
          </div>
          <CaseStudyMeta project={project} className="mb-12" />

          <div className="relative aspect-[21/9] mb-12 border border-white/50 overflow-hidden">
            <Image
              src="/csa-header.png"
              alt="UTD CSA shirt design"
              fill
              quality={75}
              className="object-contain"
            />
          </div>

          <div className="max-w-full">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mb-8">
              How do you get 200+ college students to wear the same shirt? Wang the tiger riding a Lao Gan Ma rocket, apparently. CSA's 2025-2026 shirt celebrates the "5 Spices" family theme with a playful minimalist design and a front emblem riffing on P.F. Chang's: "P.F. Wang's."
            </p>
            <div className="inline-block bg-[#5AD0FF]/10 border border-[#5AD0FF]/50 px-6 py-3">
              <p className="text-sm font-bold tracking-wide text-[#5AD0FF]">
                FOCUS: Collaborative Brand Design & Visual Identity
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
                  <p className="text-sm text-white/60">Designer, Layout & Typography, Put Everything Together</p>
                </div>
                <div className="border-l-2 border-[#FFD233] pl-4">
                  <p className="font-bold text-lg">Chloe Tee</p>
                  <p className="text-sm text-white/60">Main Art & Design (Wang Riding Rocket, 5 Spices)</p>
                </div>
                <div className="border-l-2 border-[#4ADE80] pl-4">
                  <p className="font-bold text-lg">Liz Michel</p>
                  <p className="text-sm text-white/60">Main Art & Design (Wang Mascot, Front Emblem)</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">CLIENT</p>
                <p className="font-bold text-lg">UTD Chinese Student Association</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">PROJECT TYPE</p>
                <p className="font-bold text-lg">Graphic/Brand Design</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-4">TOOLS USED</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Figma",
                  "Procreate",
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
                <p className="text-sm text-white/60 mb-4">THEME</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "5 Spices",
                    "Modern-Minimalist Aesthetic",
                    "Wang Mascot",
                    "Lao Gan Ma",
                  ].map((theme) => (
                    <div
                      key={theme}
                      className="border border-white/50 p-4 hover:bg-white hover:text-black transition-colors cursor-default"
                    >
                      <p className="text-sm font-medium">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Starting Point */}
      <section className="relative border-b border-white/30">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <div className="mb-4">
                  <SectionNumber>01</SectionNumber>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">
                  THE STARTING POINT
                </h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  grunge vibes and a tiger in a bottle
                </p>
              </div>

              <SlantCard>
                <p className="text-base md:text-lg text-black leading-relaxed">
                  We had some inspirations from the moodboard and we wanted to initially go for a grunge style aesthetic. We had the mascot Liz designed, which was a cute tiger named Wang, and they were gonna be inside a Lao Gan Ma bottle. But we thought that he had to have more action and moving parts.
                </p>
              </SlantCard>
            </div>
          </div>
        </div>
      </section>

      {/* Moodboard & Inspiration */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <SectionNumber>02</SectionNumber>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            MOODBOARD & INSPIRATION
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            We started with a moodboard that captured the grunge aesthetic we were going for. The inspiration pulled from vintage Japanese streetwear and distressed textures that makes designs feel authentic and lived-in. As well as some references of bamboo and Lao Gan Ma of course.
          </p>

          <div className="mb-16">
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("moodboard", 0)}
            >
              <Image
                src="/csa-initial-moodboard-inspirations.png"
                alt="Initial moodboard and inspirations"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration with Chloe */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <SectionNumber>03</SectionNumber>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            COLLABORATION & ITERATION
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            We went to our former CSA president Chloe for help designing, and she quickly threw together a sketch to help with the grunge block aesthetic, although we did pivot to a more minimalist aesthetic. I started designing everything from there, other than the main center piece which was the cat riding the Lao Gan Ma rocket, and the 5 spices, which was the theme of this year for our fams. (I help co-lead Star Anise!)
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("chloeSketch", 0)}
            >
              <Image
                src="/csa-chloe-sketch.png"
                alt="Chloe's initial sketch for grunge block aesthetic"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("chloeSketch", 1)}
            >
              <Image
                src="/csa-chloe-final-sketch.png"
                alt="Chloe's final sketch of Wang riding the rocket"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Initial Designs</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              I got some initial designs done before Chloe sent her final sketch of Wang riding the rocket. These early concepts explored different layouts and compositions while we figured out the overall direction.
            </p>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("initial", 0)}
            >
              <Image
                src="/csa-initial-designs.png"
                alt="Initial design concepts"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Fleshing It Out</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              I then fleshed out my initial designs with the art added, including the 5 spices and main art she drew. This is where everything started coming together visually.
            </p>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("fleshedOut", 0)}
            >
              <Image
                src="/csa-fleshed-out-designs-with-chloe-art.png"
                alt="Fleshed out designs with Chloe's art added"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Color Decisions */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <SectionNumber>04</SectionNumber>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            COLOR & COMPOSITION DECISIONS
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            I couldn't decide if I wanted the blue to be the base or beige to be the base of the shirt, but we decided that the beige base made Wang look less creepy. (Sometimes color choices are just about not making your mascot look like a horror movie character, you know?)
          </p>

          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Final Back Design</h3>
            <p className="text-lg text-white/80 mb-8 max-w-4xl">
              As you can see in the final back designs, we repositioned some of the spices and messed with outline of objects versus full chunks to make it look better. We also added other potential colors that could suit the shirt, but overall we went with the blue one because it worked best.
            </p>
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("backFinal", 0)}
            >
              <Image
                src="/csa-final-back-designs.png"
                alt="Final back design variations"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Front Design */}
      <section className="relative border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <SectionNumber>05</SectionNumber>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter text-white">
            THE FRONT DESIGN
          </h2>

          <p className="text-lg text-white/80 mb-12 max-w-4xl">
            For the front design, the art of Wang as a chef was done by Liz, and she drew up the circle emblem that Wang was in as well. Meanwhile, I focused on emulating the typography and design of the P.F. Chang's logo but with "P.F. Wang's" instead, because we liked how cute and funny it was.
          </p>

          <div className="mb-16">
            <div
              className="relative aspect-square border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("frontFinal", 0)}
            >
              <Image
                src="/csa-front-emblem-liz-art.png"
                alt="Liz's front emblem art"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>

          <div className="border border-[#4ADE80]/50 p-8 bg-[#4ADE80]/10 mb-16">
            <h3 className="text-2xl font-bold mb-4 text-[#4ADE80]">FINAL DECISIONS</h3>
            <p className="text-white/70 text-lg">
              We finalized the front design to be beige base and navy text, just like the back design, and increased the width of the CSA Chinese text at the bottom. And that's a wrap on our shirt for UTD CSA 2025-2026's shirt design!
            </p>
          </div>

          <div className="mb-16">
            <div
              className="relative aspect-video border border-white/50 overflow-hidden cursor-pointer hover:border-white transition-colors"
              onClick={() => openLightbox("frontFinal", 1)}
            >
              <Image
                src="/csa-final-front-designs.png"
                alt="Final front design variations"
                fill
                quality={75}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section className="relative border-b border-white/30">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <SectionNumber>06</SectionNumber>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                PROJECT SUMMARY
              </h2>
              <p className="text-sm md:text-base text-white/50">
                collaborative design that celebrates culture and community
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <SlantCard offset={[35, 35]}>
                <p className="text-xs md:text-sm text-black leading-relaxed text-center">
                  This project was all about collaboration. Chloe brought the energy with her dynamic sketches of Wang riding the rocket, Liz created the adorable chef mascot, and I pulled everything together into a cohesive design system.
                </p>
              </SlantCard>

              <SlantCard offset={[35, 35]}>
                <p className="text-xs md:text-sm text-black leading-relaxed text-center">
                  The grunge aesthetic gave us that raw, authentic feel, while the playful P.F. Wang's reference added humor and personality. Sometimes the best designs are the ones that make people smile.
                </p>
              </SlantCard>

              <SlantCard offset={[35, 35]}>
                <p className="text-xs md:text-sm text-black leading-relaxed text-center">
                  The 5 Spices theme represented our family groups, and the final design balanced all these elements like action, humor, culture, and community, into something that felt authentically UTD CSA.
                </p>
              </SlantCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white">RESULTS & IMPACT</h2>
          <div className="h-px w-full bg-white/20 mb-16" />
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border border-white/20 p-8 bg-black/60">
              <p className="text-5xl font-bold mb-3 tracking-tighter">200+</p>
              <p className="text-sm text-white/60 leading-relaxed">Shirts purchased by CSA members in the 2025-2026 academic year</p>
            </div>
            <div className="border border-white/20 p-8 bg-black/60">
              <p className="text-5xl font-bold mb-3 tracking-tighter">3</p>
              <p className="text-sm text-white/60 leading-relaxed">Collaborating designers: art by Chloe Tee and Liz Michel, layout and composition by me</p>
            </div>
            <div className="border border-white/20 p-8 bg-black/60">
              <p className="text-5xl font-bold mb-3 tracking-tighter">2</p>
              <p className="text-sm text-white/60 leading-relaxed">Final designs: front emblem + full back graphic</p>
            </div>
          </div>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            Delivered: production-ready shirt artwork for one of UTD's largest cultural organizations, worn across campus all year.
          </p>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && currentSection && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className={`absolute top-6 right-6 z-50 ${lightboxControl}`}
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
              className={`absolute left-6 z-50 ${lightboxControl}`}
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
              className={`absolute right-6 z-50 ${lightboxControl}`}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  zoomOut()
                }}
                className={lightboxControl}
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className={`${caseStudy.readout} min-w-[72px]`}>
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  zoomIn()
                }}
                className={lightboxControl}
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            <div className={`absolute top-6 left-6 z-50 ${caseStudy.readout}`}>
              {currentImageIndex + 1} / {imageSections[currentSection as keyof typeof imageSections].length}
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
    </CaseStudyShell>
  )
}

