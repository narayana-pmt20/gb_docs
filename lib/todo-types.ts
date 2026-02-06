export type TodoStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "snoozed"
  | "reopened"

export type TodoPriority = "low" | "medium" | "high" | "critical"

export type TodoArchetype =
  | "information_request"
  | "integration"
  | "feedback_request"
  | "vendor_request"
  | "payment"
  | "system_alert"

export type TargetActor = "business" | "agency" | "internal_team"
export type SourceActor = "system" | "vendor" | "agency" | "plan_executor"

export interface TodoField {
  id: string
  label: string
  type: "text" | "textarea" | "file" | "dropdown" | "credentials" | "url" | "email"
  placeholder?: string
  helpText?: string
  required: boolean
  value?: string
  options?: string[] // for dropdown type
}

export interface Todo {
  id: string
  title: string
  description: string
  archetype: TodoArchetype
  status: TodoStatus
  priority: TodoPriority
  priorityScore: number // computed score from the 3-factor rule
  blocking: boolean
  targetActor: TargetActor
  sourceActor: SourceActor
  estimatedMinutes: number
  dueDate: string | null // ISO date string
  requestedDate: string // ISO date string
  completedDate?: string | null
  cancelledDate?: string | null
  productName?: string
  fields?: TodoField[]
  vendorMessage?: string
  vendorFiles?: string[]
  integrationFlow?: string // e.g. "google_business_profile"
}

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
}

export const PRIORITY_WEIGHTS: Record<TodoPriority, number> = {
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  critical: 1.0,
}

export const STATUS_LABELS: Record<TodoStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  snoozed: "Snoozed",
  reopened: "Reopened",
}

export const ARCHETYPE_LABELS: Record<TodoArchetype, string> = {
  information_request: "Information Request",
  integration: "Integration",
  feedback_request: "Feedback Request",
  vendor_request: "Vendor Request",
  payment: "Payment",
  system_alert: "System Alert",
}
