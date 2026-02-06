"use client"

import { useState, useRef, useEffect } from "react"
import {
  MoreVertical,
  Copy,
  ChevronRight,
  SquarePen,
  Trash2,
  Archive,
  FileText,
} from "lucide-react"

interface ContactHeaderProps {
  contactName: string
  company: string
  isEditing?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onArchive?: () => void
}

export function ContactHeader({
  contactName,
  company,
  isEditing = false,
  onEdit,
  onDelete,
  onArchive,
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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4 shrink-0" />
          <span className="font-medium text-foreground">Contacts</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {isEditing ? `Edit ${contactName}` : contactName}
          </span>
        </div>
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <span className="truncate">
            Your public URL: https://app.growbotik.com/8d0d17f3e6/plan
          </span>
          <button
            className="shrink-0 rounded p-1 hover:bg-accent"
            aria-label="Copy public URL"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Title + Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-foreground sm:text-2xl">
            {isEditing ? `Edit ${contactName}` : contactName}
          </h1>
          <p className="truncate text-sm text-muted-foreground">{company}</p>
        </div>

        {/* Three-dot menu - only show in detail view */}
        {!isEditing && (
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded p-1 hover:bg-accent"
              aria-label="More actions"
            >
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-10 w-44 rounded-lg border border-border bg-popover py-1 shadow-md">
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
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onArchive?.()
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                >
                  <Archive className="h-4 w-4 text-muted-foreground" />
                  Archive
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onDelete?.()
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent"
                >
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
