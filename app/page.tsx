"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ContactHeader } from "@/components/contact-header"
import { ContactProfileCard } from "@/components/contact-profile-card"
import { ContactInfoCard } from "@/components/contact-info-card"
import { PlanCard } from "@/components/plan-card"
import { CreatePlanModal } from "@/components/create-plan-modal"
import { EditContactForm } from "@/components/edit-contact-form"
import { ConfirmationDialog } from "@/components/confirmation-dialog"

interface Plan {
  id: number
  name: string
  status: string
  progress: number
  startedOn: string
  pricingGroup: string
}

interface ContactData {
  name: string
  email: string
  phone: string
  company: string
  status: string
  website: string
  address: string
}

const initialContact: ContactData = {
  name: "Cruz Gallagher",
  email: "koqol@mailinator.com",
  phone: "+1 (794) 132-1076",
  company: "Martin Moody Co",
  status: "Discovery",
  website: "",
  address: "Alpharetta, GA, USA",
}

export default function Home() {
  const [contact, setContact] = useState<ContactData>(initialContact)
  const [plans, setPlans] = useState<Plan[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState<"detail" | "edit" | "deleted" | "archived">(
    "detail"
  )
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmArchive, setConfirmArchive] = useState(false)

  function handleCreatePlan(pricingGroup: string) {
    const newPlan: Plan = {
      id: plans.length + 1,
      name: `Plan ${plans.length + 1}`,
      status: "Discovery",
      progress: 35,
      startedOn: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      pricingGroup,
    }
    setPlans([...plans, newPlan])
    setModalOpen(false)
  }

  function handleSaveContact(data: ContactData) {
    setContact(data)
    setView("detail")
  }

  function handleDeleteContact() {
    setConfirmDelete(false)
    setView("deleted")
  }

  function handleArchiveContact() {
    setConfirmArchive(false)
    setView("archived")
  }

  if (view === "deleted") {
    return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <svg
                className="h-8 w-8 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Contact Deleted
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {contact.name} has been permanently deleted. This action cannot be
              undone.
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (view === "archived") {
    return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-8 w-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Contact Archived
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {contact.name} has been archived. You can restore this contact
              from the archive at any time.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6">
        <ContactHeader
          contactName={contact.name}
          company={contact.company}
          isEditing={view === "edit"}
          onEdit={() => setView("edit")}
          onDelete={() => setConfirmDelete(true)}
          onArchive={() => setConfirmArchive(true)}
        />

        {view === "edit" ? (
          <div className="mt-6 flex flex-1 flex-col">
            <EditContactForm
              contact={contact}
              onSave={handleSaveContact}
              onCancel={() => setView("detail")}
            />
          </div>
        ) : (
          <>
            <div className="mt-6 flex gap-6">
              <div className="w-[280px] min-w-[280px]">
                <ContactProfileCard
                  name={contact.name}
                  company={contact.company}
                  onCreatePlan={() => setModalOpen(true)}
                  createPlanDisabled={plans.length > 0}
                />
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <ContactInfoCard contact={contact} />
                {plans.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      Plan Details
                    </h2>
                    {plans.map((plan) => (
                      <PlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <CreatePlanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreatePlan}
      />

      <ConfirmationDialog
        open={confirmDelete}
        title="Delete Contact"
        description={`Are you sure you want to delete ${contact.name}? This action is permanent and cannot be undone. All associated data including plans will be removed.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDeleteContact}
        onCancel={() => setConfirmDelete(false)}
      />

      <ConfirmationDialog
        open={confirmArchive}
        title="Archive Contact"
        description={`Are you sure you want to archive ${contact.name}? The contact will be moved to the archive and can be restored later.`}
        confirmLabel="Archive"
        variant="warning"
        onConfirm={handleArchiveContact}
        onCancel={() => setConfirmArchive(false)}
      />
    </div>
  )
}
