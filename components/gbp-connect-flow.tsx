"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Star,
  ArrowRight,
  Loader2,
} from "lucide-react"

type FlowStep = "intro" | "signing_in" | "select_profile" | "confirming" | "connected"

interface GbpProfile {
  name: string
  address: string
  rating: number
  reviewCount: number
  verified: boolean
}

const mockProfiles: GbpProfile[] = [
  {
    name: "John's Plumbing Services",
    address: "123 Main St, San Francisco, CA 94102",
    rating: 4.6,
    reviewCount: 87,
    verified: true,
  },
  {
    name: "JD Plumbing & Heating",
    address: "456 Oak Ave, San Francisco, CA 94110",
    rating: 4.2,
    reviewCount: 23,
    verified: false,
  },
]

export default function GbpConnectFlow({
  onConnected,
}: {
  onConnected: () => void
}) {
  const [step, setStep] = useState<FlowStep>("intro")
  const [selectedProfile, setSelectedProfile] = useState<GbpProfile | null>(
    null
  )

  const handleSignIn = () => {
    setStep("signing_in")
    // Simulate Google OAuth delay
    setTimeout(() => {
      setStep("select_profile")
    }, 2000)
  }

  const handleSelectProfile = (profile: GbpProfile) => {
    setSelectedProfile(profile)
  }

  const handleConfirm = () => {
    setStep("confirming")
    setTimeout(() => {
      setStep("connected")
    }, 1500)
  }

  // Step 1: Intro
  if (step === "intro") {
    return (
      <div style={{ marginBottom: "var(--space-6)" }}>
        {/* What you get section */}
        <div
          style={{
            backgroundColor: "var(--color-background-light-grey)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-5)",
            marginBottom: "var(--space-6)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-base-sm)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-text-dark)",
              marginBottom: "var(--space-4)",
            }}
          >
            By connecting your Google Business Profile, we will:
          </p>
          <div
            className="flex flex-col"
            style={{ gap: "var(--space-3)" }}
          >
            {[
              "Manage your business listing and keep it up to date",
              "Respond to customer reviews on your behalf",
              "Track your local search rankings and visibility",
              "Optimize your profile for better local search results",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start"
                style={{ gap: "var(--space-3)" }}
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0"
                  style={{
                    color: "var(--color-accent-green)",
                    marginTop: "2px",
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-base-sm)",
                    color: "var(--color-text-muted)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connect button */}
        <button
          type="button"
          onClick={handleSignIn}
          className="flex items-center justify-center"
          style={{
            width: "100%",
            gap: "var(--space-3)",
            padding: "var(--space-4) var(--space-6)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-medium)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-input)",
            cursor: "pointer",
            fontFamily: "inherit",
            backgroundColor: "var(--color-background-white)",
            color: "var(--color-text-dark)",
            transition: "background-color 0.15s ease, border-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--color-background-light-grey)"
            e.currentTarget.style.borderColor = "var(--color-text-muted)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--color-background-white)"
            e.currentTarget.style.borderColor = "var(--color-border-input)"
          }}
        >
          {/* Google "G" icon */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google to connect your GBP
          <ExternalLink size={16} style={{ color: "var(--color-text-muted)" }} />
        </button>

        <p
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-secondary)",
            marginTop: "var(--space-3)",
            lineHeight: "var(--leading-normal)",
            textAlign: "center",
          }}
        >
          <ShieldCheck
            size={12}
            style={{
              display: "inline",
              verticalAlign: "middle",
              marginRight: "4px",
              color: "var(--color-accent-green)",
            }}
          />
          We only request read and management access. Your credentials are never stored.
        </p>
      </div>
    )
  }

  // Step 2: Signing in (loading)
  if (step === "signing_in") {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{
          padding: "var(--space-12) var(--space-6)",
          gap: "var(--space-4)",
        }}
      >
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "var(--color-primary-blue)" }}
        />
        <p
          style={{
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-medium)",
            color: "var(--color-text-dark)",
          }}
        >
          Connecting to Google...
        </p>
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          A sign-in window will open shortly
        </p>
      </div>
    )
  }

  // Step 3: Select profile
  if (step === "select_profile") {
    return (
      <div style={{ marginBottom: "var(--space-6)" }}>
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
            marginBottom: "var(--space-4)",
          }}
        >
          We found the following profiles linked to your Google account. Select the one you want to connect:
        </p>

        <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
          {mockProfiles.map((profile) => {
            const isSelected = selectedProfile?.name === profile.name
            return (
              <button
                key={profile.name}
                type="button"
                onClick={() => handleSelectProfile(profile)}
                className="flex items-start"
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "var(--space-5)",
                  borderRadius: "var(--radius-lg)",
                  border: isSelected
                    ? "2px solid var(--color-primary-blue)"
                    : "1px solid var(--color-border-light)",
                  backgroundColor: isSelected
                    ? "var(--color-background-light-blue)"
                    : "var(--color-background-white)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  gap: "var(--space-4)",
                  transition:
                    "border-color 0.15s ease, background-color 0.15s ease",
                }}
              >
                {/* Map pin icon */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: isSelected
                      ? "var(--color-primary-blue)"
                      : "var(--color-background-light-grey)",
                  }}
                >
                  <MapPin
                    size={18}
                    style={{
                      color: isSelected
                        ? "var(--color-white)"
                        : "var(--color-text-muted)",
                    }}
                  />
                </div>

                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div
                    className="flex items-center"
                    style={{
                      gap: "var(--space-2)",
                      marginBottom: "var(--space-1)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: "var(--font-semibold)",
                        color: "var(--color-text-dark)",
                      }}
                    >
                      {profile.name}
                    </span>
                    {profile.verified && (
                      <ShieldCheck
                        size={14}
                        style={{ color: "var(--color-primary-blue)" }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--color-text-muted)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {profile.address}
                  </p>
                  <div
                    className="flex items-center"
                    style={{ gap: "var(--space-3)" }}
                  >
                    <span
                      className="flex items-center"
                      style={{
                        gap: "4px",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-accent-orange)",
                        fontWeight: "var(--font-medium)",
                      }}
                    >
                      <Star size={12} fill="currentColor" />
                      {profile.rating}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {profile.reviewCount} reviews
                    </span>
                  </div>
                </div>

                {/* Selection indicator */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "var(--radius-full)",
                    border: isSelected
                      ? "2px solid var(--color-primary-blue)"
                      : "2px solid var(--color-border-input)",
                    backgroundColor: isSelected
                      ? "var(--color-primary-blue)"
                      : "transparent",
                    marginTop: "var(--space-2)",
                  }}
                >
                  {isSelected && (
                    <CheckCircle2 size={14} style={{ color: "var(--color-white)" }} />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Confirm button */}
        {selectedProfile && (
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center justify-center"
            style={{
              width: "100%",
              marginTop: "var(--space-6)",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-6)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-medium)",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              backgroundColor: "var(--color-primary-blue)",
              color: "var(--color-white)",
            }}
          >
            Connect this profile
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    )
  }

  // Step 4: Confirming (loading)
  if (step === "confirming") {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{
          padding: "var(--space-12) var(--space-6)",
          gap: "var(--space-4)",
        }}
      >
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "var(--color-primary-blue)" }}
        />
        <p
          style={{
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-medium)",
            color: "var(--color-text-dark)",
          }}
        >
          Connecting your profile...
        </p>
        <p
          style={{
            fontSize: "var(--text-base-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          Setting up access permissions
        </p>
      </div>
    )
  }

  // Step 5: Connected (success)
  return (
    <div
      className="flex flex-col items-center"
      style={{
        padding: "var(--space-8) var(--space-6)",
        gap: "var(--space-4)",
        textAlign: "center",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-background-light-green-alt)",
        }}
      >
        <CheckCircle2
          size={28}
          style={{ color: "var(--color-accent-green)" }}
        />
      </div>
      <p
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: "var(--font-semibold)",
          color: "var(--color-text-dark)",
        }}
      >
        Successfully connected!
      </p>
      <p
        style={{
          fontSize: "var(--text-base-sm)",
          color: "var(--color-text-muted)",
          lineHeight: "var(--leading-relaxed)",
        }}
      >
        <strong style={{ color: "var(--color-text-dark)" }}>
          {selectedProfile?.name}
        </strong>{" "}
        is now linked to your Growbotik account. We will begin optimizing your
        local listing shortly.
      </p>
      <button
        type="button"
        onClick={onConnected}
        className="flex items-center justify-center"
        style={{
          marginTop: "var(--space-4)",
          gap: "var(--space-2)",
          padding: "var(--space-3) var(--space-8)",
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
        Done
      </button>
    </div>
  )
}
