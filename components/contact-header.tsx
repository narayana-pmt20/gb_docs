"use client"

import { useState, useRef, useEffect } from "react"
import {
  MoreVertical,
  Copy,
  ChevronRight,
  SquarePen,
  Trash2,
  FileText,
} from "lucide-react"

interface ContactHeaderProps {
  contactName: string
  company: string
  isEditing?: boolean
  onEdit?: () => void
}

export function ContactHeader({
  contactName,
  company,
  isEditing = false,
  onEdit,
}: ContactHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb + Public URL Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span className="font-medium text-foreground">Contacts</span>
          <ChevronRight className="h-3 w-3" />
          <span>{isEditing ? `Edit ${contactName}` : contactName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Your public URL: https://app.growbotik.com/8d0d17f3e6/plan
          </span>
          <button
            className="rounded p-1 hover:bg-accent"
            aria-label="Copy public URL"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Title + Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? `Edit ${contactName}` : contactName}
          </h1>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>

        {/* Three-dot menu - only show in detail view */}
        {!isEditing && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded p-1 hover:bg-accent"
              aria-label="More actions"
            >
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-10 w-40 rounded-lg border border-border bg-popover py-1 shadow-md">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onEdit?.()
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                >
                  <SquarePen className="h-4 w-4 text-muted-foreground" />
                  Edit
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
