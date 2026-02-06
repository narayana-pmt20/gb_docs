import { Sidebar } from "@/components/sidebar"
import { ContactHeader } from "@/components/contact-header"
import { ContactCard } from "@/components/contact-card"
import { PlanDetails } from "@/components/plan-details"

export default function ContactDetailPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="flex-1 px-10 py-6"
        style={{ backgroundColor: "var(--color-background-white)" }}
      >
        {/* Header: breadcrumb + contact name */}
        <ContactHeader />

        {/* Content: Contact Card + Plan Details */}
        <div className="mt-6 grid grid-cols-[320px_1fr] gap-6 items-start">
          <ContactCard />
          <PlanDetails />
        </div>
      </main>
    </div>
  )
}
