import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Growbotik - Contact Details",
  description: "CRM contact management and plan details",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
