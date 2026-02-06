"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  ListChecks,
  Megaphone,
  Package,
  DollarSign,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#", active: false },
  { label: "Contacts", icon: Users, href: "#", active: true },
  { label: "To-do's", icon: ListChecks, href: "#", active: false },
  { label: "Marketing Plans", icon: Megaphone, href: "#", active: false },
  { label: "Products", icon: Package, href: "#", active: false },
  { label: "Prices", icon: DollarSign, href: "#", active: false },
]

const bottomItems = [
  { label: "Settings", icon: Settings, href: "#" },
  { label: "Get Help", icon: HelpCircle, href: "#" },
]

export function AppSidebar() {
  return (
    <aside className="flex w-[200px] min-w-[200px] flex-col border-r border-border bg-background">
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-foreground text-[8px] font-bold leading-tight tracking-tight text-background">
          <span>
            ASSR
            <br />
            JYST
          </span>
        </div>
        <span className="text-sm font-semibold text-foreground">
          {"Narayana Sami's Agency"}
        </span>
      </div>

      {/* Platform label */}
      <div className="px-4 pt-4 pb-2 text-xs font-medium text-muted-foreground">
        Platform
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col px-2">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
                  item.active && "font-semibold text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom items */}
        <div className="mt-auto flex flex-col gap-0.5 pb-2">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 border-t border-border px-3 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            NS
          </div>
          <span className="text-sm font-medium text-foreground">
            Narayana Sami
          </span>
          <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
        </div>
      </nav>
    </aside>
  )
}
