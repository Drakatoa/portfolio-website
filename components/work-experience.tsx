export function WorkExperience() {
  const experiences = [
    {
      title: "Software Engineering Intern",
      company: "Tech Company",
      period: "Summer 2024",
      description:
        "Developed full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      title: "Research Assistant",
      company: "UTD Computer Science Department",
      period: "2023 - Present",
      description:
        "Conducting research in machine learning and artificial intelligence. Published findings in academic conferences.",
      technologies: ["Python", "TensorFlow", "PyTorch"],
    },
    {
      title: "Freelance Developer",
      company: "Self-Employed",
      period: "2022 - 2023",
      description:
        "Built custom web applications for clients. Managed full project lifecycle from requirements gathering to deployment.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  ]

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 py-20 border-t border-white/20"
    >
      <div className="max-w-4xl w-full">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">{"EXPERIENCE"}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border border-white/20 p-6 md:p-8 hover:border-white/40 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-white/60 text-sm md:text-base">{exp.company}</p>
                </div>
                <span className="text-xs text-white/40 font-mono mt-2 md:mt-0 border border-white/20 px-3 py-1 self-start">
                  {exp.period}
                </span>
              </div>

              <p className="text-white/80 leading-relaxed mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="border border-white/40 px-3 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-xs text-white/40 font-mono">
                {"[" + String(index + 1).padStart(3, "0") + "]"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
