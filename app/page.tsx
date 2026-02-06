"use client"

import { useState, useRef, useEffect } from "react"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  BarChart3,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Building2,
  MapPin,
  MoreHorizontal,
  Copy,
  Pencil,
  Archive,
  Trash2,
  BookOpen,
  ExternalLink,
  Calendar,
} from "lucide-react"

/* ─── Sidebar ─── */

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { label: "Contacts", icon: Users, href: "#", active: true },
  { label: "To-do's", icon: CheckSquare, href: "#" },
  { label: "Marketing Plans", icon: BarChart3, href: "#" },
]

function Sidebar() {
  return (
    <aside
      className="flex h-screen flex-col border-r"
      style={{
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
        backgroundColor: "var(--color-background-light-grey)",
        borderColor: "var(--color-border-divider)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 pb-2 pt-5">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 32,
            height: 32,
            backgroundColor: "var(--color-primary-blue)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 14V4C3 3.44772 3.44772 3 4 3H6C6.55228 3 7 3.44772 7 4V14C7 14.5523 6.55228 15 6 15H4C3.44772 15 3 14.5523 3 14Z"
              fill="white"
            />
            <path
              d="M9 10C9 7.79086 10.7909 6 13 6H14C14.5523 6 15 6.44772 15 7V14C15 14.5523 14.5523 15 14 15H13C10.7909 15 9 13.2091 9 11V10Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span
            className="text-sm font-semibold leading-tight"
            style={{ color: "var(--color-text-dark)" }}
          >
            Admin Agency
          </span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Enterprise
          </span>
        </div>
        <ChevronDown
          size={14}
          className="ml-auto"
          style={{ color: "var(--color-text-muted)" }}
        />
      </div>

      {/* Nav Section Label */}
      <div
        className="px-4 pb-1 pt-6 text-xs font-medium uppercase tracking-wide"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Platform
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5 px-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium"
            style={{
              color: item.active
                ? "var(--color-primary-blue)"
                : "var(--color-text-dark)",
              fontWeight: item.active ? 600 : 500,
              backgroundColor: item.active
                ? "var(--color-background-light-blue)"
                : "transparent",
              borderLeft: item.active
                ? "3px solid var(--color-primary-blue)"
                : "3px solid transparent",
            }}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User */}
      <div
        className="flex items-center gap-2 border-t px-4 py-3"
        style={{ borderColor: "var(--color-border-divider)" }}
      >
        <div
          className="flex items-center justify-center overflow-hidden rounded-full"
          style={{ width: 32, height: 32 }}
        >
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Shaden&backgroundColor=c0aede"
            alt="Shaden avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span
            className="text-sm font-semibold leading-tight"
            style={{ color: "var(--color-text-dark)" }}
          >
            Shaden
          </span>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            m@example.com
          </span>
        </div>
        <ChevronDown
          size={14}
          className="ml-auto"
          style={{ color: "var(--color-text-muted)" }}
        />
      </div>
    </aside>
  )
}

/* ─── Contact Header ─── */

function ContactHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={18} style={{ color: "var(--color-text-muted)" }} />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-dark)" }}
          >
            Contacts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Your public URL: https://app.growbotik.com/ec9bbfd0d0/plan
          </span>
          <button
            className="rounded p-1 transition-colors hover:bg-[var(--color-background-active)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Copy size={14} />
          </button>
        </div>
      </div>

      {/* Contact name + actions */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            Elena Rodriguez
          </h1>
          <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Umbrella US
          </span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 transition-colors hover:bg-[var(--color-background-active)]"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Contact actions"
          >
            <MoreHorizontal size={20} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-10 z-20 min-w-[140px] rounded-lg border py-1"
              style={{
                backgroundColor: "var(--color-background-white)",
                borderColor: "var(--color-border-light)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-background-active)]"
                style={{ color: "var(--color-text-dark)" }}
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-background-active)]"
                style={{ color: "var(--color-text-dark)" }}
              >
                <Archive size={14} />
                Archive
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-background-active)]"
                style={{ color: "#DC2626" }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Contact Card ─── */

function ContactCard() {
  return (
    <div
      className="rounded-xl border p-6"
      style={{
        backgroundColor: "var(--color-background-white)",
        borderColor: "var(--color-border-light)",
        boxShadow: "var(--shadow-card-lg)",
      }}
    >
      {/* Avatar + Name */}
      <div className="flex flex-col items-center pb-5">
        <div
          className="mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-background-light-grey)" }}
        >
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Elena&backgroundColor=b6e3f4,c0aede,d1d4f9"
            alt="Elena Rodriguez avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--color-text-dark)" }}
        >
          Elena Rodriguez
        </h2>
        <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Innovate Solutions
        </span>
        <span
          className="mt-1.5 inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: "var(--color-background-light-blue)",
            color: "var(--color-primary-blue)",
          }}
        >
          Discovery
        </span>
      </div>

      {/* Divider */}
      <div
        className="my-4 h-px w-full"
        style={{ backgroundColor: "var(--color-border-divider)" }}
      />

      {/* Last Active / Role */}
      <div className="mb-4 flex justify-between">
        <div>
          <span
            className="block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Last Active:
          </span>
        </div>
        <div className="text-right">
          <span
            className="block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Last Active
          </span>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Role:
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-dark)" }}
        >
          Administrator
        </span>
      </div>

      {/* Divider */}
      <div
        className="my-4 h-px w-full"
        style={{ backgroundColor: "var(--color-border-divider)" }}
      />

      {/* Contact Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Mail size={16} style={{ color: "var(--color-text-muted)" }} />
          <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
            elena.r@innovatesolutions.com
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} style={{ color: "var(--color-text-muted)" }} />
          <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
            +1 (555) 123-4567
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Globe size={16} style={{ color: "var(--color-text-muted)" }} />
          <a
            href="https://www.growbotik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
            style={{ color: "var(--color-primary-blue)" }}
          >
            www.growbotik.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Building2 size={16} style={{ color: "var(--color-text-muted)" }} />
          <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
            Innovate Solutions
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin
            size={16}
            className="mt-0.5 flex-shrink-0"
            style={{ color: "var(--color-text-muted)" }}
          />
          <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
            123 Innovation Drive, San Francisco, CA 94102
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Plan Details ─── */

interface Plan {
  id: number
  name: string
  progress: number
  stage: string
  startedOn: string
  pricingGroup: string
  hasAvatar?: boolean
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Plan 1",
    progress: 45,
    stage: "Discovery",
    startedOn: "Jun 20 2025",
    pricingGroup: "Group 1",
    hasAvatar: true,
  },
  {
    id: 2,
    name: "Plan 2",
    progress: 30,
    stage: "Discovery",
    startedOn: "Jun 20 2025",
    pricingGroup: "Group 1",
  },
]

function PlanRow({ plan }: { plan: Plan }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <div
      className="rounded-lg border p-5"
      style={{
        backgroundColor: "var(--color-background-white)",
        borderColor: "var(--color-border-light)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Plan header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4
            className="text-base font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {plan.name}
          </h4>
          {plan.hasAvatar && (
            <div
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--color-background-light-grey)" }}
            >
              <img
                src="https://api.dicebear.com/9.x/avataaars/svg?seed=TeamMember&backgroundColor=ffd5dc"
                alt="Team member"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="relative flex items-center gap-2" ref={menuRef}>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--color-primary-blue)" }}
          >
            Review plan
            <ExternalLink size={14} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded p-1 transition-colors hover:bg-[var(--color-background-active)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-8 z-10 min-w-[140px] rounded-lg border py-1"
              style={{
                backgroundColor: "var(--color-background-white)",
                borderColor: "var(--color-border-light)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-background-active)]"
                style={{ color: "var(--color-text-dark)" }}
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-background-active)]"
                style={{ color: "var(--color-text-dark)" }}
              >
                <Archive size={14} />
                Archive
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-background-active)]"
                style={{ color: "#DC2626" }}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plan info grid */}
      <div className="grid grid-cols-4 items-start gap-4">
        {/* Progress */}
        <div>
          <span
            className="mb-1 block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Progress
          </span>
          <span
            className="mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-background-light-blue)",
              color: "var(--color-primary-blue)",
            }}
          >
            {plan.stage}
          </span>
          {/* Progress bar */}
          <div
            className="mt-1 h-2 w-full overflow-hidden rounded-sm"
            style={{ backgroundColor: "var(--color-background-active)" }}
          >
            <div
              className="h-full rounded-sm"
              style={{
                width: `${plan.progress}%`,
                backgroundColor: "var(--color-accent-blue)",
              }}
            />
          </div>
        </div>

        {/* Spacer for alignment */}
        <div />

        {/* Started on */}
        <div>
          <span
            className="mb-1 block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Started on
          </span>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} style={{ color: "var(--color-text-muted)" }} />
            <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
              {plan.startedOn}
            </span>
          </div>
        </div>

        {/* Pricing Group */}
        <div>
          <span
            className="mb-1 block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Pricing Group
          </span>
          <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
            {plan.pricingGroup}
          </span>
        </div>
      </div>
    </div>
  )
}

function PlanDetails() {
  return (
    <div className="relative">
      <h3
        className="mb-4 text-lg font-semibold"
        style={{ color: "var(--color-text-dark)" }}
      >
        Plan Details
      </h3>
      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <PlanRow key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Floating avatar at bottom-right */}
      <div
        className="absolute -bottom-4 -right-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2"
        style={{
          borderColor: "var(--color-background-white)",
          backgroundColor: "var(--color-background-light-grey)",
        }}
      >
        <img
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=Shaden&backgroundColor=ffd5dc,d1d4f9"
          alt="Assigned user"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

/* ─── Main Page ─── */

export default function ContactDetailPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main
        className="flex-1 overflow-auto px-10 py-6"
        style={{ backgroundColor: "var(--color-background-white)" }}
      >
        <ContactHeader />

        <div className="mt-6 grid grid-cols-[320px_1fr] items-start gap-6">
          <ContactCard />
          <PlanDetails />
        </div>
      </main>
    </div>
  )
}
