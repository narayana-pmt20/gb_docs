"use client"

import { Plus, Building2 } from "lucide-react"

interface ContactData {
  name: string
  email: string
  phone: string
  company: string
  status: string
  website: string
  address: string
}

interface ContactProfileCardProps {
  contact: ContactData
  onCreatePlan: () => void
  onViewBusinessAccount?: () => void
  createPlanDisabled?: boolean
}

export function ContactProfileCard({
  contact,
  onCreatePlan,
  onViewBusinessAccount,
  createPlanDisabled = false,
}: ContactProfileCardProps) {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-6">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl font-semibold text-muted-foreground">
            {initials}
          </span>
        </div>
      </div>

      {/* Name & Company */}
      <h2 className="mt-4 text-center text-lg font-semibold text-card-foreground">
        {contact.name}
      </h2>
      <p className="text-center text-sm text-muted-foreground">{contact.company}</p>

      {/* Divider */}
      <div className="my-5 border-t border-border" />

      {/* Contact Info Fields */}
      <div className="flex flex-col gap-5">
        {/* Name */}
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="text-sm font-medium text-card-foreground">
            {contact.name}
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {contact.email}
          </a>
        </div>

        {/* Phone */}
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="text-sm font-medium text-card-foreground">
            {contact.phone}
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-sm text-muted-foreground">Company</p>
          <p className="text-sm font-medium text-card-foreground">
            {contact.company}
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          <p className="text-sm font-medium text-card-foreground">
            {contact.address}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <span className="mt-1 inline-block rounded-md border border-border px-3 py-1 text-xs font-medium text-card-foreground">
            {contact.status}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={onViewBusinessAccount}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <Building2 className="h-4 w-4" />
          View Business Account
        </button>

        <button
          onClick={onCreatePlan}
          disabled={createPlanDisabled}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Create Plan
        </button>
      </div>
    </div>
  )
}
