import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

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
      <body className={`${inter.variable} font-sans`}>
        <div className="flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <main
            className="flex-1"
            style={{
              backgroundColor: "var(--color-background-white)",
              padding: "var(--space-12) var(--space-16)",
              maxWidth: "var(--content-max-width)",
              overflowY: "auto",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
