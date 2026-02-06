import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"

const jost = Jost({ subsets: ["latin"], variable: "--font-jost" })

export const metadata: Metadata = {
  title: "Growbotik",
  description: "Growbotik Customer Hub",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jost.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
