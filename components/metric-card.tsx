import type { ReactNode } from "react"

type ColorVariant = "green" | "orange" | "pink" | "blue"

interface MetricCardProps {
  icon: ReactNode
  iconVariant: ColorVariant
  title: string
  description: string
  score: number
  maxScore: number
  progressColor: ColorVariant
}

const iconBgMap: Record<ColorVariant, string> = {
  green: "var(--color-background-light-green-alt)",
  orange: "var(--color-background-light-orange)",
  pink: "var(--color-background-light-pink)",
  blue: "var(--color-background-light-blue)",
}

const iconColorMap: Record<ColorVariant, string> = {
  green: "var(--color-accent-green)",
  orange: "var(--color-accent-orange)",
  pink: "var(--color-accent-pink)",
  blue: "var(--color-accent-blue)",
}

const progressColorMap: Record<ColorVariant, string> = {
  green: "var(--color-accent-green)",
  orange: "var(--color-accent-orange)",
  pink: "var(--color-accent-pink)",
  blue: "var(--color-accent-blue)",
}

export default function MetricCard({
  icon,
  iconVariant,
  title,
  description,
  score,
  maxScore,
  progressColor,
}: MetricCardProps) {
  const percentage = (score / maxScore) * 100

  return (
    <div
      style={{
        backgroundColor: "var(--color-background-white)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card-lg)",
        padding: "var(--space-8)",
        position: "relative",
      }}
    >
      {/* Header: icon + score */}
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: "var(--space-5)" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "var(--icon-circle-size)",
            height: "var(--icon-circle-size)",
            borderRadius: "var(--radius-full)",
            backgroundColor: iconBgMap[iconVariant],
            color: iconColorMap[iconVariant],
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
          }}
        >
          {score} / {maxScore}
        </span>
      </div>

      {/* Content */}
      <div style={{ marginTop: "var(--space-5)" }}>
        <h3
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
            marginBottom: "var(--space-1)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            fontWeight: "var(--font-regular)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-normal)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "var(--progress-bar-height)",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--color-background-light-grey)",
          overflow: "hidden",
          marginTop: "var(--space-5)",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "var(--radius-sm)",
            backgroundColor: progressColorMap[progressColor],
            width: `${percentage}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  )
}
