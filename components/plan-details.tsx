"use client"

import { useState, useRef, useEffect } from "react"
import {
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Pencil,
  Archive,
  Trash2,
} from "lucide-react"

interface Plan {
  id: number
  name: string
  progress: number
  stage: string
  startedOn: string
  pricingGroup: string
  hasAvatar?: boolean
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Plan 1",
    progress: 45,
    stage: "Discovery",
    startedOn: "Jun 20 2025",
    pricingGroup: "Group 1",
    hasAvatar: true,
  },
  {
    id: 2,
    name: "Plan 2",
    progress: 30,
    stage: "Discovery",
    startedOn: "Jun 20 2025",
    pricingGroup: "Group 1",
  },
]

function PlanActionMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute right-0 top-8 z-10 min-w-[140px] rounded-lg border py-1"
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
  )
}

function PlanRow({ plan }: { plan: Plan }) {
  return (
    <div
      className="rounded-lg border p-5"
      style={{
        backgroundColor: "var(--color-background-white)",
        borderColor: "var(--color-border-light)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Plan header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4
            className="text-base font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {plan.name}
          </h4>
          {plan.hasAvatar && (
            <div
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
              style={{
                backgroundColor: "var(--color-background-light-grey)",
              }}
            >
              <img
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=TeamMember&backgroundColor=ffd5dc"
                alt="Team member"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--color-primary-blue)" }}
          >
            Review plan
            <ExternalLink size={14} />
          </a>
          <button
            className="rounded p-1 hover:bg-[var(--color-background-active)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Plan info grid */}
      <div className="grid grid-cols-4 items-start gap-4">
        {/* Progress */}
        <div>
          <span
            className="mb-1 block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Progress
          </span>
          <span
            className="mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-background-light-blue)",
              color: "var(--color-primary-blue)",
            }}
          >
            {plan.stage}
          </span>
          {/* Progress bar */}
          <div
            className="mt-1 h-2 w-full overflow-hidden rounded-sm"
            style={{
              backgroundColor: "var(--color-background-active)",
            }}
          >
            <div
              className="h-full rounded-sm"
              style={{
                width: `${plan.progress}%`,
                backgroundColor: "var(--color-accent-blue)",
              }}
            />
          </div>
        </div>

        {/* Stage badge (empty column for alignment) */}
        <div />

        {/* Started on */}
        <div>
          <span
            className="mb-1 block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Started on
          </span>
          <div className="flex items-center gap-1.5">
            <Calendar
              size={14}
              style={{ color: "var(--color-text-muted)" }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--color-text-dark)" }}
            >
              {plan.startedOn}
            </span>
          </div>
        </div>

        {/* Pricing Group */}
        <div>
          <span
            className="mb-1 block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Pricing Group
          </span>
          <span
            className="text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            {plan.pricingGroup}
          </span>
        </div>
      </div>
    </div>
  )
}

export function PlanDetails() {
  return (
    <div className="relative">
      <h3
        className="mb-4 text-lg font-semibold"
        style={{ color: "var(--color-text-dark)" }}
      >
        Plan Details
      </h3>
      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <PlanRow key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Floating avatar at bottom-right as shown in screenshot */}
      <div
        className="absolute -bottom-4 -right-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2"
        style={{
          borderColor: "var(--color-background-white)",
          backgroundColor: "var(--color-background-light-grey)",
        }}
      >
        <img
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=Shaden&backgroundColor=ffd5dc,d1d4f9"
          alt="Assigned user"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
