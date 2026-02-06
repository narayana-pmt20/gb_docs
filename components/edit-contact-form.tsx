"use client"

import { useState } from "react"
import {
  ChevronDown,
  Shield,
  MapPin,
} from "lucide-react"

interface ContactData {
  name: string
  email: string
  phone: string
  company: string
  status: string
  website: string
  address: string
}

interface EditContactFormProps {
  contact: ContactData
  onSave: (data: ContactData) => void
  onCancel: () => void
}

const statusOptions = ["Discovery", "Prospect", "Customer", "Inactive"]

export function EditContactForm({
  contact,
  onSave,
  onCancel,
}: EditContactFormProps) {
  const [formData, setFormData] = useState<ContactData>({ ...contact })
  const [statusOpen, setStatusOpen] = useState(false)

  function handleChange(field: keyof ContactData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit() {
    onSave(formData)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        {/* Name */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring sm:max-w-[460px]"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Email
          </label>
          <div className="relative w-full sm:max-w-[460px]">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
            <Shield className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring sm:max-w-[460px]"
          />
        </div>

        {/* Company */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring sm:max-w-[460px]"
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Status
          </label>
          <div className="relative w-full sm:max-w-[460px]">
            <button
              type="button"
              onClick={() => setStatusOpen(!statusOpen)}
              className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors hover:bg-accent focus:border-ring focus:ring-1 focus:ring-ring"
            >
              <span>{formData.status}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {statusOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-md border border-border bg-popover py-1 shadow-md">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      handleChange("status", option)
                      setStatusOpen(false)
                    }}
                    className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Website */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="Website"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring sm:max-w-[460px]"
          />
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Address
          </label>
          <div className="relative w-full sm:max-w-[460px]">
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
            <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Footer with Cancel / Save */}
      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        <button
          onClick={onCancel}
          className="rounded-md px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Save
        </button>
      </div>
    </div>
  )
}
