"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  ListChecks,
  TrendingUp,
  Mail,
  Phone,
  Globe,
  Building2,
  MapPin,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Archive,
  Trash2,
  ExternalLink,
  Copy,
  Calendar,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Contacts", icon: Users, active: true },
  { label: "To-do's", icon: ListChecks, active: false },
  { label: "Marketing Plans", icon: TrendingUp, active: false },
]

const contactInfo = {
  name: "Elena Rodriguez",
  company: "Innovate Solutions",
  stage: "Discovery",
  email: "elena.r@innovatesolutions.com",
  phone: "+1 (555) 123-4567",
  website: "www.growbotik.com",
  address: "123 Innovation Drive, San Francisco, CA 94102",
}

const plans = [
  {
    id: 1,
    name: "Plan 1",
    progress: 40,
    stage: "Discovery",
    startedOn: "Jun 20 2025",
    pricingGroup: "Group 1",
    avatarSeed: "Felix",
  },
  {
    id: 2,
    name: "Plan 2",
    progress: 25,
    stage: "Discovery",
    startedOn: "Jun 20 2025",
    pricingGroup: "Group 1",
    avatarSeed: null,
  },
]

/* ------------------------------------------------------------------ */
/*  SIDEBAR                                                            */
/* ------------------------------------------------------------------ */

function Sidebar() {
  return (
    <aside
      className="flex w-[220px] min-w-[220px] flex-col border-r"
      style={{
        backgroundColor: "var(--color-sidebar-bg)",
        borderColor: "var(--color-sidebar-border)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
          }}
        >
          U
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
              Admin Agency
            </div>
            <div className="text-xs" style={{ color: "var(--color-muted)" }}>
              Enterprise
            </div>
          </div>
          <ChevronDown className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex flex-col gap-0.5 px-3">
        <div
          className="mb-2 px-2 text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--color-sidebar-muted)" }}
        >
          Platform
        </div>
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            style={{
              color: item.active ? "var(--color-primary)" : "var(--color-foreground)",
              backgroundColor: item.active ? "var(--color-sidebar-active)" : "transparent",
              borderLeft: item.active
                ? "3px solid var(--color-primary)"
                : "3px solid transparent",
            }}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </a>
        ))}
      </nav>

      {/* User at bottom */}
      <div className="mt-auto border-t px-4 py-4" style={{ borderColor: "var(--color-sidebar-border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--color-tag-bg)" }}
          >
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Shaden&backgroundColor=b6e3f4"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                Shaden
              </div>
              <div className="text-xs" style={{ color: "var(--color-muted)" }}>
                m@example.com
              </div>
            </div>
            <ChevronDown className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
/*  ACTION DROPDOWN                                                    */
/* ------------------------------------------------------------------ */

function ActionDropdown({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
      >
        <MoreHorizontal className="h-5 w-5" style={{ color: "var(--color-muted)" }} />
      </button>
      {open && (
        <div
          className="absolute right-0 z-50 mt-1 w-40 rounded-lg border py-1.5 shadow-lg"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
            <Pencil className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
            <span style={{ color: "var(--color-foreground)" }}>Edit</span>
          </button>
          <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
            <Archive className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
            <span style={{ color: "var(--color-foreground)" }}>Unarchive</span>
          </button>
          <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
            <Trash2 className="h-4 w-4" style={{ color: "var(--color-destructive)" }} />
            <span style={{ color: "var(--color-destructive)" }}>Delete</span>
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CONTACT CARD                                                       */
/* ------------------------------------------------------------------ */

function ContactCard() {
  return (
    <div
      className="rounded-xl border p-6"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Avatar & Name */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div
          className="mb-3 h-20 w-20 overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-tag-bg)" }}
        >
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Elena&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede&backgroundType=gradientLinear"
            alt="Elena Rodriguez"
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-base font-semibold" style={{ color: "var(--color-foreground)" }}>
          Elena Rodriguez
        </h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {contactInfo.company}
        </p>
        <span
          className="mt-1.5 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: "var(--color-light-blue-bg)",
            color: "var(--color-primary)",
          }}
        >
          {contactInfo.stage}
        </span>
      </div>

      {/* Divider */}
      <div className="mb-4 h-px" style={{ backgroundColor: "var(--color-border)" }} />

      {/* Contact details */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
          <span style={{ color: "var(--color-foreground)" }}>{contactInfo.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
          <span style={{ color: "var(--color-foreground)" }}>{contactInfo.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Globe className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
          <a href="#" style={{ color: "var(--color-primary)" }} className="underline">
            {contactInfo.website}
          </a>
          <ExternalLink className="h-3 w-3" style={{ color: "var(--color-primary)" }} />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Building2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
          <span style={{ color: "var(--color-foreground)" }}>{contactInfo.company}</span>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
          <span style={{ color: "var(--color-foreground)" }}>{contactInfo.address}</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PLAN ROW                                                           */
/* ------------------------------------------------------------------ */

function PlanRow({
  plan,
  showDropdown,
  onToggleDropdown,
}: {
  plan: (typeof plans)[0]
  showDropdown: boolean
  onToggleDropdown: () => void
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Plan header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-base font-semibold" style={{ color: "var(--color-foreground)" }}>
            {plan.name}
          </h4>
          {plan.avatarSeed && (
            <div
              className="h-8 w-8 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--color-tag-bg)" }}
            >
              <img
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${plan.avatarSeed}&backgroundColor=b6e3f4`}
                alt="Assigned user"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Review plan
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <div className="relative">
            <button
              onClick={onToggleDropdown}
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            >
              <MoreHorizontal className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
            </button>
            {showDropdown && (
              <div
                className="absolute right-0 z-50 mt-1 w-36 rounded-lg border py-1.5 shadow-lg"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                  <Pencil className="h-3.5 w-3.5" style={{ color: "var(--color-muted)" }} />
                  <span style={{ color: "var(--color-foreground)" }}>Edit</span>
                </button>
                <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                  <Archive className="h-3.5 w-3.5" style={{ color: "var(--color-muted)" }} />
                  <span style={{ color: "var(--color-foreground)" }}>Archive</span>
                </button>
                <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                  <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--color-destructive)" }} />
                  <span style={{ color: "var(--color-destructive)" }}>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan details grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Progress */}
        <div>
          <p className="mb-1 text-xs" style={{ color: "var(--color-muted)" }}>
            Progress
          </p>
          <span
            className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-light-blue-bg)",
              color: "var(--color-primary)",
            }}
          >
            {plan.stage}
          </span>
          {/* Progress bar */}
          <div
            className="mt-1.5 h-2 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--color-progress-track)" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${plan.progress}%`,
                backgroundColor: "var(--color-primary)",
              }}
            />
          </div>
        </div>

        {/* Started on */}
        <div>
          <p className="mb-1 text-xs" style={{ color: "var(--color-muted)" }}>
            Started on
          </p>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "var(--color-foreground)" }}>
            <Calendar className="h-3.5 w-3.5" style={{ color: "var(--color-muted)" }} />
            {plan.startedOn}
          </div>
        </div>

        {/* Pricing Group */}
        <div>
          <p className="mb-1 text-xs" style={{ color: "var(--color-muted)" }}>
            Pricing Group
          </p>
          <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
            {plan.pricingGroup}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PLAN DETAILS SECTION                                               */
/* ------------------------------------------------------------------ */

function PlanDetails() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  return (
    <div>
      <h3
        className="mb-4 text-lg font-semibold"
        style={{ color: "var(--color-foreground)" }}
      >
        Plan Details
      </h3>
      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <PlanRow
            key={plan.id}
            plan={plan}
            showDropdown={openDropdown === plan.id}
            onToggleDropdown={() =>
              setOpenDropdown(openDropdown === plan.id ? null : plan.id)
            }
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE HEADER                                                        */
/* ------------------------------------------------------------------ */

function ContactPageHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
          <Users className="h-4 w-4" />
          <span style={{ color: "var(--color-foreground)" }} className="font-medium">
            Contacts
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-muted)" }}>
          <span>{'Your public URL: https://app.growbotik.com/ec9bbfd0d0/plan'}</span>
          <button className="rounded p-1 transition-colors hover:bg-gray-100">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Name + actions */}
      <div className="mb-1 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-foreground)" }}>
            {contactInfo.name}
          </h1>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-archived-bg)",
              color: "var(--color-archived-foreground)",
            }}
          >
            <Archive className="h-3 w-3" />
            Archived
          </span>
        </div>
        <ActionDropdown open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function ContactDetailPage() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <Sidebar />
      <main className="flex-1 px-8 py-6">
        <ContactPageHeader />

        <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: "320px 1fr" }}>
          <ContactCard />
          <PlanDetails />
        </div>
      </main>
    </div>
  )
}
