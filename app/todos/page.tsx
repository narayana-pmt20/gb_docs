"use client"

import { useState, useMemo } from "react"
import { mockTodos } from "@/lib/todo-data"
import type { Todo } from "@/lib/todo-types"
import TodoCard from "@/components/todo-card"
import TodoDetail from "@/components/todo-detail"
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  ArrowLeft,
} from "lucide-react"

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [showAllOpen, setShowAllOpen] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)

  // Separate open vs completed
  const openTodos = useMemo(() => {
    const open = todos
      .filter(
        (t) =>
          t.status !== "completed" && t.status !== "cancelled"
      )
      .sort((a, b) => b.priorityScore - a.priorityScore)

    return open
  }, [todos])

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

  // Critical count (open + critical priority)
  const criticalCount = openTodos.filter((t) => t.priority === "critical").length

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
      {selectedTodo ? (
        // Detail View - Full Page Replacement
        <div>
          {/* Back button */}
          <button
            type="button"
            onClick={() => setSelectedTodo(null)}
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
              marginBottom: "var(--space-6)",
              fontFamily: "inherit",
            }}
          >
            <ArrowLeft size={16} />
            Back to todos
          </button>

          {/* Detail Panel */}
          <TodoDetail
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
            onComplete={handleComplete}
            onSnooze={handleSnooze}
          />
        </div>
      ) : (
        // List View - Default
        <>
      <div
        style={{
          paddingBottom: "var(--space-5)",
          marginBottom: "var(--space-8)",
          borderBottom: "1px solid var(--color-border-divider)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "var(--space-2)", flexWrap: "wrap", gap: "var(--space-3)" }}
        >
          <h1
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-bold)",
              color: "var(--color-text-dark)",
              margin: 0,
            }}
          >
            Todos
          </h1>

          {/* Count badges */}
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <div
              className="flex items-center"
              style={{
                gap: "var(--space-2)",
                padding: "var(--space-1) var(--space-4)",
                backgroundColor: "var(--color-background-light-blue)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <Circle size={13} style={{ color: "var(--color-accent-blue)" }} />
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-accent-blue)",
                }}
              >
                {openTodos.length} Open
              </span>
            </div>
            {criticalCount > 0 && (
              <div
                className="flex items-center"
                style={{
                  gap: "var(--space-2)",
                  padding: "var(--space-1) var(--space-4)",
                  backgroundColor: "var(--color-background-light-pink)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-semibold)",
                    color: "var(--color-accent-pink-bright)",
                  }}
                >
                  {criticalCount} Critical
                </span>
              </div>
            )}
            {completedTodos.length > 0 && (
              <div
                className="flex items-center"
                style={{
                  gap: "var(--space-2)",
                  padding: "var(--space-1) var(--space-4)",
                  backgroundColor: "var(--color-background-light-green-alt)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <CheckCircle2
                  size={13}
                  style={{ color: "var(--color-accent-green)" }}
                />
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-semibold)",
                    color: "var(--color-accent-green)",
                  }}
                >
                  {completedTodos.length} Completed
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Subtitle + inline tip */}
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            color: "var(--color-text-muted)",
            fontWeight: "var(--font-regular)",
            lineHeight: "var(--leading-relaxed)",
            margin: 0,
          }}
        >
          Complete these tasks to move your marketing plan forward. Tip: Focus on critical tasks first to keep your campaigns running smoothly.
        </p>
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
              All caught up!
            </p>
            <p
              style={{
                fontSize: "var(--text-base-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              You have no open tasks right now.
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
            {completedTodos.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  padding: "var(--space-10)",
                  backgroundColor: "var(--color-background-light-grey)",
                  borderRadius: "var(--radius-xl)",
                }}
              >
                <Circle
                  size={32}
                  style={{
                    color: "var(--color-text-muted)",
                    marginBottom: "var(--space-3)",
                    opacity: 0.4,
                  }}
                />
                <p
                  style={{
                    fontSize: "var(--text-base-sm)",
                    color: "var(--color-text-muted)",
                    margin: 0,
                  }}
                >
                  Completed tasks will appear here as you work through your todos.
                </p>
              </div>
            ) : (
              completedTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onClick={setSelectedTodo}
                  isCompleted
                />
              ))
            )}
          </div>
        )}
      </div>

        </>
      )}
    </>
  )
}
