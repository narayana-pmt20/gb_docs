"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ContactHeader } from "@/components/contact-header"
import { ContactProfileCard } from "@/components/contact-profile-card"
import { ContactInfoCard } from "@/components/contact-info-card"
import { PlanCard } from "@/components/plan-card"
import { CreatePlanModal } from "@/components/create-plan-modal"
import { EditContactForm } from "@/components/edit-contact-form"

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
  const [view, setView] = useState<"detail" | "edit">("detail")

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

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex flex-1 flex-col p-6">
        <ContactHeader
          contactName={contact.name}
          company={contact.company}
          isEditing={view === "edit"}
          onEdit={() => setView("edit")}
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
    </div>
  )
}
