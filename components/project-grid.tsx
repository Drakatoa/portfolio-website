"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Code, Play, X } from "lucide-react"
import { useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  status: string
  image: string
  links: {
    project?: string
    code?: string
    caseStudy?: string
    videoUrl?: string
    videoLabel?: string
    devpost?: string
  }
}

interface ProjectGridProps {
  projects: Project[]
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

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [showVideoModal, setShowVideoModal] = useState<{ url: string; title: string } | null>(null)
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({})
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})
  const [hoveredAegis, setHoveredAegis] = useState(false)
  const isEmbedVideo = (url?: string) => (url?.includes("drive.google.com") || url?.includes("youtube.com") || url?.includes("youtu.be")) ?? false

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project) => {
          const hasCaseStudy = !!project.links.caseStudy
          const hasCode = !!project.links.code && project.links.code !== "#"
          const hasProject = !!project.links.project && project.links.project !== "#"
          const hasVideo = !!project.links.videoUrl
          const visibleTags = project.tech.slice(0, 3)
          const extraTags = project.tech.slice(3)
          const isExpanded = !!expandedTags[project.id]
          const isDescriptionExpanded = !!expandedDescriptions[project.id]

          return (
            <div
              key={project.id}
              className={`group relative bg-black border border-white/20 hover:border-white/40 transition-all overflow-visible flex flex-col ${
                project.title === "AEGIS" ? "md:mt-0 mt-20" : ""
              }`}
              onMouseEnter={() => project.title === "AEGIS" && setHoveredAegis(true)}
              onMouseLeave={() => project.title === "AEGIS" && setHoveredAegis(false)}
            >
              {/* Aegis Easter Egg - positioned on top of card */}
              {project.title === "AEGIS" && (
                <>
                  {/* Mobile: Easter egg takes up space in layout */}
                  <div className={`md:hidden flex justify-end mb-[-0px] z-30 pointer-events-none transition-opacity duration-300 ${
                    hoveredAegis ? "opacity-100" : "opacity-0"
                  }`}>
                    <Image
                      src="/aigis-easter-egg.png"
                      alt="Aigis easter egg"
                      width={100}
                      height={100}
                      className="object-contain w-auto h-auto max-h-[80px] drop-shadow-lg"
                      quality={100}
                    />
                  </div>
                  {/* Desktop: Easter egg positioned absolutely */}
                  <div className={`hidden md:block absolute -top-14 lg:-top-11 xl:-top-14 2xl:-top-18 right-0 z-30 pointer-events-none transition-opacity duration-300 ${
                    hoveredAegis ? "opacity-100" : "opacity-0"
                  }`}>
                    <Image
                      src="/aigis-easter-egg.png"
                      alt="Aigis easter egg"
                      width={100}
                      height={100}
                      className="object-contain w-auto h-auto max-h-[100px] lg:max-h-[120px] xl:max-h-[140px] 2xl:max-h-[150px] drop-shadow-lg"
                      quality={100}
                    />
                  </div>
                </>
              )}

              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white text-black px-3 py-1 font-black italic text-xs">
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tighter uppercase">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {visibleTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-white/50 px-2 py-1 bg-black text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                  {extraTags.length > 0 && (
                    <span
                      className="text-xs border border-white/50 px-2 py-1 bg-black text-white/70 cursor-pointer"
                      onMouseEnter={() =>
                        setExpandedTags((prev) => ({ ...prev, [project.id]: true }))
                      }
                      onMouseLeave={() =>
                        setExpandedTags((prev) => ({ ...prev, [project.id]: false }))
                      }
                    >
                      +{extraTags.length}
                    </span>
                  )}
                  {isExpanded &&
                    extraTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs border border-white/50 px-2 py-1 bg-black text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                {/* Description */}
                <p
                  className={`text-sm text-white/70 mb-2 ${
                    isDescriptionExpanded ? "" : "line-clamp-4"
                  }`}
                >
                  {project.description}
                </p>
                {!isDescriptionExpanded && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedDescriptions((prev) => ({ ...prev, [project.id]: true }))
                    }
                    className="text-xs text-white/60 underline underline-offset-2 mb-8 self-start hover:text-white"
                  >
                    READ MORE
                  </button>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {hasCaseStudy && (
                    <Link
                      href={project.links.caseStudy!}
                      className="group/btn relative inline-block transition-transform hover:translate-x-1"
                    >
                      <svg
                        className="absolute inset-0 pointer-events-none transition-all group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        viewBox="0 0 200 45"
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <polygon points="0,0 200,0 185,45 0,45" fill="white" />
                        <polygon points="0,0 200,0 185,45 0,45" fill="none" stroke={getProjectColor(project.title)} strokeWidth="8" />
                        <line x1="0" y1="0" x2="0" y2="45" stroke={getProjectColor(project.title)} strokeWidth="12" />
                      </svg>
                      <div className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 font-black text-sm italic tracking-tighter text-black whitespace-nowrap">
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </div>
                    </Link>
                  )}

                  {hasCode && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-block transition-transform hover:translate-x-1"
                    >
                      <svg
                        className="absolute inset-0 pointer-events-none transition-all group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        viewBox="0 0 120 45"
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <polygon points="0,0 120,0 110,45 0,45" fill="white" />
                      </svg>
                      <div className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 font-black text-sm italic tracking-tighter text-black whitespace-nowrap">
                        <span>CODE</span>
                        <Code className="w-4 h-4 transition-transform group-hover/btn:scale-110 group-hover/btn:rotate-12" />
                      </div>
                    </a>
                  )}

                  {hasProject && (
                    <a
                      href={project.links.project}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-block transition-transform hover:translate-x-1"
                    >
                      <svg
                        className="absolute inset-0 pointer-events-none transition-all group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        viewBox="0 0 200 45"
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <polygon points="0,0 200,0 185,45 0,45" fill="white" />
                        <polygon points="0,0 200,0 185,45 0,45" fill="none" stroke={getProjectColor(project.title)} strokeWidth="8" />
                        <line x1="0" y1="0" x2="0" y2="45" stroke={getProjectColor(project.title)} strokeWidth="12" />
                      </svg>
                      <div className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 font-black text-sm italic tracking-tighter text-black whitespace-nowrap">
                        <span>VIEW PROJECT</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </div>
                    </a>
                  )}

                  {hasVideo && (
                    <button
                      onClick={() => setShowVideoModal({ url: project.links.videoUrl!, title: project.title })}
                      className="group/btn relative inline-block transition-transform hover:translate-x-1"
                    >
                      <svg
                        className="absolute inset-0 pointer-events-none transition-all group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        viewBox="0 0 180 45"
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <polygon points="0,0 180,0 165,45 0,45" fill="white" />
                      </svg>
                      <div className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 font-black text-sm italic tracking-tighter text-black whitespace-nowrap">
                        <span>{project.links.videoLabel || "VIDEO"}</span>
                        <Play className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                      </div>
                    </button>
                  )}

                  {project.links.devpost && (
                    <a
                      href={project.links.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-block transition-transform hover:translate-x-1"
                    >
                      <svg
                        className="absolute inset-0 pointer-events-none transition-all group-hover/btn:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        viewBox="0 0 160 45"
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <polygon points="0,0 160,0 148,45 0,45" fill="white" />
                      </svg>
                      <div className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 font-black text-sm italic tracking-tighter text-black whitespace-nowrap">
                        <span>DEVPOST</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowVideoModal(null)}
        >
          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideoModal(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative aspect-video bg-black border border-white/20">
              {isEmbedVideo(showVideoModal.url) ? (
                <iframe
                  src={showVideoModal.url}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                  title={`${showVideoModal.title} video`}
                />
              ) : (
                <video src={showVideoModal.url} controls autoPlay className="w-full h-full">
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

