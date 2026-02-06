"use client"

import { useState } from "react"
import {
  FileText,
  CheckSquare,
  BarChart2,
  Link2,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  hasSubmenu?: boolean
}

const navItems: NavItem[] = [
  {
    label: "Marketing Plan",
    icon: <FileText size={18} />,
    href: "#",
    hasSubmenu: true,
  },
  {
    label: "Todos",
    icon: <CheckSquare size={18} />,
    href: "#",
  },
  {
    label: "Reporting",
    icon: <BarChart2 size={18} />,
    href: "#",
  },
  {
    label: "Integrations",
    icon: <Link2 size={18} />,
    href: "#",
  },
]

export default function Sidebar() {
  const [expandedItem, setExpandedItem] = useState<string | null>(
    "Marketing Plan"
  )

  return (
    <aside
      className="flex flex-col"
      style={{
        width: "var(--sidebar-width)",
        minWidth: "var(--sidebar-width)",
        backgroundColor: "var(--color-background-light-grey)",
        padding: "var(--space-5)",
        minHeight: "100vh",
        borderRight: "1px solid var(--color-border-divider)",
      }}
    >
      {/* User Profile */}
      <div
        className="flex items-center"
        style={{ gap: "var(--space-2)", marginBottom: "var(--space-8)" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "#4F46E5",
            color: "var(--color-white)",
            fontSize: "var(--text-base-sm)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          JD
        </div>
        <div className="flex flex-col" style={{ minWidth: 0 }}>
          <span
            style={{
              fontSize: "var(--text-base-sm)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-text-dark)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            John Doe
          </span>
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            john@business.com
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col" style={{ gap: "var(--space-1)" }}>
        {navItems.map((item) => (
          <div key={item.label}>
            <a
              href={item.href}
              className="flex items-center"
              style={{
                gap: "var(--space-4)",
                padding: "var(--space-3) var(--space-5)",
                fontSize: "0.9375rem",
                fontWeight: "var(--font-medium)",
                color: "var(--color-text-dark)",
                textDecoration: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
              }}
              onClick={(e) => {
                if (item.hasSubmenu) {
                  e.preventDefault()
                  setExpandedItem(
                    expandedItem === item.label ? null : item.label
                  )
                }
              }}
            >
              <span
                style={{
                  color: "var(--color-text-muted)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu &&
                (expandedItem === item.label ? (
                  <ChevronDown size={16} style={{ color: "var(--color-text-muted)" }} />
                ) : (
                  <ChevronRight size={16} style={{ color: "var(--color-text-muted)" }} />
                ))}
            </a>
          </div>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <a
        href="#"
        className="flex items-center"
        style={{
          gap: "var(--space-4)",
          padding: "var(--space-3) var(--space-5)",
          fontSize: "0.9375rem",
          fontWeight: "var(--font-medium)",
          color: "var(--color-text-dark)",
          textDecoration: "none",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogOut size={18} />
        </span>
        <span>Logout</span>
      </a>
    </aside>
  )
}
