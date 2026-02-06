"use client"

import { Plus } from "lucide-react"

interface ContactProfileCardProps {
  onCreatePlan: () => void
}

export function ContactProfileCard({ onCreatePlan }: ContactProfileCardProps) {
  return (
    <div className="flex h-full flex-col items-center rounded-lg border border-border bg-card p-6">
      {/* Avatar */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <span className="text-2xl font-semibold text-muted-foreground">
          CG
        </span>
      </div>

      {/* Name & Company */}
      <h2 className="mt-4 text-lg font-semibold text-card-foreground">
        Cruz Gallagher
      </h2>
      <p className="text-sm text-muted-foreground">Martin Moody Co</p>

      {/* Spacer to push button down */}
      <div className="flex-1" />

      {/* Create Plan button */}
      <button
        onClick={onCreatePlan}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" />
        Create Plan
      </button>
    </div>
  )
}
