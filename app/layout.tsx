import type { Metadata, Viewport } from "next"
import { Jost } from "next/font/google"
import Sidebar from "@/components/sidebar"
import "./globals.css"

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F8F9FA",
}

export const metadata: Metadata = {
  title: "Growbotik",
  description: "Marketing management and task automation platform.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jost.variable} font-sans`}>
        <div className="ds-app-layout">
          <Sidebar />
          <main className="ds-main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
