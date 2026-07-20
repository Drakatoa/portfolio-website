import Image from "next/image"

export function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-white/20">
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">{"ABOUT"}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>

        <div className="space-y-8">
          <div className="border border-white/20 p-6">
            <p className="text-lg leading-relaxed mb-4">
              I'm Rajit Goel, a UT Dallas CS grad and incoming MS student at Georgia Tech (AI specialization).
              My work sits at the intersection of engineering, data, and design. I care about building tools that
              feel good to use and actually solve real problems, whether that be through AI-powered platforms,
              data-driven insights, or thoughtful UX research.
            </p>
            <p className="text-lg leading-relaxed">
              Right now I'm at Samsung building agentic AI systems that diagnose telecom network alarms autonomously.
              Before that I worked on everything from tax validation at Thomson Reuters to food and beverage analytics
              at Cinemark to solving problems on campus with clever design. I'm focused on projects and research that
              blend multimodal AI with practical interaction design, and I'm always thinking about how to make
              technology more accessible and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-4">{"[MORE ABOUT ME]"}</h3>
              <p className="text-sm leading-relaxed">
                When I'm not coding or designing, I'm probably listening to music way too loud, raging at video games,
                or trying to learn a new creative tool. I also lead a fam and do some design work for UTD's Chinese Student Association,
                where I get to combine fun friend-bonding activities with visual work. Always down to chat about new projects, collabs, or just share!
              </p>
            </div>

            <div className="border border-white/20 p-6">
              <h3 className="text-xs text-white/60 mb-4">{"[EDUCATION]"}</h3>
              <div className="relative mb-6 pb-3">
                <p className="text-lg font-bold mb-1">{"Georgia Institute of Technology"}</p>
                <p className="text-sm text-white/60 mb-2">{"M.S. Computer Science, AI Specialization"}</p>
                <p className="text-xs text-white/40">{"Aug 2026 - Dec 2027"}</p>
                <Image
                  src="/Georgia-Tech.png"
                  alt="Georgia Tech logo"
                  width={96}
                  height={54}
                  className="absolute bottom-0 right-0 w-12 h-auto object-contain opacity-75"
                />
              </div>
              <div className="relative">
                <p className="text-lg font-bold mb-1">{"University of Texas at Dallas"}</p>
                <p className="text-sm text-white/60 mb-2">{"B.S. Computer Science, CS² Honors | GPA 3.965"}</p>
                <p className="text-sm text-white/60">{"Certificate in Applied Experience Design and Research"}</p>
                <p className="text-xs text-white/40 mt-3">{"Graduated May 2026"}</p>
                <Image
                  src="/utdlogo.png"
                  alt="UT Dallas logo"
                  width={96}
                  height={96}
                  className="absolute bottom-0 right-0 w-10 h-auto object-contain opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
