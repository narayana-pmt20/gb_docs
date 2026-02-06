"use client"

import { Plus, Building2 } from "lucide-react"

interface ContactProfileCardProps {
  name: string
  company: string
  onCreatePlan: () => void
  onViewBusinessAccount?: () => void
  createPlanDisabled?: boolean
}

export function ContactProfileCard({
  name,
  company,
  onCreatePlan,
  onViewBusinessAccount,
  createPlanDisabled = false,
}: ContactProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex h-full flex-col items-center rounded-lg border border-border bg-card p-6">
      {/* Avatar */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <span className="text-2xl font-semibold text-muted-foreground">
          {initials}
        </span>
      </div>

      {/* Name & Company */}
      <h2 className="mt-4 text-lg font-semibold text-card-foreground">
        {name}
      </h2>
      <p className="text-sm text-muted-foreground">{company}</p>

      {/* Spacer to push buttons down */}
      <div className="flex-1" />

      {/* View Business Account button */}
      <button
        onClick={onViewBusinessAccount}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <Building2 className="h-4 w-4" />
        View Business Account
      </button>

      {/* Create Plan button */}
      <button
        onClick={onCreatePlan}
        disabled={createPlanDisabled}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="h-4 w-4" />
        Create Plan
      </button>
    </div>
  )
}
