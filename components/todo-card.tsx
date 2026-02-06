"use client"

import {
  Clock,
  Calendar,
  CheckCircle2,
  CreditCard,
  Globe,
  Search,
  MousePointerClick,
  MonitorSmartphone,
  Megaphone,
  FolderCog,
  Star,
  PenTool,
  Share2,
  Server,
} from "lucide-react"
import type { Todo, TodoPriority } from "@/lib/todo-types"
import { ARCHETYPE_LABELS, PRIORITY_LABELS } from "@/lib/todo-types"

// Product-based icon map
export const productIconMap: Record<string, React.ReactNode> = {
  "Account Billing": <CreditCard size={20} />,
  "Local SEO": <Search size={20} />,
  "Website Design": <PenTool size={20} />,
  "PR & Content": <Megaphone size={20} />,
  "PPC Management": <MousePointerClick size={20} />,
  "Website Migration": <Server size={20} />,
  "Social Media Ads": <Share2 size={20} />,
  "Website": <MonitorSmartphone size={20} />,
  "Account Setup": <FolderCog size={20} />,
  "Reputation Management": <Star size={20} />,
}

export const productColorMap: Record<string, { bg: string; color: string }> = {
  "Account Billing": {
    bg: "var(--color-background-light-orange)",
    color: "var(--color-accent-orange)",
  },
  "Local SEO": {
    bg: "var(--color-background-light-green-alt)",
    color: "var(--color-accent-green)",
  },
  "Website Design": {
    bg: "var(--color-background-light-blue)",
    color: "var(--color-accent-blue)",
  },
  "PR & Content": {
    bg: "var(--color-background-light-pink)",
    color: "var(--color-accent-pink)",
  },
  "PPC Management": {
    bg: "var(--color-background-light-orange)",
    color: "var(--color-accent-orange)",
  },
  "Website Migration": {
    bg: "var(--color-background-light-blue)",
    color: "var(--color-primary-blue)",
  },
  "Social Media Ads": {
    bg: "var(--color-background-light-pink)",
    color: "var(--color-accent-pink-bright)",
  },
  "Website": {
    bg: "var(--color-background-light-blue)",
    color: "var(--color-accent-blue)",
  },
  "Account Setup": {
    bg: "var(--color-background-light-grey)",
    color: "var(--color-text-muted)",
  },
  "Reputation Management": {
    bg: "var(--color-background-light-orange)",
    color: "var(--color-accent-orange)",
  },
}

const defaultColors = {
  bg: "var(--color-background-light-grey)",
  color: "var(--color-text-muted)",
}

const priorityColorMap: Record<TodoPriority, { bg: string; color: string }> = {
  low: { bg: "var(--color-background-light-grey)", color: "var(--color-text-muted)" },
  medium: { bg: "var(--color-background-light-blue)", color: "var(--color-accent-blue)" },
  high: { bg: "var(--color-background-light-orange)", color: "var(--color-accent-orange)" },
  critical: { bg: "var(--color-background-light-pink)", color: "var(--color-accent-pink-bright)" },
}

interface TodoCardProps {
  todo: Todo
  onClick: (todo: Todo) => void
  isCompleted?: boolean
}

function formatDueDate(dateStr: string | null): string {
  if (!dateStr) return "No due date"
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)}d`
  if (diffDays === 0) return "Due today"
  if (diffDays === 1) return "Due tomorrow"
  return `Due in ${diffDays}d`
}

function formatCompletedDate(dateStr?: string | null): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function TodoCard({
  todo,
  onClick,
  isCompleted = false,
}: TodoCardProps) {
  const product = todo.productName || ""
  const iconColors = productColorMap[product] || defaultColors
  const priorityColors = priorityColorMap[todo.priority]
  const isDueOverdue =
    todo.dueDate && new Date(todo.dueDate).getTime() < Date.now()

  return (
    <button
      type="button"
      onClick={() => onClick(todo)}
      className="flex items-start"
      style={{
        width: "100%",
        backgroundColor: "var(--color-background-white)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
        padding: "var(--space-6)",
        cursor: "pointer",
        textAlign: "left",
        gap: "var(--space-5)",
        opacity: isCompleted ? 0.7 : 1,
        fontFamily: "inherit",
        transition: "box-shadow 0.15s ease, border-color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card-lg)"
        e.currentTarget.style.borderColor = "var(--color-primary-blue)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)"
        e.currentTarget.style.borderColor = "var(--color-border-light)"
      }}
    >
      {/* Product Icon */}
      <div
        className="shrink-0"
        style={{ position: "relative" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "var(--icon-circle-size)",
            height: "var(--icon-circle-size)",
            borderRadius: "var(--radius-full)",
            backgroundColor: isCompleted
              ? "var(--color-background-light-green-alt)"
              : iconColors.bg,
            color: isCompleted
              ? "var(--color-accent-green)"
              : iconColors.color,
          }}
        >
          {productIconMap[product] || <Globe size={20} />}
        </div>
        {isCompleted && (
          <div
            className="flex items-center justify-center"
            style={{
              position: "absolute",
              bottom: "-3px",
              right: "-3px",
              width: "22px",
              height: "22px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-accent-green)",
              color: "#fff",
              border: "2.5px solid var(--color-background-white)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          >
            <CheckCircle2 size={14} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1" style={{ minWidth: 0 }}>
        {/* Title row */}
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            marginBottom: "var(--space-1)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-text-dark)",
              textDecoration: isCompleted ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>

          {todo.status === "reopened" && (
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-medium)",
                color: "var(--color-accent-orange)",
                backgroundColor: "var(--color-background-light-orange)",
                padding: "2px var(--space-2)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Reopened
            </span>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-normal)",
            marginBottom: "var(--space-3)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {todo.description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center"
          style={{ gap: "var(--space-4)", flexWrap: "wrap" }}
        >
          {/* Priority badge */}
          {!isCompleted && (
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-medium)",
                color: priorityColors.color,
                backgroundColor: priorityColors.bg,
                padding: "2px var(--space-2)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {PRIORITY_LABELS[todo.priority]}
            </span>
          )}

          {/* Archetype badge */}
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-medium)",
              color: iconColors.color,
              backgroundColor: iconColors.bg,
              padding: "2px var(--space-2)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {ARCHETYPE_LABELS[todo.archetype]}
          </span>

          {/* Due date / Completed date */}
          {isCompleted ? (
            <span
              className="flex items-center"
              style={{
                gap: "4px",
                fontSize: "var(--text-xs)",
                color: "var(--color-accent-green)",
              }}
            >
              <CheckCircle2 size={12} />
              Completed {formatCompletedDate(todo.completedDate)}
            </span>
          ) : (
            todo.dueDate && (
              <span
                className="flex items-center"
                style={{
                  gap: "4px",
                  fontSize: "var(--text-xs)",
                  color: isDueOverdue
                    ? "var(--color-accent-pink-bright)"
                    : "var(--color-text-muted)",
                  fontWeight: isDueOverdue ? "var(--font-medium)" : "var(--font-regular)",
                }}
              >
                <Calendar size={12} />
                {formatDueDate(todo.dueDate)}
              </span>
            )
          )}

          {/* Estimated time */}
          {!isCompleted && (
            <span
              className="flex items-center"
              style={{
                gap: "4px",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
              }}
            >
              <Clock size={12} />
              {todo.estimatedMinutes} min
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
