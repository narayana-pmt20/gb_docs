"use client"

import { useState } from "react"
import {
  X,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  CreditCard,
  AlertTriangle,
  Upload,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle2,
  Globe,
  User,
} from "lucide-react"
import type { Todo, TodoField } from "@/lib/todo-types"
import GbpConnectFlow from "@/components/gbp-connect-flow"
import GoogleAdsConnectFlow from "@/components/google-ads-connect-flow"
import { productIconMap, productColorMap } from "@/components/todo-card"
import {
  ARCHETYPE_LABELS,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "@/lib/todo-types"

const defaultColors = {
  bg: "var(--color-background-light-grey)",
  color: "var(--color-text-muted)",
}

interface TodoDetailProps {
  todo: Todo
  onClose: () => void
  onComplete: (todoId: string) => void
  onSnooze: (todoId: string) => void
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "N/A"
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function TodoFormField({
  field,
  value,
  onChange,
}: {
  field: TodoField
  value: string
  onChange: (val: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "var(--text-base-sm)",
    fontWeight: "var(--font-medium)",
    color: "var(--color-text-dark)",
    marginBottom: "var(--space-1)",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "40px",
    padding: "var(--space-2) var(--space-4)",
    fontSize: "0.9375rem",
    fontWeight: "var(--font-regular)",
    color: "var(--color-text-dark)",
    backgroundColor: "var(--color-background-white)",
    border: "1px solid var(--color-border-input)",
    borderRadius: "var(--radius-md)",
    fontFamily: "inherit",
  }

  const helpStyle: React.CSSProperties = {
    fontSize: "var(--text-xs)",
    color: "var(--color-text-secondary)",
    marginTop: "var(--space-1)",
    lineHeight: "var(--leading-normal)",
  }

  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <label style={labelStyle}>
        {field.label}
        {field.required && (
          <span style={{ color: "var(--color-accent-pink-bright)", marginLeft: "2px" }}>
            *
          </span>
        )}
      </label>

      {field.type === "textarea" ? (
        <textarea
          style={{
            ...inputStyle,
            height: "100px",
            resize: "vertical",
            padding: "var(--space-3) var(--space-4)",
          }}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "dropdown" ? (
        <div style={{ position: "relative" }}>
          <select
            style={{
              ...inputStyle,
              appearance: "none",
              paddingRight: "var(--space-10)",
              cursor: "pointer",
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select an option...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            style={{
              position: "absolute",
              right: "var(--space-4)",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-muted)",
              pointerEvents: "none",
            }}
          />
        </div>
      ) : field.type === "file" ? (
        <div
          className="flex items-center justify-center"
          style={{
            border: "2px dashed var(--color-border-input)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-8)",
            cursor: "pointer",
            backgroundColor: "var(--color-background-light-grey)",
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{ gap: "var(--space-2)" }}
          >
            <Upload
              size={24}
              style={{ color: "var(--color-text-muted)" }}
            />
            <span
              style={{
                fontSize: "var(--text-base-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              Click to upload or drag and drop
            </span>
          </div>
        </div>
      ) : field.type === "credentials" ? (
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            style={{ ...inputStyle, paddingRight: "var(--space-12)" }}
            placeholder={field.placeholder || "Enter securely"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "var(--space-3)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      ) : (
        <input
          type={field.type === "email" ? "email" : "text"}
          style={inputStyle}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.helpText && <p style={helpStyle}>{field.helpText}</p>}
    </div>
  )
}

export default function TodoDetail({
  todo,
  onClose,
  onComplete,
  onSnooze,
}: TodoDetailProps) {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    todo.fields?.forEach((f) => {
      initial[f.id] = f.value || ""
    })
    return initial
  })

  const product = todo.productName || ""
  const iconColors = productColorMap[product] || defaultColors
  const isCompleted = todo.status === "completed"
  const totalFields = todo.fields?.filter((f) => f.required).length || 0
  const filledFields =
    todo.fields?.filter((f) => f.required && fieldValues[f.id]?.trim()).length ||
    0

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 40,
        }}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose()
        }}
        role="button"
        tabIndex={0}
        aria-label="Close detail panel"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label={`Todo: ${todo.title}`}
        className="ds-detail-panel"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "var(--space-6)",
            borderBottom: "1px solid var(--color-border-divider)",
          }}
        >
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: "var(--icon-circle-size)",
                height: "var(--icon-circle-size)",
                borderRadius: "var(--radius-full)",
                backgroundColor: iconColors.bg,
                color: iconColors.color,
              }}
            >
              {productIconMap[product] || <Globe size={22} />}
            </div>
            <div>
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
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              padding: "var(--space-2)",
              borderRadius: "var(--radius-md)",
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1"
          style={{
            overflowY: "auto",
            padding: "var(--space-6)",
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "var(--font-bold)",
              color: "var(--color-text-dark)",
              marginBottom: "var(--space-3)",
            }}
          >
            {todo.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "var(--text-base-sm)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              marginBottom: "var(--space-6)",
            }}
          >
            {todo.description}
          </p>

          {/* Meta info grid */}
          <div
            className="ds-meta-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-4)",
              marginBottom: "var(--space-8)",
              padding: "var(--space-5)",
              backgroundColor: "var(--color-background-light-grey)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <Clock size={14} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                ~{todo.estimatedMinutes} min
              </span>
            </div>
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <Calendar size={14} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                {todo.dueDate ? `Due: ${formatDate(todo.dueDate)}` : "No due date"}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <User size={14} style={{ color: "var(--color-text-muted)" }} />
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                Priority: {PRIORITY_LABELS[todo.priority]}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                Status: {STATUS_LABELS[todo.status]}
              </span>
            </div>

          </div>

          {/* Vendor message (for feedback/vendor request) */}
          {todo.vendorMessage && (
            <div
              style={{
                backgroundColor: "var(--color-background-light-blue)",
                border: "1px solid var(--color-primary-blue)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-5)",
                marginBottom: "var(--space-8)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-primary-blue)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Vendor Message:
              </p>
              <p
                style={{
                  fontSize: "var(--text-base-sm)",
                  color: "var(--color-primary-blue)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {todo.vendorMessage}
              </p>
              {todo.vendorFiles && todo.vendorFiles.length > 0 && (
                <div
                  className="flex items-center"
                  style={{ gap: "var(--space-2)", marginTop: "var(--space-3)" }}
                >
                  <FileText size={14} style={{ color: "var(--color-primary-blue)" }} />
                  {todo.vendorFiles.map((file) => (
                    <span
                      key={file}
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-primary-blue)",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {file}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payment details (Invoice / Subscription) */}
          {todo.paymentDetails && !isCompleted && (
            <div
              style={{
                marginBottom: "var(--space-8)",
                border: "1px solid var(--color-border-divider)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {/* Invoice-type payment */}
              {todo.paymentDetails.invoiceNumber && (
                <>
                  <div
                    style={{
                      padding: "var(--space-5)",
                      backgroundColor: "var(--color-background-light-grey)",
                      borderBottom: "1px solid var(--color-border-divider)",
                    }}
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: "var(--space-3)" }}
                    >
                      <span
                        style={{
                          fontSize: "var(--text-base-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-text-dark)",
                        }}
                      >
                        Invoice {todo.paymentDetails.invoiceNumber}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-medium)",
                          color: "var(--color-accent-orange)",
                          backgroundColor: "var(--color-background-light-orange)",
                          padding: "2px var(--space-3)",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        Unpaid
                      </span>
                    </div>
                    <div
                      className="flex items-center"
                      style={{
                        gap: "var(--space-6)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <span>Issued: {todo.paymentDetails.issuedDate}</span>
                      <span>Due: {todo.paymentDetails.dueDate}</span>
                    </div>
                  </div>

                  {/* Line items */}
                  {todo.paymentDetails.items && (
                    <div style={{ padding: "var(--space-5)" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr
                            style={{
                              borderBottom: "1px solid var(--color-border-divider)",
                            }}
                          >
                            <th
                              style={{
                                textAlign: "left",
                                fontSize: "var(--text-xs)",
                                fontWeight: "var(--font-semibold)",
                                color: "var(--color-text-muted)",
                                paddingBottom: "var(--space-3)",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Description
                            </th>
                            <th
                              style={{
                                textAlign: "right",
                                fontSize: "var(--text-xs)",
                                fontWeight: "var(--font-semibold)",
                                color: "var(--color-text-muted)",
                                paddingBottom: "var(--space-3)",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {todo.paymentDetails.items.map((item, idx) => (
                            <tr
                              key={idx}
                              style={{
                                borderBottom:
                                  idx < (todo.paymentDetails?.items?.length || 0) - 1
                                    ? "1px solid var(--color-border-divider)"
                                    : "none",
                              }}
                            >
                              <td
                                style={{
                                  padding: "var(--space-3) 0",
                                  fontSize: "var(--text-base-sm)",
                                  color: "var(--color-text-dark)",
                                }}
                              >
                                {item.description}
                              </td>
                              <td
                                style={{
                                  padding: "var(--space-3) 0",
                                  fontSize: "var(--text-base-sm)",
                                  color: "var(--color-text-dark)",
                                  textAlign: "right",
                                  fontWeight: "var(--font-medium)",
                                }}
                              >
                                {item.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Total */}
                      <div
                        className="flex items-center justify-between"
                        style={{
                          marginTop: "var(--space-4)",
                          paddingTop: "var(--space-4)",
                          borderTop: "2px solid var(--color-text-dark)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "var(--text-base-sm)",
                            fontWeight: "var(--font-bold)",
                            color: "var(--color-text-dark)",
                          }}
                        >
                          Total Due
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-lg)",
                            fontWeight: "var(--font-bold)",
                            color: "var(--color-text-dark)",
                          }}
                        >
                          {todo.paymentDetails.amount}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Payment method on file */}
                  {todo.paymentDetails.paymentMethod && (
                    <div
                      style={{
                        padding: "var(--space-4) var(--space-5)",
                        backgroundColor: "var(--color-background-light-grey)",
                        borderTop: "1px solid var(--color-border-divider)",
                      }}
                    >
                      <div
                        className="flex items-center"
                        style={{ gap: "var(--space-2)" }}
                      >
                        <CreditCard
                          size={14}
                          style={{ color: "var(--color-text-muted)" }}
                        />
                        <span
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          Pay with: {todo.paymentDetails.paymentMethod}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Subscription-type failed payment */}
              {todo.paymentDetails.subscriptionName && (
                <>
                  <div
                    style={{
                      padding: "var(--space-5)",
                      backgroundColor: "var(--color-background-light-pink)",
                      borderBottom: "1px solid var(--color-border-divider)",
                    }}
                  >
                    <div
                      className="flex items-center"
                      style={{ gap: "var(--space-2)", marginBottom: "var(--space-2)" }}
                    >
                      <AlertTriangle
                        size={16}
                        style={{ color: "var(--color-accent-pink-bright)" }}
                      />
                      <span
                        style={{
                          fontSize: "var(--text-base-sm)",
                          fontWeight: "var(--font-semibold)",
                          color: "var(--color-accent-pink-bright)",
                        }}
                      >
                        Payment Failed
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-dark)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      {todo.paymentDetails.failureReason}
                    </p>
                  </div>

                  <div style={{ padding: "var(--space-5)" }}>
                    <div
                      className="flex flex-col"
                      style={{ gap: "var(--space-4)" }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-text-muted)",
                            fontWeight: "var(--font-medium)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Subscription
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-base-sm)",
                            color: "var(--color-text-dark)",
                            fontWeight: "var(--font-medium)",
                          }}
                        >
                          {todo.paymentDetails.subscriptionName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-text-muted)",
                            fontWeight: "var(--font-medium)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Amount
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-lg)",
                            color: "var(--color-text-dark)",
                            fontWeight: "var(--font-bold)",
                          }}
                        >
                          {todo.paymentDetails.amount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-text-muted)",
                            fontWeight: "var(--font-medium)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Last Attempt
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-base-sm)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {todo.paymentDetails.lastAttempt}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-text-muted)",
                            fontWeight: "var(--font-medium)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Card on File
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-base-sm)",
                            color: "var(--color-accent-pink-bright)",
                            fontWeight: "var(--font-medium)",
                          }}
                        >
                          {todo.paymentDetails.cardOnFile}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontSize: "var(--text-xs)",
                            color: "var(--color-text-muted)",
                            fontWeight: "var(--font-medium)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Auto-retry
                        </span>
                        <span
                          style={{
                            fontSize: "var(--text-base-sm)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {todo.paymentDetails.retryDate}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "var(--space-6)",
                        padding: "var(--space-4)",
                        backgroundColor: "var(--color-background-light-grey)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      Update your card below and click "Update Card & Retry Payment" to process the charge immediately.
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Integration connection flows */}
          {todo.integrationFlow === "google_business_profile" && !isCompleted && (
            <GbpConnectFlow onConnected={() => onComplete(todo.id)} />
          )}
          {todo.integrationFlow === "google_ads" && !isCompleted && (
            <GoogleAdsConnectFlow onConnected={() => onComplete(todo.id)} />
          )}

          {/* Progress indicator for multi-field forms */}
          {todo.fields && todo.fields.length > 1 && !isCompleted && !todo.integrationFlow && (
            <div style={{ marginBottom: "var(--space-6)" }}>
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: "var(--space-2)" }}
              >
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-medium)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Progress
                </span>
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-medium)",
                    color: "var(--color-text-dark)",
                  }}
                >
                  {filledFields} of {totalFields} required fields
                </span>
              </div>
              <div
                style={{
                  height: "var(--progress-bar-height)",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-background-light-grey)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--color-accent-green)",
                    width:
                      totalFields > 0
                        ? `${(filledFields / totalFields) * 100}%`
                        : "0%",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          )}

          {/* Form Fields */}
          {todo.fields && !isCompleted && !todo.integrationFlow && (
            <div style={{ marginBottom: "var(--space-6)" }}>
              {todo.fields.map((field) => (
                <TodoFormField
                  key={field.id}
                  field={field}
                  value={fieldValues[field.id] || ""}
                  onChange={(val) =>
                    setFieldValues((prev) => ({ ...prev, [field.id]: val }))
                  }
                />
              ))}
            </div>
          )}

          {/* Read-only completed data */}
          {isCompleted && todo.completedData && (
            <div
              style={{
                marginBottom: "var(--space-6)",
                padding: "var(--space-5)",
                backgroundColor: "var(--color-background-light-grey)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border-divider)",
              }}
            >
              <h4
                style={{
                  fontSize: "var(--text-base-sm)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-text-dark)",
                  marginBottom: "var(--space-4)",
                  paddingBottom: "var(--space-3)",
                  borderBottom: "1px solid var(--color-border-divider)",
                }}
              >
                Submitted Information
              </h4>
              <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
                {Object.entries(todo.completedData).map(([key, value]) => (
                  <div key={key}>
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-semibold)",
                        color: "var(--color-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {key}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--text-base-sm)",
                        color: "var(--color-text-dark)",
                        lineHeight: "var(--leading-relaxed)",
                        wordBreak: "break-word",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed timestamp */}
          {isCompleted && todo.completedDate && (
            <div
              className="flex items-center"
              style={{
                gap: "var(--space-2)",
                marginBottom: "var(--space-6)",
                padding: "var(--space-3) var(--space-4)",
                backgroundColor: "var(--color-background-light-green-alt)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <CheckCircle2 size={14} style={{ color: "var(--color-accent-green)" }} />
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-accent-green)",
                  fontWeight: "var(--font-medium)",
                }}
              >
                Completed on{" "}
                {new Date(todo.completedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}

          {/* Feedback request special actions */}
          {todo.archetype === "feedback_request" && !isCompleted && (
            <div
              className="flex items-center"
              style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}
            >
              <button
                type="button"
                onClick={() => onComplete(todo.id)}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  padding: "var(--space-3) var(--space-5)",
                  fontSize: "var(--text-base-sm)",
                  fontWeight: "var(--font-medium)",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  backgroundColor: "var(--color-accent-green)",
                  color: "var(--color-white)",
                }}
              >
                <CheckCircle2 size={16} />
                Approve
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  padding: "var(--space-3) var(--space-5)",
                  fontSize: "var(--text-base-sm)",
                  fontWeight: "var(--font-medium)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-accent-orange)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  backgroundColor: "var(--color-background-white)",
                  color: "var(--color-accent-orange)",
                }}
              >
                <MessageSquare size={16} />
                Needs Changes
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!isCompleted && !todo.integrationFlow && (
          <div
            className="flex items-center justify-between"
            style={{
              padding: "var(--space-5) var(--space-6)",
              borderTop: "1px solid var(--color-border-divider)",
              gap: "var(--space-3)",
            }}
          >
            <div className="flex flex-col" style={{ gap: "2px" }}>
              <button
                type="button"
                onClick={() => onSnooze(todo.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "var(--space-2) var(--space-5)",
                  fontSize: "var(--text-base-sm)",
                  fontWeight: "var(--font-regular)",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  backgroundColor: "var(--color-background-light-grey)",
                  color: "var(--color-text-dark)",
                }}
              >
                Snooze
              </button>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-secondary)",
                  textAlign: "center",
                }}
              >
                Hides for 24h
              </span>
            </div>
            {todo.archetype !== "feedback_request" && (
              <button
                type="button"
                onClick={() => onComplete(todo.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  padding: "var(--space-2) var(--space-6)",
                  fontSize: "var(--text-base-sm)",
                  fontWeight: "var(--font-medium)",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  backgroundColor:
                    todo.paymentDetails?.subscriptionName
                      ? "var(--color-accent-pink-bright)"
                      : todo.paymentDetails?.invoiceNumber
                        ? "var(--color-accent-green)"
                        : "var(--color-primary-blue)",
                  color: "var(--color-white)",
                }}
              >
                {todo.paymentDetails?.invoiceNumber ? (
                  <>
                    <CreditCard size={16} />
                    Approve & Pay Invoice
                  </>
                ) : todo.paymentDetails?.subscriptionName ? (
                  <>
                    <CreditCard size={16} />
                    Update Card & Retry Payment
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Submit & Complete
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
