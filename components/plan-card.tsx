"use client"

import {
  ArrowUpRight,
  Calendar,
} from "lucide-react"

interface Plan {
  id: number
  name: string
  status: string
  progress: number
  startedOn: string
  pricingGroup: string
}

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      {/* Plan title row */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-card-foreground">
          {plan.name}
        </h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Review plan
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Details row */}
      <div className="mt-4 grid grid-cols-[1fr_auto_1fr_1fr] items-start gap-6">
        {/* Progress */}
        <div>
          <p className="text-sm text-muted-foreground">Progress</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="inline-block rounded-md border border-border px-2.5 py-0.5 text-xs font-medium text-card-foreground">
              {plan.status}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-1.5 rounded-full bg-primary"
              style={{ width: `${plan.progress}%` }}
            />
          </div>
        </div>

        {/* Spacer */}
        <div />

        {/* Started on */}
        <div>
          <p className="text-sm text-muted-foreground">Started on</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-card-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {plan.startedOn}
          </div>
        </div>

        {/* Pricing Group */}
        <div>
          <p className="text-sm text-muted-foreground">Pricing Group</p>
          <p className="mt-2 text-sm font-medium text-card-foreground">
            {plan.pricingGroup}
          </p>
        </div>
      </div>
    </div>
  )
}
