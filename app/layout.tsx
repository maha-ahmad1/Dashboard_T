import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import AppLayout from "@/components/AppLayout"

export const metadata: Metadata = {
  title: "Dashboard ",
  description: "Dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <div className="min-h-screen bg-[#f7f7f7] flex">
          <div className="fixed left-0 top-0 h-full w-64 z-10 ">
            <AppLayout />
          </div>

          <div className="flex-1 md:ml-64 min-w-0">{children}</div>
        </div>
      </body>
    </html>
  )
}
