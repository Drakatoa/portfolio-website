export function WorkExperience() {
  const experiences = [
    {
      title: "Data Science Intern",
      company: "Cinemark Theatres, Plano, TX",
      period: "Jun 2025 - Aug 2025",
      description:
        "Analyzed theater demographic data across 300+ locations to identify trends in food and beverage performance. Built K-Means clustering models to segment theaters and compared KPIs like per capita spending and occupancy across clusters. Did market basket analysis to find high-value product pairings and improve combo recommendations. Also worked on the 'Pop & Top' initiative using guest surveys and international sales data. Designed executive presentations in Power BI and matplotlib to translate complex findings into actionable insights.",
      technologies: ["Python", "pandas", "scikit-learn", "SQL", "Power BI", "Excel"],
    },
    {
      title: "Software Engineer Intern",
      company: "Thomson Reuters, Frisco, TX",
      period: "May 2024 - Aug 2024",
      description:
        "Developed REST APIs in C# ASP.NET for tax form validation that cut processing time by 10-15%. Refactored validation logic into modular components, reducing turnaround from weeks to near real-time. Queried large datasets in SQL Server and converted legacy XML rules into modern XSLT for better integration. Collaborated with a global Agile team across Canada, India, Mexico, and Russia.",
      technologies: ["C#", "ASP.NET", "SQL Server", "XSLT", "Git", "Agile/Scrum"],
    }
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
                <span className="text-xs text-white/40 mt-2 md:mt-0 border border-white/20 px-3 py-1 self-start">
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

              <div className="mt-4 text-xs text-white/40">
                {"[" + String(index + 1).padStart(3, "0") + "]"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
