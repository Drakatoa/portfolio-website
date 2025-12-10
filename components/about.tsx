export function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-white/20">
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">{"ABOUT"}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-2 font-mono">{"[IDENTITY]"}</h3>
              <p className="text-lg leading-relaxed">
                {
                  "Computer Science student at the University of Texas at Dallas. Focused on building innovative digital experiences and exploring the intersection of technology and design."
                }
              </p>
            </div>

            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-2 font-mono">{"[SKILLS]"}</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {["React", "Next.js", "TypeScript", "Node.js", "Python", "C++"].map((skill) => (
                  <span key={skill} className="border border-white px-3 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-2 font-mono">{"[EDUCATION]"}</h3>
              <p className="text-lg font-bold mb-1">{"University of Texas at Dallas"}</p>
              <p className="text-sm text-white/60">{"Computer Science"}</p>
              <p className="text-xs text-white/40 mt-2">{"Expected Graduation: 2026"}</p>
            </div>

            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-2 font-mono">{"[CONNECT]"}</h3>
              <div className="space-y-3 mt-4">
                <a
                  href="https://github.com/rajitgoel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity text-sm group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                    <path d="M12 12v10" />
                    <path d="M2 7l10 5 10-5" />
                  </svg>
                  <span className="flex-1">{"GitHub"}</span>
                  <span className="text-white/40">{"→"}</span>
                </a>
                <a
                  href="https://linkedin.com/in/rajitgoel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity text-sm group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                  <span className="flex-1">{"LinkedIn"}</span>
                  <span className="text-white/40">{"→"}</span>
                </a>
                <a
                  href="mailto:rajit.goel@utdallas.edu"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity text-sm group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 4l8 8 8-8" />
                  </svg>
                  <span className="flex-1">{"Email"}</span>
                  <span className="text-white/40">{"→"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
