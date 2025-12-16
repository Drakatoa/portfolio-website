"use client"

import Image from "next/image"
import { Github, Linkedin, Mail, FileText } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible pt-20">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-normal"
        style={{
          opacity: 0.55,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.12) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.12) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.08) 1px,
              transparent 1px,
              transparent 200px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.08) 1px,
              transparent 1px,
              transparent 200px
            )
          `,
          backgroundSize: "40px 40px, 40px 40px, 200px 200px, 200px 200px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
          backgroundRepeat: "repeat, repeat, repeat, repeat",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl px-6">
        <div className="flex items-center justify-between gap-12">
          {/* Left side content */}
          <div className="relative flex-1 pl-12 md:pl-20 lg:pl-28">
            {/* Vertical portfolio text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8">
              <div
                className="text-7xl md:text-7xl font-bold text-white/20 tracking-wider"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {"> PORTFOLIO"}
              </div>
            </div>

            {/* Main title */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">RAJIT GOEL</h1>

            {/* Role badges */}
            <div className="flex items-center gap-4 mb-8">
              <span className="border border-white px-4 py-2 text-sm">DESIGNER</span>
              <span className="text-white/60">+</span>
              <span className="border border-white px-4 py-2 text-sm">DEVELOPER</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6 mb-12">
              <a
                href="https://github.com/Drakatoa"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-xs">GITHUB</span>
              </a>
              <a
                href="https://linkedin.com/in/ragoel"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-xs">LINKEDIN</span>
              </a>
              <a
                href="mailto:ragoel123@gmail.com"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs">EMAIL</span>
              </a>
              <a
                href="/resume.pdf"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs">RESUME</span>
              </a>
            </div>

            {/* Bio text */}
            <div className="space-y-3 mb-8 text-white/80 text-sm">
              <p>{"> BUILDING DIGITAL EXPERIENCES"}</p>
              <p>{"> FOCUSED ON COOL, USABLE STUFF"}</p>
            </div>

            {/* Divider with diamond */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/40" />
              <span className="text-lg">✦</span>
              <div className="h-px w-12 bg-white/40" />
            </div>

            
          </div>

          {/* Right side - Profile image in parallelogram */}
          <div className="flex-1 flex items-center justify-end">
            <div className="relative w-[600px] h-[400px] overflow-visible z-0 group cursor-pointer">
              {/* Vertical PERSONA text */}
              <div className="absolute -left-40 top-1/2 -translate-y-1/2">
                <div
                  className="text-7xl md:text-7xl font-bold text-white/20 tracking-wider"
                  style={{ writingMode: "vertical-rl"}}
                >
                  {"> PERSONA"}
                </div>
              </div>

              {/* Border frame using SVG */}
              <svg
                className="pointer-events-none absolute inset-0 translate-x-8 translate-y-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] group-hover:translate-x-10 group-hover:translate-y-12"
                width="100%"
                height="100%"
                viewBox="0 0 600 400"
                preserveAspectRatio="none"
              >
                <polygon
                  points="48,0 600,0 552,400 0,400"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinejoin="miter"
                />
              </svg>
              <div
                className="absolute inset-0 z-20 overflow-hidden transition-all duration-300 group-hover:scale-105"
                style={{
                  clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
                }}
              >
                <Image
                  src="/IMG_2934.jpeg"
                  alt="Rajit Goel"
                  fill
                  className="w-full h-full object-cover contrast-125"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 text-xs text-white/40">{"[001]"}</div>
      <div className="absolute top-24 right-6 text-xs text-white/40">{"[INIT]"}</div>
      <div className="absolute bottom-6 left-6 text-xs text-white/40">{"[SCROLL]"}</div>
      <div className="absolute bottom-6 right-6 text-xs text-white/40">{"[2025]"}</div>
    </section>
  )
}
