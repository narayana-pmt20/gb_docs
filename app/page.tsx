import { AppSidebar } from "@/components/app-sidebar"
import { ContactHeader } from "@/components/contact-header"
import { ContactProfileCard } from "@/components/contact-profile-card"
import { ContactInfoCard } from "@/components/contact-info-card"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-6 p-6">
        <ContactHeader />
        <div className="flex gap-6">
          <div className="w-[280px] min-w-[280px]">
            <ContactProfileCard />
          </div>
          <div className="flex-1">
            <ContactInfoCard />
          </div>
        </div>
      </main>
    </div>
  )
}
