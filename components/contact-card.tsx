import { Mail, Phone, Globe, Building2, MapPin } from "lucide-react"

export function ContactCard() {
  return (
    <div
      className="rounded-xl border p-6"
      style={{
        backgroundColor: "var(--color-background-white)",
        borderColor: "var(--color-border-light)",
        boxShadow: "var(--shadow-card-lg)",
      }}
    >
      {/* Avatar + Name */}
      <div className="flex flex-col items-center pb-5">
        <div
          className="mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-background-light-grey)" }}
        >
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Elena&backgroundColor=b6e3f4,c0aede,d1d4f9"
            alt="Elena Rodriguez avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--color-text-dark)" }}
        >
          Elena Rodriguez
        </h2>
        <span
          className="text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Innovate Solutions
        </span>
        <span
          className="mt-1.5 inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: "var(--color-background-light-blue)",
            color: "var(--color-primary-blue)",
          }}
        >
          Discovery
        </span>
      </div>

      {/* Divider */}
      <div
        className="my-4 h-px w-full"
        style={{ backgroundColor: "var(--color-border-divider)" }}
      />

      {/* Last Active / Role */}
      <div className="mb-4 flex justify-between">
        <div>
          <span
            className="block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Last Active:
          </span>
        </div>
        <div className="text-right">
          <span
            className="block text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Last Active
          </span>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <span
          className="text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Role:
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-dark)" }}
        >
          Administrator
        </span>
      </div>

      {/* Divider */}
      <div
        className="my-4 h-px w-full"
        style={{ backgroundColor: "var(--color-border-divider)" }}
      />

      {/* Contact Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Mail size={16} style={{ color: "var(--color-text-muted)" }} />
          <span
            className="text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            elena.r@innovatesolutions.com
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={16} style={{ color: "var(--color-text-muted)" }} />
          <span
            className="text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            +1 (555) 123-4567
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Globe size={16} style={{ color: "var(--color-text-muted)" }} />
          <a
            href="https://www.growbotik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
            style={{ color: "var(--color-primary-blue)" }}
          >
            www.growbotik.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Building2 size={16} style={{ color: "var(--color-text-muted)" }} />
          <span
            className="text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            Innovate Solutions
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin
            size={16}
            className="mt-0.5 flex-shrink-0"
            style={{ color: "var(--color-text-muted)" }}
          />
          <span
            className="text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            123 Innovation Drive, San Francisco, CA 94102
          </span>
        </div>
      </div>
    </div>
  )
}
