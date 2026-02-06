"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  BarChart3,
  ChevronDown,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { label: "Contacts", icon: Users, href: "#", active: true },
  { label: "To-do's", icon: CheckSquare, href: "#" },
  { label: "Marketing Plans", icon: BarChart3, href: "#" },
]

export function Sidebar() {
  const [expanded] = useState(true)

  return (
    <aside
      className="flex flex-col border-r border-[var(--color-border-divider)]"
      style={{
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
        backgroundColor: "var(--color-background-light-grey)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 pt-5 pb-2">
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
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
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
        className="px-4 pt-6 pb-1 text-xs font-medium uppercase tracking-wide"
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
      <div className="flex items-center gap-2 border-t border-[var(--color-border-divider)] px-4 py-3">
        <div
          className="flex items-center justify-center rounded-full text-xs font-semibold"
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#C4B5FD",
            color: "var(--color-white)",
          }}
        >
          S
        </div>
        <div className="flex flex-col">
          <span
            className="text-sm font-semibold leading-tight"
            style={{ color: "var(--color-text-dark)" }}
          >
            Shaden
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
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
