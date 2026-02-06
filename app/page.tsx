import Sidebar from "@/components/sidebar"
import TipBox from "@/components/tip-box"
import MetricCard from "@/components/metric-card"
import { Accessibility, Globe, Star, Zap } from "lucide-react"

export default function MarketingGapAnalysisPage() {
  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="flex-1"
        style={{
          backgroundColor: "var(--color-background-white)",
          padding: "var(--space-12) var(--space-16)",
          maxWidth: "var(--content-max-width)",
          overflowY: "auto",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: "var(--text-3xl)",
            fontWeight: "var(--font-bold)",
            color: "var(--color-text-dark)",
            marginTop: "var(--space-8)",
            marginBottom: "var(--space-5)",
          }}
        >
          Marketing Gap Analysis Overview
        </h1>

        {/* Page Description */}
        <p
          style={{
            fontSize: "0.9375rem",
            fontWeight: "var(--font-regular)",
            lineHeight: "var(--leading-relaxed)",
            color: "var(--color-text-muted)",
            marginBottom: "var(--space-12)",
          }}
        >
          This Gap Analysis evaluates your current marketing performance against
          an optimized benchmark. Each section highlights specific opportunities
          for improvement across key local marketing channels. Select a card to
          view detailed insights, including search rankings, local &quot;near
          me&quot; visibility, grid positioning, PPC performance scores, and
          other critical drivers of local demand.
        </p>

        {/* Section Title: Conversion */}
        <h2
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
            marginTop: "var(--space-12)",
            marginBottom: "var(--space-8)",
          }}
        >
          Conversion
        </h2>

        {/* Tip Box */}
        <TipBox text="these metrics focus on converting your existing website visitors into customers. Improving these areas can significantly boost your ROI without increasing traffic costs." />

        {/* Card Grid */}
        <div className="ds-card-grid">
          <MetricCard
            icon={<Accessibility size={22} />}
            iconVariant="green"
            title="Website accessibility"
            description="Website accessibility and compliance"
            score={67}
            maxScore={100}
            progressColor="green"
          />
          <MetricCard
            icon={<Globe size={22} />}
            iconVariant="orange"
            title="Website Conversion"
            description="Your conversion rate and user experience"
            score={25}
            maxScore={100}
            progressColor="orange"
          />
          <MetricCard
            icon={<Star size={22} />}
            iconVariant="pink"
            title="Reviews"
            description="Customer reviews and testimonials"
            score={85}
            maxScore={100}
            progressColor="pink"
          />
          <MetricCard
            icon={<Zap size={22} />}
            iconVariant="orange"
            title="Speed to Lead"
            description="Faster responses can lift Call CR from 24.5% to 33.7% and turn Form CR from 0% to 30.8% - prioritize sub-minute response for all lead channels"
            score={71}
            maxScore={100}
            progressColor="blue"
          />
        </div>
      </main>
    </div>
  )
}
