"use client"

import {
  FileText,
  Link2,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  Clock,
  Calendar,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react"
import type { Todo, TodoArchetype, TodoPriority } from "@/lib/todo-types"
import { ARCHETYPE_LABELS, PRIORITY_LABELS } from "@/lib/todo-types"

const archetypeIconMap: Record<TodoArchetype, React.ReactNode> = {
  information_request: <FileText size={20} />,
  integration: <Link2 size={20} />,
  feedback_request: <MessageSquare size={20} />,
  vendor_request: <ShoppingCart size={20} />,
  payment: <CreditCard size={20} />,
  system_alert: <AlertTriangle size={20} />,
}

const archetypeColorMap: Record<
  TodoArchetype,
  { bg: string; color: string }
> = {
  information_request: {
    bg: "var(--color-background-light-blue)",
    color: "var(--color-accent-blue)",
  },
  integration: {
    bg: "var(--color-background-light-green-alt)",
    color: "var(--color-accent-green)",
  },
  feedback_request: {
    bg: "var(--color-background-light-orange)",
    color: "var(--color-accent-orange)",
  },
  vendor_request: {
    bg: "var(--color-background-light-pink)",
    color: "var(--color-accent-pink)",
  },
  payment: {
    bg: "var(--color-background-light-orange)",
    color: "var(--color-accent-orange)",
  },
  system_alert: {
    bg: "var(--color-background-light-pink)",
    color: "var(--color-accent-pink-bright)",
  },
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
  const archetypeColors = archetypeColorMap[todo.archetype]
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
      {/* Archetype Icon */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: "var(--icon-circle-size)",
          height: "var(--icon-circle-size)",
          borderRadius: "var(--radius-full)",
          backgroundColor: archetypeColors.bg,
          color: archetypeColors.color,
        }}
      >
        {isCompleted ? (
          <CheckCircle2 size={20} style={{ color: "var(--color-accent-green)" }} />
        ) : (
          archetypeIconMap[todo.archetype]
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

          {todo.blocking && !isCompleted && (
            <span
              className="flex items-center"
              style={{
                gap: "2px",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-medium)",
                color: "var(--color-accent-pink-bright)",
                backgroundColor: "var(--color-background-light-pink)",
                padding: "2px var(--space-2)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <ShieldAlert size={12} />
              Blocking
            </span>
          )}

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
          {/* Archetype badge */}
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-medium)",
              color: archetypeColors.color,
              backgroundColor: archetypeColors.bg,
              padding: "2px var(--space-2)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {ARCHETYPE_LABELS[todo.archetype]}
          </span>

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

          {/* Product name */}
          {todo.productName && (
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-secondary)",
                backgroundColor: "var(--color-background-tag)",
                padding: "2px var(--space-2)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {todo.productName}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
