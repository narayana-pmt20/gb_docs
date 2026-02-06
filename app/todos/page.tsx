"use client"

import { useState, useMemo } from "react"
import { mockTodos } from "@/lib/todo-data"
import type { Todo } from "@/lib/todo-types"
import TodoCard from "@/components/todo-card"
import TodoDetail from "@/components/todo-detail"
import TipBox from "@/components/tip-box"
import {
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react"

type FilterType = "all" | "information_request" | "integration" | "feedback_request" | "vendor_request" | "payment" | "system_alert"

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "information_request", label: "Information" },
  { value: "integration", label: "Integrations" },
  { value: "feedback_request", label: "Feedback" },
  { value: "vendor_request", label: "Vendor" },
  { value: "payment", label: "Payments" },
  { value: "system_alert", label: "Alerts" },
]

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [showAllOpen, setShowAllOpen] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  // Separate open vs completed
  const openTodos = useMemo(() => {
    const open = todos
      .filter(
        (t) =>
          t.status !== "completed" && t.status !== "cancelled"
      )
      .sort((a, b) => b.priorityScore - a.priorityScore)

    if (activeFilter === "all") return open
    return open.filter((t) => t.archetype === activeFilter)
  }, [todos, activeFilter])

  const completedTodos = useMemo(
    () =>
      todos
        .filter((t) => t.status === "completed")
        .sort(
          (a, b) =>
            new Date(b.completedDate || 0).getTime() -
            new Date(a.completedDate || 0).getTime()
        ),
    [todos]
  )

  // Top 3 + "X more to go" pattern per spec
  const MAX_VISIBLE = 3
  const visibleOpenTodos = showAllOpen
    ? openTodos
    : openTodos.slice(0, MAX_VISIBLE)
  const remainingCount = openTodos.length - MAX_VISIBLE

  // Handle complete
  const handleComplete = (todoId: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? {
              ...t,
              status: "completed" as const,
              completedDate: new Date().toISOString(),
            }
          : t
      )
    )
    setSelectedTodo(null)
  }

  // Handle snooze
  const handleSnooze = (todoId: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId
          ? { ...t, status: "snoozed" as const }
          : t
      )
    )
    setSelectedTodo(null)
  }

  return (
    <>
      {/* Top breadcrumb bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "var(--space-3) 0",
          marginBottom: "var(--space-1)",
          flexWrap: "wrap",
          gap: "var(--space-3)",
        }}
      >
        <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
          <ListTodo size={18} style={{ color: "var(--color-text-muted)" }} />
          <span
            style={{
              fontSize: "var(--text-base-sm)",
              color: "var(--color-text-muted)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Todos
          </span>
        </div>

      </div>

      {/* Title row with divider */}
      <div
        style={{
          paddingBottom: "var(--space-5)",
          marginBottom: "var(--space-8)",
          borderBottom: "1px solid var(--color-border-divider)",
        }}
      >
        <h1
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-bold)",
            color: "var(--color-text-dark)",
            marginBottom: "var(--space-1)",
          }}
        >
          Todos
        </h1>
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            color: "var(--color-text-muted)",
            fontWeight: "var(--font-regular)",
          }}
        >
          Complete these tasks to move your marketing plan forward
        </p>
      </div>

      {/* Summary bar */}
      <div
        className="flex items-center"
        style={{
          gap: "var(--space-6)",
          marginBottom: "var(--space-8)",
          flexWrap: "wrap",
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            padding: "var(--space-3) var(--space-5)",
            backgroundColor: "var(--color-background-light-blue)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <Circle size={16} style={{ color: "var(--color-accent-blue)" }} />
          <span
            style={{
              fontSize: "var(--text-base-sm)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-accent-blue)",
            }}
          >
            {openTodos.length} Open
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            padding: "var(--space-3) var(--space-5)",
            backgroundColor: "var(--color-background-light-green-alt)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <CheckCircle2
            size={16}
            style={{ color: "var(--color-accent-green)" }}
          />
          <span
            style={{
              fontSize: "var(--text-base-sm)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-accent-green)",
            }}
          >
            {completedTodos.length} Completed
          </span>
        </div>
      </div>

      {/* Tip box */}
      <TipBox text="Todos are sorted by priority. Focus on critical tasks first to keep your marketing campaigns running smoothly. Click on any task to view details and take action." />

      {/* Filters */}
      <div
        className="flex items-center"
        style={{
          gap: "var(--space-2)",
          marginBottom: "var(--space-8)",
          flexWrap: "wrap",
        }}
      >
        <Filter
          size={16}
          style={{
            color: "var(--color-text-muted)",
            marginRight: "var(--space-1)",
          }}
        />
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setActiveFilter(opt.value)}
            style={{
              padding: "var(--space-1) var(--space-4)",
              fontSize: "var(--text-xs)",
              fontWeight:
                activeFilter === opt.value
                  ? "var(--font-semibold)"
                  : "var(--font-regular)",
              color:
                activeFilter === opt.value
                  ? "var(--color-white)"
                  : "var(--color-text-muted)",
              backgroundColor:
                activeFilter === opt.value
                  ? "var(--color-primary-blue)"
                  : "var(--color-background-light-grey)",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Open Todos Section */}
      <h2
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: "var(--font-semibold)",
          color: "var(--color-text-dark)",
          marginBottom: "var(--space-6)",
        }}
      >
        Open Tasks
      </h2>

      <div
        className="flex flex-col"
        style={{ gap: "var(--space-4)", marginBottom: "var(--space-6)" }}
      >
        {visibleOpenTodos.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{
              padding: "var(--space-12)",
              backgroundColor: "var(--color-background-light-grey)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <CheckCircle2
              size={40}
              style={{
                color: "var(--color-accent-green)",
                marginBottom: "var(--space-4)",
              }}
            />
            <p
              style={{
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-semibold)",
                color: "var(--color-text-dark)",
                marginBottom: "var(--space-2)",
              }}
            >
              {activeFilter !== "all"
                ? "No matching tasks"
                : "All caught up!"}
            </p>
            <p
              style={{
                fontSize: "var(--text-base-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              {activeFilter !== "all"
                ? "Try a different filter to see more tasks."
                : "You have no open tasks right now."}
            </p>
          </div>
        ) : (
          visibleOpenTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onClick={setSelectedTodo}
            />
          ))
        )}
      </div>

      {/* "X more to go" expand link */}
      {!showAllOpen && remainingCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAllOpen(true)}
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            fontSize: "var(--text-base-sm)",
            fontWeight: "var(--font-medium)",
            color: "var(--color-primary-blue)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--space-2) 0",
            marginBottom: "var(--space-8)",
            fontFamily: "inherit",
          }}
        >
          <ChevronDown size={16} />
          {remainingCount} more to go
        </button>
      )}

      {showAllOpen && openTodos.length > MAX_VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAllOpen(false)}
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            fontSize: "var(--text-base-sm)",
            fontWeight: "var(--font-medium)",
            color: "var(--color-primary-blue)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "var(--space-2) 0",
            marginBottom: "var(--space-8)",
            fontFamily: "inherit",
          }}
        >
          <ChevronUp size={16} />
          Show less
        </button>
      )}

      {/* Completed Section */}
      <div
        style={{
          marginTop: "var(--space-12)",
          borderTop: "1px solid var(--color-border-divider)",
          paddingTop: "var(--space-8)",
        }}
      >
        <button
          type="button"
          onClick={() => setShowCompleted(!showCompleted)}
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: showCompleted ? "var(--space-6)" : 0,
            fontFamily: "inherit",
          }}
        >
          Completed
          <span
            style={{
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-medium)",
              color: "var(--color-accent-green)",
              backgroundColor: "var(--color-background-light-green-alt)",
              padding: "2px var(--space-3)",
              borderRadius: "var(--radius-md)",
              marginLeft: "var(--space-2)",
            }}
          >
            {completedTodos.length}
          </span>
          {showCompleted ? (
            <ChevronUp size={20} style={{ color: "var(--color-text-muted)" }} />
          ) : (
            <ChevronDown
              size={20}
              style={{ color: "var(--color-text-muted)" }}
            />
          )}
        </button>

        {showCompleted && (
          <div
            className="flex flex-col"
            style={{ gap: "var(--space-4)" }}
          >
            {completedTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onClick={setSelectedTodo}
                isCompleted
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedTodo && (
        <TodoDetail
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onComplete={handleComplete}
          onSnooze={handleSnooze}
        />
      )}
    </>
  )
}
