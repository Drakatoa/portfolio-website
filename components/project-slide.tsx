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
  videoLabel?: string
  devpostUrl?: string
}

// Helper function to get project color
const getProjectColor = (projectTitle: string): string => {
  const title = projectTitle.toUpperCase()
  if (title.includes("PREFACE")) return "#70587C"
  if (title.includes("AEGIS")) return "#5AD0FF"
  if (title.includes("IDEATE")) return "#5870BC"
  if (title.includes("INCLUSION") || title.includes("DESIGN FOR INCLUSION") || title.includes("DEI")) return "#400C23"
  if (title.includes("ZENZ")) return "#EC76C3"
  if (title.includes("ARC")) return "#444549"
  if (title.includes("CSA") || title.includes("UTD")) return "#455668"
  if (title.includes("DELHI") || title.includes("OLYMPICS") || title.includes("NEW DELHI")) return "#FF6B35"
  return "rgba(255, 255, 255, 0.3)" // default
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
    <div className="relative w-full min-h-screen bg-black overflow-hidden text-white selection:bg-white selection:text-black">
      <div className="absolute bottom-4 right-8 z-20 pointer-events-auto">
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

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-6 md:p-8 lg:p-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 flex-1">
          <div className="w-full lg:w-[55%] flex flex-col">

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

            <div className="mb-6 lg:mb-8">
              <p className="text-xs font-black tracking-widest mb-3 md:mb-4">PROJECT TAGS</p>
              <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-white/50 px-3 py-2 bg-black text-white hover:bg-white hover:text-black transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8 max-w-full lg:max-w-xl">
              <p className="text-xs font-black tracking-widest mb-3 md:mb-4">PROJECT DESCRIPTION</p>
              <div className="h-32 md:h-40 overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 hover:[&::-webkit-scrollbar-thumb]:bg-white/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{description}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-auto h-[120px] items-end">
              {/* Column 1 */}
              <div className="flex flex-col gap-3 justify-end">
                {hasProject && (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-fit transition-transform hover:translate-x-2"
                  >
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
                      <polygon points="0,0 280,0 257,50 0,50" fill="none" stroke={projectColor} strokeWidth="8" />
                      <line x1="0" y1="0" x2="0" y2="50" stroke={projectColor} strokeWidth="12" />
                    </svg>
                    <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>
                )}

                {!hasProject && hasCode && (
                  <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="group relative w-fit transition-transform hover:translate-x-2">
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
                    <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                      <span>CODE</span>
                      <Code className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    </div>
                  </a>
                )}

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
                    <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tetter text-black whitespace-nowrap">
                      <span>{videoLabel}</span>
                      <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                  </button>
                )}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3 justify-end">
                {hasProject && hasCode && (
                  <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="group relative w-fit transition-transform hover:translate-x-2">
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
                    <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                      <span>CODE</span>
                      <Code className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    </div>
                  </a>
                )}

                {hasCaseStudy && (
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
                      <polygon points="0,0 240,0 220,50 0,50" fill="none" stroke={projectColor} strokeWidth="8" />
                      <line x1="0" y1="0" x2="0" y2="50" stroke={projectColor} strokeWidth="12" />
                    </svg>
                    <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>
                )}

                {devpostUrl && (
                  <a href={devpostUrl} target="_blank" rel="noopener noreferrer" className="group relative w-fit transition-transform hover:translate-x-2">
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
                    <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                      <span>DEVPOST</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Parallelogram shaped image - Desktop */}
          <div className="hidden lg:flex w-full lg:w-[45%] relative mr-16 items-center">
            <div className="relative w-full flex flex-col items-end">
              {/* Aegis Easter Egg - positioned above parallelogram using flex */}
              {title === "AEGIS" && (
                <div className="mb-[-0px] md:mb-[-0px] xl:mb-[-0px] 2xl:mb-[-0px] z-30 pointer-events-none self-end mr-2 md:mr-4 lg:mr-6 xl:mr-0 2xl:mr-0 ml-4 md:ml-6 lg:ml-8 xl:ml-11 2xl:ml-15">
                  <Image
                    src="/aigis-easter-egg.png"
                    alt="Aigis easter egg"
                    width={120}
                    height={120}
                    className="object-contain w-auto h-auto max-h-[100px] md:max-h-[120px] xl:max-h-[140px] 2xl:max-h-[150px] drop-shadow-lg"
                    quality={100}
                  />
                </div>
              )}
              <div className="relative w-full h-[350px] max-h-[calc(100vh-250px)] xl:h-[420px] 2xl:h-[550px] max-w-[750px]">
                {/* Offset outline - rendered first (below) */}
                <svg
                  className="absolute pointer-events-none z-0"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "30px",
                    top: "30px",
                  }}
                >
                  <polygon
                    points="8,0 100,0 92,100 0,100"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.6"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Main image border - only for Auralis */}
                {(title === "AURALIS" || title === "IDEATE - AI WHITEBOARD") && (
                  <svg
                    className="absolute pointer-events-none z-20"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <polygon
                      points="8,0 100,0 92,100 0,100"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.3"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}

                {/* Image */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
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
            <div className="relative w-full h-64 md:h-80">
              {/* Offset outline - rendered first (below) */}
              <svg
                className="absolute pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  width: "100%",
                  height: "100%",
                  left: "20px",
                  top: "30px",
                }}
              >
                <polygon
                  points="6,0 100,0 94,100 0,100"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Main image border */}
              <svg
                className="absolute pointer-events-none z-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <polygon
                  points="6,0 100,0 94,100 0,100"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Image */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0% 100%)",
                }}
              >
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
