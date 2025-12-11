"use client"

import { useState, useEffect } from "react"

export function Navigation() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-bold tracking-wider hover:opacity-70 transition-opacity">
            {"RAJIT GOEL"}
          </a>
          <span className="text-xs text-white/60">{time}</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <a href="#about" className="hover:opacity-70 transition-opacity">
            {"[ABOUT]"}
          </a>
          <a href="#experience" className="hover:opacity-70 transition-opacity">
            {"[EXPERIENCE]"}
          </a>
          <a href="#projects" className="hover:opacity-70 transition-opacity">
            {"[PROJECTS]"}
          </a>
        </div>
      </div>
    </nav>
  )
}
