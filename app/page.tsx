"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ContactHeader } from "@/components/contact-header"
import { ContactProfileCard } from "@/components/contact-profile-card"
import { ContactInfoCard } from "@/components/contact-info-card"
import { PlanCard } from "@/components/plan-card"
import { CreatePlanModal } from "@/components/create-plan-modal"

interface Plan {
  id: number
  name: string
  status: string
  progress: number
  startedOn: string
  pricingGroup: string
}

export default function Home() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [modalOpen, setModalOpen] = useState(false)

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

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-6 p-6">
        <ContactHeader />
        <div className="flex gap-6">
          <div className="w-[280px] min-w-[280px]">
            <ContactProfileCard onCreatePlan={() => setModalOpen(true)} />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <ContactInfoCard />
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
      </main>

      <CreatePlanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreatePlan}
      />
    </div>
  )
}
