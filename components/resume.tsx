export function Resume() {
  return (
    <section id="resume" className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-white/20">
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">{"RESUME"}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-white/20 p-8 space-y-6">
            <div>
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[DOWNLOAD]"}</h3>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 border-2 border-white px-6 py-4 hover:bg-white hover:text-black transition-colors group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v12M12 15l-4-4M12 15l4-4" />
                  <path d="M3 17v4h18v-4" />
                </svg>
                <span className="font-mono">{"DOWNLOAD PDF"}</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/20">
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[QUICK VIEW]"}</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {"Full CV with experience, projects, skills, and awards. PDF is kept current."}
              </p>
            </div>

            <div className="pt-6 border-t border-white/20">
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[EXTERNAL LINK]"}</h3>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
              >
                <span>{"View in browser"}</span>
                <span>{"→"}</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[HIGHLIGHTS]"}</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "GPA 3.965 — CS² Honors, UT Dallas",
                  "Cinemark Data Science Intern — clustering + market basket analysis for 300+ theaters",
                  "Thomson Reuters SWE Intern — C# ASP.NET tax validation APIs and XSLT migration",
                  "HackUTD 2025 (NVIDIA Track) — Top 5 Honorable Mention for AI Whiteboard",
                  "Scholarships: Goldman Sachs Excellence in CS; Capital One Applied Experience Design",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-white/40 mt-1">{"✦"}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-4 font-mono">{"[CORE SKILLS]"}</h3>
              <div className="space-y-2 text-sm">
                <p>{"Languages: C#, C/C++, Python, Java, JavaScript/TypeScript, SQL"}</p>
                <p>{"Frameworks: Next.js, React, ASP.NET, Flask, PyTorch, TensorFlow, scikit-learn"}</p>
                <p>{"Data/Infra: PostgreSQL, Supabase, SQL Server, Azure, Vercel"}</p>
                <p>{"Design: Figma, UX Research, Interaction Design"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border border-white/20 p-8">
          <h3 className="text-xs text-white/60 mb-6 font-mono">{"[TECHNICAL PROFICIENCY]"}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-bold mb-3">{"Frontend"}</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind"].map((skill) => (
                  <span key={skill} className="border border-white/40 px-2 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3">{"Backend"}</h4>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Python", "PostgreSQL", "MongoDB"].map((skill) => (
                  <span key={skill} className="border border-white/40 px-2 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3">{"Tools"}</h4>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "AWS", "Vercel"].map((skill) => (
                  <span key={skill} className="border border-white/40 px-2 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
