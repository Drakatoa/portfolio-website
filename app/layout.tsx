import type React from "react"
import type { Metadata } from "next"
import { Space_Mono, Courier_Prime } from "next/font/google"
import "./globals.css"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
})

export const metadata: Metadata = {
  title: "RAJIT GOEL ✦ UTD",
  description: "Portfolio of Rajit Goel",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
