import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Growbotik - Contact Details",
  description: "CRM contact management and marketing plan dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
