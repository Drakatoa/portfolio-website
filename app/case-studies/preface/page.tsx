"use client"

import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function PrefaceCaseStudy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Background - Applied Globally */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Back Button */}
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

      {/* Hero Section with Large Branding */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Small tag */}
          <div className="mb-8">
            <span className="text-xs text-white/60 tracking-widest">{"[CASE STUDY]"}</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">PREFACE</h1>

          {/* Large Hero Branding Image */}
          <div className="relative aspect-[21/9] mb-12 border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
              <p className="text-sm text-white/40">
                [HERO BRANDING IMAGE - Logo, key visual, or main product shot]
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              A recruiting platform that helps employers reach the right candidates faster by replacing vague
              applications with role-specific learning and proof. Candidates complete advanced courses/assessments,
              earn a certificate, and employers can review a clearer summary of skills and readiness before interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Tools Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Team Members */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">TEAM MEMBERS</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-white pl-4">
                  <p className="font-bold text-lg">Burak Bas</p>
                  <p className="text-sm text-white/60">Researcher, Filmmaking, Graphic Design</p>
                </div>
                <div className="border-l-2 border-white pl-4">
                  <p className="font-bold text-lg">Rajit Goel</p>
                  <p className="text-sm text-white/60">Wireframing, Prototyper, Coder</p>
                </div>
                <div className="border-l-2 border-white pl-4">
                  <p className="font-bold text-lg">Silas Solomon</p>
                  <p className="text-sm text-white/60">Project Manager, Designer, Event Planner</p>
                </div>
                <div className="border-l-2 border-white pl-4">
                  <p className="font-bold text-lg">Nathan Lee</p>
                  <p className="text-sm text-white/60">Storyteller, Logistics</p>
                </div>
                <div className="border-l-2 border-white pl-4">
                  <p className="font-bold text-lg">Cole</p>
                  <p className="text-sm text-white/60">Synthesizer</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">TEAM NAME</p>
                <p className="font-bold text-lg">Five Clovers</p>
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">TOOLS USED</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Pen and Paper",
                  "Canva",
                  "Figma",
                  "FigJam",
                  "Adobe Photoshop",
                  "Adobe Premiere Pro",
                ].map((tool) => (
                  <div
                    key={tool}
                    className="border border-white/50 px-4 py-6 text-center hover:bg-white hover:text-black transition-colors"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left - Title and subtext */}
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[01]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">THE PROBLEM</h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  why are we doing this
                </p>
              </div>

              {/* Right - Large parallelogram */}
              <div className="relative h-[400px] md:h-[500px]">
                {/* Offset outline */}
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
                {/* Main parallelogram */}
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-10 h-full flex items-center">
                    <p className="text-base md:text-lg text-black leading-relaxed max-w-[430px] ml-16">
                      The hiring process for early career roles is slow, unclear, and impersonal. Candidates feel
                      discouraged when companies take too long to respond or stopped responding completely. Now we know
                      that this is a two-way problem, and needs a solution that works for both sides of the equation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[02]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">RESEARCH & INSIGHTS</h2>

          <div className="mb-16">
            <p className="text-lg text-white/80 mb-12 max-w-4xl">
              A look behind the scenes of our research, classroom collaboration, FigJam survey selection, and slide
              decks that shaped our insights.
            </p>

            {/* Research Images Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="relative aspect-video border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                  <p className="text-sm text-white/40 text-center px-4">
                    [FIGJAM BOARD IMAGE]
                    <br />
                    Research artifacts
                  </p>
                </div>
              </div>
              <div className="relative aspect-video border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                  <p className="text-sm text-white/40 text-center px-4">
                    [WHITEBOARD IMAGE]
                    <br />
                    Pen & paper wireframes
                  </p>
                </div>
              </div>
              <div className="relative aspect-video border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                  <p className="text-sm text-white/40 text-center px-4">
                    [RESEARCH DATA]
                    <br />
                    Survey results
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Findings Header */}
          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">KEY FINDINGS</h3>

          {/* Key Findings in 2x2 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-white/50 p-8">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">GHOSTING & SLOW TIMELINES</h4>
              <p className="text-white/70">
                Candidates felt discouraged when companies took too long to respond or stopped responding completely.
              </p>
            </div>
            <div className="border border-white/50 p-8">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">COOKIE-CUTTER INTERVIEWS</h4>
              <p className="text-white/70">
                Interviews often felt scripted and didn't let candidates show personality, values, or real fit.
              </p>
            </div>
            <div className="border border-white/50 p-8">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
                VAGUE "ENTRY-LEVEL" EXPECTATIONS
              </h4>
              <p className="text-white/70">
                Many roles were labeled entry-level but still expected experience, making requirements feel unclear
                or unrealistic.
              </p>
            </div>
            <div className="border border-white/50 p-8">
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">PLATFORM DEPENDENCE</h4>
              <p className="text-white/70">
                Most candidates relied heavily on sites like LinkedIn/Indeed, which made the search feel repetitive
                and crowded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Empathy Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[03]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">USER EMPATHY</h2>

          <div className="space-y-8">
            <div className="relative aspect-[16/9] border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                <p className="text-lg text-white/40 text-center px-4">
                  [EMPATHY MAP IMAGE]
                  <br />
                  Says / Thinks / Feels / Does quadrants
                </p>
              </div>
            </div>

            <div className="relative aspect-[16/9] border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                <p className="text-lg text-white/40 text-center px-4">
                  [USER JOURNEY MAP]
                  <br />
                  10-step candidate journey from discovery to hire
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Strategy */}
      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left - Title and subtext */}
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs text-white/60 tracking-widest">{"[04]"}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">THE SOLUTION</h2>
                <p className="text-sm md:text-base text-white/50 max-w-md">
                  how we're solving the problem
                </p>
              </div>

              {/* Right - Large parallelogram */}
              <div className="relative h-[400px] md:h-[500px]">
                {/* Offset outline */}
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
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
                {/* Main parallelogram */}
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-10 h-full flex items-center">
                    <p className="text-base md:text-lg text-black leading-relaxed max-w-[430px] ml-15">
                      We built a platform where employers define what they actually need for a role and candidates prove
                      they can do it through structured learning. Instead of guessing what a resume means, recruiters see
                      real preparation and earned certificates. Candidates can feel more confident knowing exactly what's expected,
                      and both sides waste less time on mismatched interviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[05]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">DESIGN PROCESS</h2>

          {/* Wireframes */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">01 // WIREFRAMES</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-[3/4] border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                    <p className="text-sm text-white/40 text-center px-2">
                      [PEN & PAPER
                      <br />
                      WIREFRAME {i}]
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low-Fi Prototypes */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">02 // LOW-FIDELITY PROTOTYPES</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="relative aspect-video border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                    <p className="text-sm text-white/40 text-center px-4">
                      [LOW-FI PROTOTYPE {i}]<br />
                      Early digital wireframes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Fi Screens */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">03 // HIGH-FIDELITY SCREENS</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {["Job Discovery Page", "Course Path Selection", "Skill Proof Dashboard", "Certificate View"].map(
                (label, i) => (
                  <div key={i} className="relative aspect-video border border-white/20 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                      <p className="text-sm text-white/40 text-center px-4">
                        [{label.toUpperCase()}]<br />
                        Final design mockup
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Full Width Final Mockup */}
          <div className="relative aspect-[21/9] border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
              <p className="text-sm text-white/40 text-center px-4">
                [FULL SCREENS SHOWCASE - Multiple screens side by side]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Gallery Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[06]"}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tighter">VISUAL IDENTITY</h2>

          {/* 2x2 Branding Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="relative aspect-video border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                <p className="text-sm text-white/40 text-center px-4">
                  [BRAND COLORS / LOGO VARIATIONS]
                </p>
              </div>
            </div>
            <div className="relative aspect-video border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                <p className="text-sm text-white/40 text-center px-4">
                  [TYPOGRAPHY / STYLE GUIDE]
                </p>
              </div>
            </div>
            <div className="relative aspect-video border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                <p className="text-sm text-white/40 text-center px-4">
                  [ICONOGRAPHY / UI ELEMENTS]
                </p>
              </div>
            </div>
            <div className="relative aspect-video border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
                <p className="text-sm text-white/40 text-center px-4">
                  [MARKETING MATERIALS]
                </p>
              </div>
            </div>
          </div>

          {/* Full Width Branding Shot */}
          <div className="relative aspect-[21/9] border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
              <p className="text-sm text-white/40 text-center px-4">
                [FULL BRANDING SHOWCASE - Mockups, applications, etc.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary/Conclusion */}
      <section className="relative border-b border-white/20">
        <div className="relative w-full py-24 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Centered Title */}
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-xs text-white/60 tracking-widest">{"[07]"}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">PROJECT SUMMARY</h2>
              <p className="text-sm md:text-base text-white/50">
                wrapping it all together
              </p>
            </div>

            {/* Three parallelograms side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Parallelogram 1 */}
              <div className="relative h-[300px] md:h-[350px]">
                {/* Offset outline */}
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
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
                {/* Main parallelogram */}
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-8 h-full flex items-center justify-center">
                    <p className="text-xs md:text-sm text-black leading-relaxed text-center max-w-[280px]">
                      Early career hiring is broken. Candidates wait weeks for responses that never come. HR teams spend
                      hours screening resumes without knowing who can actually do the work. The process is vague,
                      impersonal, and inefficient for everyone involved.
                    </p>
                  </div>
                </div>
              </div>

              {/* Parallelogram 2 */}
              <div className="relative h-[300px] md:h-[350px]">
                {/* Offset outline */}
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
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
                {/* Main parallelogram */}
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-8 h-full flex items-center justify-center">
                    <p className="text-xs md:text-sm text-black leading-relaxed text-center max-w-[280px]">
                      Preface turns potential into proof. Companies design role-specific learning paths with the Preface
                      team. Candidates complete the coursework and earn certificates that demonstrate real readiness.
                      Recruiters get detailed skill assessments that make hiring decisions faster and more accurate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Parallelogram 3 */}
              <div className="relative h-[300px] md:h-[350px]">
                {/* Offset outline */}
                <svg
                  className="absolute pointer-events-none z-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    left: "35px",
                    top: "45px",
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
                {/* Main parallelogram */}
                <div
                  className="absolute inset-0 bg-white z-10"
                  style={{
                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                  }}
                >
                  <div className="p-6 md:p-8 h-full flex items-center justify-center">
                    <p className="text-xs md:text-sm text-black leading-relaxed text-center max-w-[280px]">
                      This approach replaces guesswork with evidence. Both sides build trust through transparency. Strong
                      candidates stay engaged instead of dropping out. Teams hire with confidence instead of crossing
                      their fingers. The platform scales while keeping the process human.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype & Video Section */}
      <section className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-4">
            <span className="text-xs text-white/60 tracking-widest">{"[08]"}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter">INTERACTIVE PROTOTYPE</h2>

          <div className="mb-16">
            <a
              href="https://aed-preface.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block transition-transform hover:translate-x-2"
            >
              <svg
                className="absolute inset-0 pointer-events-none transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                viewBox="0 0 280 50"
                preserveAspectRatio="xMinYMin meet"
                style={{
                  height: "100%",
                }}
              >
                <polygon points="0,0 280,0 257,50 0,50" fill="white" className="transition-all" />
              </svg>
              <div className="relative z-10 flex items-center gap-2 px-8 py-3.5 font-black text-base md:text-lg italic tracking-tighter text-black whitespace-nowrap">
                <span>VIEW PROTOTYPE</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </a>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">PROMOTIONAL VIDEO</h3>
          <div className="relative aspect-video border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] flex items-center justify-center">
              <p className="text-lg text-white/40 text-center px-4">
                [VIDEO EMBED]
                <br />
                Preface promotional video
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/20 py-12 bg-black">
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
    </div>
  )
}
