"use client"

import { useState } from "react"
import { ProjectSlide } from "./project-slide"

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      id: "001",
      title: "PROJECT ALPHA",
      description:
        "A full-stack web application built with Next.js and PostgreSQL. Features real-time data synchronization and user authentication.",
      tech: ["Next.js", "PostgreSQL", "TypeScript"],
      status: "COMPLETE",
      image: "/dark-abstract-tech-project-black-white.jpg",
      links: {
        project: "https://github.com",
        code: "https://github.com",
      },
    },
    {
      id: "002",
      title: "PROJECT BETA",
      description:
        "Machine learning model for image classification. Achieved 94% accuracy using convolutional neural networks.",
      tech: ["Python", "TensorFlow", "OpenCV"],
      status: "COMPLETE",
      image: "/neural-network-visualization-black-white.jpg",
      links: {
        project: "https://github.com",
        code: "https://github.com",
      },
    },
    {
      id: "003",
      title: "PROJECT GAMMA",
      description:
        "Mobile-first e-commerce platform with integrated payment processing and inventory management system.",
      tech: ["React", "Node.js", "MongoDB"],
      status: "IN PROGRESS",
      image: "/ecommerce-interface-dark-minimal-black-white.jpg",
      links: {
        project: "https://github.com",
        code: "https://github.com",
      },
    },
  ]

  const currentProject = projects[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="relative">
      <ProjectSlide
        title={currentProject.title}
        description={currentProject.description}
        tags={currentProject.tech}
        imageUrl={currentProject.image}
        status={currentProject.status}
        index={currentIndex + 1}
        total={projects.length}
        projectUrl={currentProject.links.project}
        codeUrl={currentProject.links.code}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  )
}
