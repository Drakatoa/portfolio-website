import type React from "react"
import type { Metadata } from "next"
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["900"], style: ["normal", "italic"], variable: "--landing-display" })
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--landing-body" })

export const metadata: Metadata = {
  title: "RAJIT ✦ GOEL",
  description: "Rajit's Portfolio Website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${body.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
