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
                className="text-7xl md:text-9xl font-bold text-white/20 tracking-wider"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                PORTFOLIO
              </div>
            </div>

            {/* Main title */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">RAJIT GOEL</h1>

            {/* Role badges */}
            <div className="flex items-center gap-4 mb-8">
              <span className="border border-white px-4 py-2 text-sm font-mono">UTD STUDENT</span>
              <span className="text-white/60">+</span>
              <span className="border border-white px-4 py-2 text-sm font-mono">DEVELOPER</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6 mb-12">
              <a
                href="https://github.com/rajitgoel"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono">GITHUB</span>
              </a>
              <a
                href="https://linkedin.com/in/rajitgoel"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono">LINKEDIN</span>
              </a>
              <a
                href="mailto:rajit.goel@utdallas.edu"
                className="group flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <div className="border border-white p-3 group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono">EMAIL</span>
              </a>
            </div>

            {/* Bio text */}
            <div className="space-y-3 mb-8 text-white/80 text-sm font-mono">
              <p>{"> BUILDING DIGITAL EXPERIENCES"}</p>
              <p>{"> FOCUSED ON COOL, USABLE STUFF"}</p>
            </div>

            {/* Divider with diamond */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/40" />
              <span className="text-lg">✦</span>
              <div className="h-px w-12 bg-white/40" />
            </div>

            {/* Resume button */}
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors font-mono text-sm"
            >
              <FileText className="w-4 h-4" />
              RESUME
            </a>
          </div>

          {/* Right side - Profile image in parallelogram */}
          <div className="flex-1 flex items-center justify-end">
            <div className="relative w-[600px] h-[400px] overflow-visible z-0">
              <div
                className="pointer-events-none absolute inset-0 translate-x-8 translate-y-10 border-[5px] border-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.35)] z-10"
                style={{
                  clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
                }}
              />
              <div
                className="relative h-full w-full bg-white z-20"
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
      <div className="absolute top-24 left-6 text-xs text-white/40 font-mono">{"[001]"}</div>
      <div className="absolute top-24 right-6 text-xs text-white/40 font-mono">{"[INIT]"}</div>
      <div className="absolute bottom-6 left-6 text-xs text-white/40 font-mono">{"[SCROLL]"}</div>
      <div className="absolute bottom-6 right-6 text-xs text-white/40 font-mono">{"[2025]"}</div>
    </section>
  )
}
