"use client"
import Image from "next/image"
import { ArrowUpRight, Code, ChevronLeft, ChevronRight } from "lucide-react"

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
}: ProjectSlideProps) {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden font-sans text-white selection:bg-white selection:text-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          clipPath: "polygon(55% 0, 100% 0, 100% 85%, 25% 100%)",
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

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-16 pointer-events-none">
        {/* TOP SECTION: Title area only */}
        <div className="flex justify-between items-start">
          {/* Left: Title Area */}
          <div className="pointer-events-auto max-w-2xl">
            {/* Top border */}
            <div className="h-px w-full bg-white mb-6" />

            <div className="relative mb-8" style={{ width: "fit-content" }}>
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
                <polygon points="0,0 480,0 550,180 0,180" fill="none" stroke="white" strokeWidth="1" />
              </svg>

              <div className="relative z-10 px-6 py-8 pr-20">
                <div className="flex items-start gap-4">
                  <div className="bg-white text-black px-4 py-2 font-black italic text-sm flex-shrink-0">{status}</div>
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase leading-tight">
                    {title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Tags section */}
            <div className="mb-12">
              <p className="text-xs font-black italic tracking-widest mb-4">PROJECT TAGS</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono border border-white/50 px-3 py-2 bg-black text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pointer-events-auto max-w-md">
              <p className="text-xs font-black italic tracking-widest mb-4">PROJECT DESCRIPTION</p>
              <p className="text-white/70 text-sm leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-col gap-2 mt-8 pointer-events-auto">
              <a href={projectUrl} className="group relative w-fit">
                <svg
                  className="absolute inset-0 pointer-events-none"
                  viewBox="0 0 280 50"
                  preserveAspectRatio="none"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <polygon points="0,0 240,0 280,50 0,50" fill="white" />
                </svg>
                <div className="relative z-10 flex items-center gap-2 px-6 py-3 font-black text-sm italic tracking-tighter text-black">
                  <span>View project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>

              <a href={codeUrl} className="group relative w-fit">
                <svg
                  className="absolute inset-0 pointer-events-none"
                  viewBox="0 0 200 50"
                  preserveAspectRatio="none"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <polygon points="0,0 160,0 200,50 0,50" fill="white" />
                </svg>
                <div className="relative z-10 flex items-center gap-2 px-6 py-3 font-black text-sm italic tracking-tighter text-black">
                  <span>Code</span>
                  <Code className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM: Pagination */}
        <div className="flex justify-end pointer-events-auto">
          <div className="flex items-center gap-4 text-sm font-mono font-black">
            <button
              onClick={onPrev}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span>
              {String(index).padStart(2, "0")} <span className="text-white/40">of</span>{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={onNext}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
