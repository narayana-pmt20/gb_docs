"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

interface CreatePlanModalProps {
  open: boolean
  onClose: () => void
  onCreate: (pricingGroup: string) => void
}

const pricingGroups = ["Group 1", "Group 2", "Group 3"]

export function CreatePlanModal({
  open,
  onClose,
  onCreate,
}: CreatePlanModalProps) {
  const [selectedGroup, setSelectedGroup] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (!open) return null

  function handleCreate() {
    if (selectedGroup) {
      onCreate(selectedGroup)
      setSelectedGroup("")
      setDropdownOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card p-5 shadow-lg sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            Create Plan
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-6">
          <label className="text-sm font-medium text-card-foreground">
            Pricing Group
          </label>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <span
                className={
                  selectedGroup ? "text-foreground" : "text-muted-foreground"
                }
              >
                {selectedGroup || "Select a pricing group"}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-md border border-border bg-popover py-1 shadow-md">
                {pricingGroups.map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedGroup(group)
                      setDropdownOpen(false)
                    }}
                    className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-accent"
                  >
                    {group}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!selectedGroup}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
