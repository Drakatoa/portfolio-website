"use client"
import Image from "next/image"
import { ArrowUpRight, Code, ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { useState } from "react"

interface ProjectSlideProps {
  title?: string
  description?: string
  tags?: string[]
  imageUrl?: string
  index?: number
  total?: number
  status?: string
  onNext?: () => void
  onPrev?: () => void
  projectUrl?: string
  codeUrl?: string
  caseStudyUrl?: string
  videoUrl?: string
}

export function ProjectSlide({
  title = "Project Name",
  description = "Project Description",
  tags = ["Next.js", "PostgreSQL", "TypeScript"],
  imageUrl = "/project-showcase.jpg",
  index = 1,
  total = 11,
  status = "COMPLETE",
  onNext = () => {},
  onPrev = () => {},
  projectUrl = "#",
  codeUrl = "#",
  caseStudyUrl,
  videoUrl,
}: ProjectSlideProps) {
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden text-white selection:bg-white selection:text-black">
      {/* Background Image - Desktop only, hidden on mobile */}
      <div
        className="hidden lg:block absolute top-0 right-0 bottom-0 left-[45%] z-0"
        style={{
          clipPath: "polygon(35% 0, 100% 0, 100% 85%, 0% 100%)",
        }}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="w-full h-full object-cover opacity-90 grayscale contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent mix-blend-multiply" />
      </div>

      {/* Pagination - Absolutely positioned to bottom right */}
      <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
        <div className="flex items-center gap-4 text-base md:text-lg font-black bg-black/80 backdrop-blur-sm border border-white/30 px-5 py-3">
          <button
            onClick={onPrev}
            className="text-white/80 hover:text-white hover:scale-110 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <span className="tracking-wider">
            {String(index).padStart(2, "0")} <span className="text-white/50">of</span>{" "}
            {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={onNext}
            className="text-white/80 hover:text-white hover:scale-110 transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-6 md:p-8 lg:p-16">
        {/* Content Container */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 flex-1">
          {/* Left Column - Project Info */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Projects Header */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tighter">{"PROJECTS"}</h2>
            {/* Top border */}
            <div className="h-px w-full bg-white mb-6" />

            {/* Title with trapezoid */}
            <div className="relative mb-6 lg:mb-8" style={{ width: "fit-content", maxWidth: "100%" }}>
              <svg
                className="absolute inset-0 pointer-events-none"
                viewBox="0 0 550 180"
                preserveAspectRatio="none"
                style={{
                  width: "100%",
                  height: "100%",
                  left: 0,
                  top: 0,
                }}
              >
                <polygon points="0,0 550,0 507,180 0,180" fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>

              <div className="relative z-10 px-4 md:px-6 py-4 md:py-6 pr-12 md:pr-20">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-white text-black px-3 md:px-4 py-1.5 md:py-2 font-black italic text-xs md:text-sm flex-shrink-0">
                    {status}
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-tight">
                    {title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Tags section */}
            <div className="mb-6 lg:mb-8">
              <p className="text-xs font-black tracking-widest mb-3 md:mb-4">PROJECT TAGS</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-white/50 px-3 py-2 bg-black text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 max-w-full lg:max-w-xl">
              <p className="text-xs font-black tracking-widest mb-3 md:mb-4">PROJECT DESCRIPTION</p>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">{description}</p>
            </div>

            {/* Buttons - Now inline with content flow */}
            <div className="flex flex-col gap-3 mt-auto">
              <a href={projectUrl} className="group relative w-fit transition-transform hover:translate-x-2">
                <svg
                  className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  viewBox="0 0 280 50"
                  preserveAspectRatio="none"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <polygon points="0,0 280,0 257,50 0,50" fill="white" className="transition-all" />
                </svg>
                <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black">
                  <span>VIEW PROJECT</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>

              {videoUrl && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="group relative w-fit transition-transform hover:translate-x-2"
                >
                  <svg
                    className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    viewBox="0 0 240 50"
                    preserveAspectRatio="none"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <polygon points="0,0 240,0 220,50 0,50" fill="white" className="transition-all" />
                  </svg>
                  <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black">
                    <span>WATCH DEMO</span>
                    <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                </button>
              )}

              {caseStudyUrl && (
                <a href={caseStudyUrl} className="group relative w-fit transition-transform hover:translate-x-2">
                  <svg
                    className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    viewBox="0 0 240 50"
                    preserveAspectRatio="none"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <polygon points="0,0 240,0 220,50 0,50" fill="white" className="transition-all" />
                  </svg>
                  <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black">
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              )}

              {!caseStudyUrl && (
                <a href={codeUrl} className="group relative w-fit transition-transform hover:translate-x-2">
                  <svg
                    className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    viewBox="0 0 160 50"
                    preserveAspectRatio="none"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <polygon points="0,0 160,0 147,50 0,50" fill="white" className="transition-all" />
                  </svg>
                  <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black">
                    <span>CODE</span>
                    <Code className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Image visible on mobile */}
          <div className="w-full lg:hidden relative h-64 md:h-80">
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(10% 0, 100% 0, 100% 85%, 0% 100%)",
              }}
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="w-full h-full object-cover opacity-90 grayscale contrast-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowVideoModal(false)}
        >
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative aspect-video bg-black border border-white/20">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
