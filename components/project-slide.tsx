"use client"
import Image from "next/image"
import { ArrowUpRight, Code, ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { useState } from "react"
import { getProjectColor, brightenColor } from "@/lib/project-colors"
import { SLANT_DEG, parallelogramClip, trapezoidClip } from "@/lib/slant"

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
  projectLabel?: string
  codeUrl?: string
  caseStudyUrl?: string
  videoUrl?: string
  videoLabel?: string
  devpostUrl?: string
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
  projectLabel,
  codeUrl = "#",
  caseStudyUrl,
  videoUrl,
  videoLabel = "WATCH VIDEO",
  devpostUrl,
}: ProjectSlideProps) {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const isEmbedVideo = (videoUrl?.includes("drive.google.com") || videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be")) ?? false
  const hasCaseStudy = !!caseStudyUrl
  const hasCode = !!codeUrl && codeUrl !== "#"
  const hasProject = !!projectUrl && projectUrl !== "#"
  const projectColor = getProjectColor(title)

  return (
    <div className="relative w-full lg:h-full bg-black overflow-hidden text-white selection:bg-white selection:text-black">
      <div className="absolute bottom-4 right-8 z-20 pointer-events-none">
        <div className="flex items-center gap-4 text-base md:text-lg font-black bg-black/80 backdrop-blur-sm border border-white/30 px-5 py-3">
          <span className="tracking-wider">
            {String(index).padStart(2, "0")} <span className="text-white/50">of</span>{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Side navigation arrows */}
      <button
        onClick={onPrev}
        aria-label="Previous project"
        className="absolute left-0 md:left-1 top-1/2 -translate-y-1/2 z-30 p-1.5 md:p-2 text-white/40 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
      </button>
      <button
        onClick={onNext}
        aria-label="Next project"
        className="absolute right-0 md:right-1 top-1/2 -translate-y-1/2 z-30 p-1.5 md:p-2 text-white/40 hover:text-white transition-colors"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
      </button>

      <div className="relative z-10 w-full lg:h-full flex flex-col px-12 py-6 md:px-16 md:py-8 lg:px-20 lg:pt-4 lg:pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 flex-1 min-h-0">
          <div className="w-full lg:w-[55%] flex flex-col lg:justify-center">

            <div className="relative mb-5 flex items-stretch gap-4 md:gap-6" style={{ width: "fit-content", maxWidth: "100%" }}>
              <div className="py-2 md:py-3">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-white text-black px-3 md:px-4 py-1.5 md:py-2 font-black italic text-xs md:text-sm flex-shrink-0">
                    {status}
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-tight">
                    {title}
                  </h1>
                </div>
              </div>
              {/* single diagonal edge at the standard slant angle */}
              <div
                className="w-[3px] bg-white self-stretch flex-shrink-0"
                style={{ transform: `skewX(${-SLANT_DEG}deg)` }}
                aria-hidden="true"
              />
            </div>

            {/* Primary action - pinned directly under the title (DBH-style bar) */}
            {(hasCaseStudy || hasProject) && (() => {
              const isCs = hasCaseStudy
              const href = isCs ? caseStudyUrl : projectUrl
              const label = isCs ? "VIEW CASE STUDY" : (projectLabel ?? "VIEW PROJECT")
              const brightColor = brightenColor(projectColor, 0.4)
              return (
                <div className="relative mb-8 lg:mb-10 w-fit">
                  {/* corner brackets */}
                  <span className="absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2 border-white/70 pointer-events-none" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2 border-white/70 pointer-events-none" aria-hidden="true" />
                  <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-white/70 pointer-events-none" aria-hidden="true" />
                  <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-white/70 pointer-events-none" aria-hidden="true" />
                  <a
                    href={href}
                    {...(isCs ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group relative block w-[320px] max-w-full transition-transform hover:translate-x-2"
                  >
                    <svg
                      className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      viewBox="0 0 320 56"
                      preserveAspectRatio="none"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <polygon points="0,0 320,0 306,56 0,56" fill="white" />
                      <polygon points="0,0 320,0 306,56 0,56" fill="none" stroke={projectColor} strokeWidth="8" />
                      <polygon
                        points="0,0 320,0 306,56 0,56"
                        fill="none"
                        stroke={brightColor}
                        strokeWidth="8"
                        className="animated-border"
                        style={{ strokeDasharray: "250 500", strokeLinecap: "round" }}
                      />
                    </svg>
                    <div className="relative z-10 flex items-center gap-2 px-8 py-4 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                      <span>{label}</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>
                </div>
              )
            })()}

            <div className="mb-6 lg:mb-8">
              <p className="text-xs font-black tracking-widest mb-3 md:mb-4">PROJECT TAGS</p>
              <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-white/50 px-3 py-2 bg-black text-white hover:border-white hover:bg-white/15 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6 max-w-full lg:max-w-xl">
              <p className="text-xs font-black tracking-widest mb-3 md:mb-4">PROJECT DESCRIPTION</p>
              <div className="max-h-32 md:max-h-40 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Secondary + tertiary actions */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Secondary: VIEW PROJECT when the case study is primary */}
              {hasCaseStudy && hasProject && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-fit transition-transform hover:translate-x-2"
                  style={{ "--slant": "12px" } as React.CSSProperties}
                >
                  <span
                    className="absolute inset-0 bg-white transition-colors"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-[2px] bg-black transition-colors group-hover:bg-neutral-800"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2 px-8 py-3 font-black text-base italic tracking-tighter text-white whitespace-nowrap">
                    <span>{projectLabel ?? "VIEW PROJECT"}</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              )}

              {/* Tertiary: outline-only utility links */}
              {hasCode && (
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-fit transition-transform hover:translate-x-2"
                  style={{ "--slant": "10px" } as React.CSSProperties}
                >
                  <span
                    className="absolute inset-0 bg-white/40 transition-colors group-hover:bg-white"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-[1.5px] bg-black"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2 px-6 py-2.5 font-black text-sm italic tracking-tighter text-white/80 group-hover:text-white whitespace-nowrap">
                    <span>CODE</span>
                    <Code className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </span>
                </a>
              )}
              {videoUrl && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="group relative w-fit transition-transform hover:translate-x-2"
                  style={{ "--slant": "10px" } as React.CSSProperties}
                >
                  <span
                    className="absolute inset-0 bg-white/40 transition-colors group-hover:bg-white"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-[1.5px] bg-black"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2 px-6 py-2.5 font-black text-sm italic tracking-tighter text-white/80 group-hover:text-white whitespace-nowrap">
                    <span>{videoLabel}</span>
                    <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </span>
                </button>
              )}
              {devpostUrl && (
                <a
                  href={devpostUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-fit transition-transform hover:translate-x-2"
                  style={{ "--slant": "10px" } as React.CSSProperties}
                >
                  <span
                    className="absolute inset-0 bg-white/40 transition-colors group-hover:bg-white"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-[1.5px] bg-black"
                    style={{ clipPath: trapezoidClip }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2 px-6 py-2.5 font-black text-sm italic tracking-tighter text-white/80 group-hover:text-white whitespace-nowrap">
                    <span>DEVPOST</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Parallelogram shaped image - Desktop */}
          <div className="hidden lg:flex w-full lg:w-[45%] relative items-center">
            <div className="relative w-full flex flex-col items-end">
              <div
                className="relative w-full max-w-[850px] [--img-h:clamp(300px,42svh,560px)] h-[var(--img-h)] [--slant:calc(var(--img-h)*0.2493)]"
              >
                {/* Aegis Easter Egg - spans the parallelogram's top edge, outside layout flow */}
                {title === "AEGIS" && (
                  <div
                    className="absolute bottom-full right-0 z-30 pointer-events-none"
                    style={{ left: "var(--slant)" }}
                  >
                    <Image
                      src="/aigis-easter-egg.png"
                      alt="Aigis easter egg"
                      width={750}
                      height={90}
                      className="w-full h-auto drop-shadow-lg"
                      quality={100}
                    />
                  </div>
                )}
                {/* Offset echo outline */}
                <div className="absolute inset-0 pointer-events-none z-0 translate-x-[30px] translate-y-[30px]">
                  <div className="absolute inset-0 bg-white/80" style={{ clipPath: parallelogramClip }} />
                  <div className="absolute inset-[1px] bg-black" style={{ clipPath: parallelogramClip }} />
                </div>

                {/* Thin border ring behind the image - visible for dark screenshots */}
                {(title === "AURALIS" || title === "IDEATE - AI WHITEBOARD") && (
                  <div
                    className="absolute -inset-[1.5px] pointer-events-none z-[5] bg-white/70"
                    style={{ clipPath: parallelogramClip }}
                  />
                )}

                {/* Image */}
                <div className="absolute inset-0 z-10" style={{ clipPath: parallelogramClip }}>
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover opacity-100 contrast-110"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Parallelogram shaped image - Mobile */}
          <div className="lg:hidden relative w-full flex flex-col items-end">
            {/* Aegis Easter Egg - positioned above parallelogram using flex */}
            {title === "AEGIS" && (
              <div className="mb-[-0px] md:mb-[-0px] z-30 pointer-events-none self-end mr-2 md:mr-0 ml-9 md:ml-12">
                <Image
                  src="/aigis-easter-egg.png"
                  alt="Aigis easter egg"
                  width={100}
                  height={100}
                  className="object-contain w-auto h-auto max-h-[80px] md:max-h-[100px] drop-shadow-lg"
                  quality={100}
                />
              </div>
            )}
            <div className="relative w-full h-64 md:h-80 [--slant:64px] md:[--slant:80px]">
              {/* Offset echo outline */}
              <div className="absolute inset-0 pointer-events-none z-0 translate-x-[20px] translate-y-[30px]">
                <div className="absolute inset-0 bg-white" style={{ clipPath: parallelogramClip }} />
                <div className="absolute inset-[1px] bg-black" style={{ clipPath: parallelogramClip }} />
              </div>

              {/* Thin border ring behind the image */}
              <div
                className="absolute -inset-[1px] pointer-events-none z-[5] bg-white/70"
                style={{ clipPath: parallelogramClip }}
              />

              {/* Image */}
              <div className="absolute inset-0 z-10" style={{ clipPath: parallelogramClip }}>
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  fill
                  className="object-cover opacity-100 contrast-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
              {isEmbedVideo ? (
                <iframe
                  src={videoUrl}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                  title={`${title} video`}
                />
              ) : (
                <video src={videoUrl} controls autoPlay className="w-full h-full">
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
