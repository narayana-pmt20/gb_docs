"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarBookingProps {
  onBookingComplete: (data: {
    date: string
    time: string
    name: string
    email: string
    questions: string
  }) => void
  name: string
  email: string
}

export default function CalendarBooking({
  onBookingComplete,
  name,
  email,
}: CalendarBookingProps) {
  const [step, setStep] = useState<"calendar" | "details">("calendar")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("2:00pm")
  const [questions, setQuestions] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const timeSlots = [
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
    }

    return days
  }

  const days = renderCalendar()
  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const handleBooking = () => {
    onBookingComplete({
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      name: name,
      email: email,
      questions: questions,
    })
  }

  const dayOfWeek = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  if (step === "calendar") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          padding: "var(--space-6)",
          fontFamily: '"Jost", sans-serif',
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {/* Calendar Section */}
        <div>
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-semibold)",
              marginBottom: "var(--space-4)",
              color: "var(--color-text-dark)",
            }}
          >
            Select a Date & Time
          </h2>

          {/* Month Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--space-4)",
            }}
          >
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                )
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "var(--space-1)",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <span
              style={{
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-medium)",
                color: "var(--color-text-dark)",
              }}
            >
              {monthName}
            </span>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                )
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "var(--space-1)",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
            }}
          >
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: "center",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-text-secondary)",
                  padding: "var(--space-2)",
                }}
              >
                {day}
              </div>
            ))}

            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(day)}
                style={{
                  padding: "var(--space-2)",
                  fontSize: "var(--text-base)",
                  backgroundColor:
                    day && day.toDateString() === selectedDate.toDateString()
                      ? "var(--color-primary-blue)"
                      : day && day.getTime() < new Date().getTime()
                      ? "var(--color-background-light-grey)"
                      : day && (day.getDate() === 11 || day.getDate() === 17)
                      ? "var(--color-background-light-grey)"
                      : "transparent",
                  color:
                    day && day.toDateString() === selectedDate.toDateString()
                      ? "white"
                      : "var(--color-text-dark)",
                  border: "none",
                  cursor: day ? "pointer" : "default",
                  borderRadius: "var(--radius-md)",
                  fontWeight:
                    day && day.toDateString() === selectedDate.toDateString()
                      ? "var(--font-semibold)"
                      : "var(--font-regular)",
                }}
              >
                {day ? day.getDate() : ""}
              </button>
            ))}
          </div>

          {/* Timezone */}
          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            <span style={{ fontSize: "var(--text-base)" }}>🌍</span>
            <select
              style={{
                fontSize: "var(--text-base)",
                padding: "var(--space-2)",
                border: "1px solid var(--color-border-input)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "white",
                cursor: "pointer",
                fontFamily: '"Jost", sans-serif',
              }}
            >
              <option>India Standard Time (3:57pm)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
              <option>Mountain Time (MT)</option>
              <option>Pacific Time (PT)</option>
            </select>
          </div>
        </div>

        {/* Time Slots Section */}
        <div>
          <div
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: "var(--font-semibold)",
              marginBottom: "var(--space-4)",
              color: "var(--color-text-dark)",
            }}
          >
            {dayOfWeek}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "var(--space-2)",
              marginBottom: "var(--space-6)",
            }}
          >
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: "var(--space-3)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-medium)",
                  backgroundColor:
                    selectedTime === time
                      ? "var(--color-primary-blue)"
                      : "transparent",
                  color:
                    selectedTime === time
                      ? "white"
                      : "var(--color-primary-blue)",
                  border: `2px solid var(--color-primary-blue)`,
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontFamily: '"Jost", sans-serif',
                }}
              >
                {time}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep("details")}
            style={{
              width: "100%",
              padding: "var(--space-3)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-semibold)",
              backgroundColor: "var(--color-primary-blue)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontFamily: '"Jost", sans-serif',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Details step
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
        padding: "var(--space-6)",
        fontFamily: '"Jost", sans-serif',
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-6)",
            cursor: "pointer",
          }}
          onClick={() => setStep("calendar")}
        >
          <ChevronLeft size={20} style={{ color: "var(--color-primary-blue)" }} />
          <span
            style={{
              color: "var(--color-primary-blue)",
              fontWeight: "var(--font-medium)",
            }}
          >
            Back
          </span>
        </div>

        <h2
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--font-semibold)",
            marginBottom: "var(--space-6)",
            color: "var(--color-text-dark)",
          }}
        >
          Enter Details
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleBooking()
          }}
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-medium)",
                marginBottom: "var(--space-2)",
                color: "var(--color-text-secondary)",
              }}
            >
              Name
            </label>
            <div
              style={{
                padding: "var(--space-3)",
                fontSize: "var(--text-base)",
                backgroundColor: "var(--color-background-light-grey)",
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-dark)",
              }}
            >
              {name}
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-medium)",
                marginBottom: "var(--space-2)",
                color: "var(--color-text-secondary)",
              }}
            >
              Email
            </label>
            <div
              style={{
                padding: "var(--space-3)",
                fontSize: "var(--text-base)",
                backgroundColor: "var(--color-background-light-grey)",
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-dark)",
              }}
            >
              {email}
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-medium)",
                marginBottom: "var(--space-2)",
                color: "var(--color-text-dark)",
              }}
            >
              Questions (Optional)
            </label>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="Enter any questions you have for the support team..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "var(--space-3)",
                fontSize: "var(--text-base)",
                border: "1px solid var(--color-border-input)",
                borderRadius: "var(--radius-md)",
                fontFamily: '"Jost", sans-serif',
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              marginTop: "var(--space-2)",
            }}
          >
            By proceeding, you confirm that you have read and agree to{" "}
            <a
              href="#"
              style={{
                color: "var(--color-primary-blue)",
                textDecoration: "none",
              }}
            >
              Calendly's Terms of Use
            </a>{" "}
            and{" "}
            <a
              href="#"
              style={{
                color: "var(--color-primary-blue)",
                textDecoration: "none",
              }}
            >
              Privacy Notice
            </a>
            .
          </div>

          {/* Appointment Summary */}
          <div
            style={{
              backgroundColor: "var(--color-background-light-grey)",
              padding: "var(--space-4)",
              borderRadius: "var(--radius-md)",
              marginTop: "var(--space-4)",
            }}
          >
            <div
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              <div style={{ marginBottom: "var(--space-2)" }}>
                <strong>📅 {formattedDate}</strong>
              </div>
              <div>
                <strong>🕐 {selectedTime}</strong>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-3) var(--space-6)",
              fontSize: "var(--text-base-sm)",
              fontWeight: "var(--font-semibold)",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              backgroundColor: "var(--color-primary-blue)",
              color: "white",
              marginTop: "var(--space-4)",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
