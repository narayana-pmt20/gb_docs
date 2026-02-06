"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  FileText,
  ListTodo,
  BarChart2,
  Link2,
  LogOut,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
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
    href: "/",
    hasSubmenu: true,
  },
  {
    label: "Todos",
    icon: <ListTodo size={18} />,
    href: "/todos",
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
  const pathname = usePathname()
  const [expandedItem, setExpandedItem] = useState<string | null>(
    "Marketing Plan"
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* Mobile Header */}
      <div className="ds-mobile-header">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-dark)",
            display: "flex",
            alignItems: "center",
            padding: "var(--space-2)",
          }}
        >
          <Menu size={22} />
        </button>
        <span
          style={{
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
          }}
        >
          Growbotik
        </span>
        <div style={{ width: "38px" }} />
      </div>

      {/* Mobile overlay */}
      <div
        className={`ds-sidebar-overlay ${mobileOpen ? "ds-sidebar-overlay--visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setMobileOpen(false)
        }}
        role="button"
        tabIndex={0}
        aria-label="Close navigation"
      />

      {/* Sidebar */}
      <aside
        className={`ds-sidebar ${mobileOpen ? "ds-sidebar--open" : ""}`}
      >
        {/* Mobile close button */}
        <div
          className="flex items-center justify-between"
          style={{
            marginBottom: "var(--space-5)",
          }}
        >
          {/* User Profile */}
          <div
            className="flex items-center"
            style={{ gap: "var(--space-2)" }}
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

          {/* Close btn only on mobile -- hidden by CSS on desktop */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="ds-sidebar-close-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              display: "none",
              alignItems: "center",
              padding: "var(--space-2)",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col" style={{ gap: "var(--space-1)" }}>
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)

            return (
              <div key={item.label}>
                {item.hasSubmenu ? (
                  <button
                    type="button"
                    className="flex items-center"
                    style={{
                      gap: "var(--space-4)",
                      padding: "var(--space-3) var(--space-5)",
                      fontSize: "0.9375rem",
                      fontWeight: isActive
                        ? "var(--font-semibold)"
                        : "var(--font-medium)",
                      color: isActive
                        ? "var(--color-primary-blue)"
                        : "var(--color-text-dark)",
                      textDecoration: "none",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      width: "100%",
                      border: "none",
                      backgroundColor: "transparent",
                      fontFamily: "inherit",
                    }}
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === item.label ? null : item.label
                      )
                    }
                  >
                    <span
                      style={{
                        color: isActive
                          ? "var(--color-primary-blue)"
                          : "var(--color-text-muted)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1" style={{ textAlign: "left" }}>
                      {item.label}
                    </span>
                    {expandedItem === item.label ? (
                      <ChevronDown
                        size={16}
                        style={{ color: "var(--color-text-muted)" }}
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        style={{ color: "var(--color-text-muted)" }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center"
                    style={{
                      gap: "var(--space-4)",
                      padding: "var(--space-3) var(--space-5)",
                      fontSize: "0.9375rem",
                      fontWeight: isActive
                        ? "var(--font-semibold)"
                        : "var(--font-medium)",
                      color: isActive
                        ? "var(--color-primary-blue)"
                        : "var(--color-text-dark)",
                      textDecoration: "none",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        color: isActive
                          ? "var(--color-primary-blue)"
                          : "var(--color-text-muted)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                  </Link>
                )}
              </div>
            )
          })}
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
    </>
  )
}
