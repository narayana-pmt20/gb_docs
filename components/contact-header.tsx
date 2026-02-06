"use client"

import { useState, useRef, useEffect } from "react"
import {
  MoreHorizontal,
  Copy,
  Pencil,
  Archive,
  Trash2,
  BookOpen,
} from "lucide-react"

export function ContactHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen
            size={18}
            style={{ color: "var(--color-text-muted)" }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-dark)" }}
          >
            Contacts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Your public URL: https://app.growbotik.com/ec9bbfd0d0/plan
          </span>
          <button
            className="rounded p-1 hover:bg-[var(--color-background-active)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Copy size={14} />
          </button>
        </div>
      </div>

      {/* Contact name + actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Elena Rodriguez
          </h1>
          <span
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Umbrella US
          </span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 hover:bg-[var(--color-background-active)]"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Contact actions"
          >
            <MoreHorizontal size={20} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-10 z-20 min-w-[140px] rounded-lg border py-1"
              style={{
                backgroundColor: "var(--color-background-white)",
                borderColor: "var(--color-border-light)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--color-background-active)]"
                style={{ color: "var(--color-text-dark)" }}
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--color-background-active)]"
                style={{ color: "var(--color-text-dark)" }}
              >
                <Archive size={14} />
                Archive
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--color-background-active)]"
                style={{ color: "#DC2626" }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
