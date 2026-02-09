"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Paperclip,
  FileText,
  CheckCircle2,
  User,
} from "lucide-react"
import type { ChatMessage } from "@/lib/todo-types"

interface TodoChatThreadProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  onApprove: () => void
  todoTitle: string
}

function formatChatTime(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function SenderAvatar({ sender, senderName }: { sender: ChatMessage["sender"]; senderName: string }) {
  const initial = senderName.charAt(0).toUpperCase()
  const isVendor = sender === "vendor"

  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "var(--radius-full)",
        backgroundColor: isVendor
          ? "var(--color-background-light-blue)"
          : "var(--color-background-light-green-alt)",
        color: isVendor
          ? "var(--color-accent-blue)"
          : "var(--color-accent-green)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-semibold)",
      }}
    >
      {sender === "business" ? <User size={14} /> : initial}
    </div>
  )
}

function ChatBubble({ msg, isOwn }: { msg: ChatMessage; isOwn: boolean }) {
  return (
    <div
      className="flex"
      style={{
        gap: "var(--space-3)",
        flexDirection: isOwn ? "row-reverse" : "row",
        alignItems: "flex-start",
      }}
    >
      <SenderAvatar sender={msg.sender} senderName={msg.senderName} />
      <div
        style={{
          maxWidth: "85%",
          display: "flex",
          flexDirection: "column",
          alignItems: isOwn ? "flex-end" : "flex-start",
          gap: "var(--space-1)",
        }}
      >
        {/* Name + timestamp */}
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            flexDirection: isOwn ? "row-reverse" : "row",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-semibold)",
              color: "var(--color-text-dark)",
            }}
          >
            {isOwn ? "You" : msg.senderName}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--color-text-secondary)",
            }}
          >
            {formatChatTime(msg.timestamp)}
          </span>
        </div>

        {/* Message body */}
        <div
          style={{
            padding: "var(--space-3) var(--space-4)",
            borderRadius: isOwn
              ? "var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)"
              : "var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)",
            backgroundColor: isOwn
              ? "var(--color-primary-blue)"
              : "var(--color-background-light-grey)",
            color: isOwn ? "var(--color-white)" : "var(--color-text-dark)",
            fontSize: "var(--text-base-sm)",
            lineHeight: "var(--leading-relaxed)",
            whiteSpace: "pre-wrap",
          }}
        >
          {msg.message}
        </div>

        {/* Attachments */}
        {msg.attachments && msg.attachments.length > 0 && (
          <div className="flex flex-col" style={{ gap: "var(--space-1)", marginTop: "2px" }}>
            {msg.attachments.map((file) => (
              <div
                key={file}
                className="flex items-center"
                style={{
                  gap: "var(--space-2)",
                  padding: "var(--space-2) var(--space-3)",
                  backgroundColor: isOwn
                    ? "rgba(255,255,255,0.15)"
                    : "var(--color-background-white)",
                  borderRadius: "var(--radius-md)",
                  border: isOwn ? "none" : "1px solid var(--color-border-divider)",
                  cursor: "pointer",
                }}
              >
                <FileText
                  size={14}
                  style={{
                    color: isOwn ? "var(--color-white)" : "var(--color-primary-blue)",
                  }}
                />
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    color: isOwn ? "var(--color-white)" : "var(--color-primary-blue)",
                    textDecoration: "underline",
                  }}
                >
                  {file}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TodoChatThread({
  messages,
  onSendMessage,
  onApprove,
  todoTitle,
}: TodoChatThreadProps) {
  const [inputValue, setInputValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    onSendMessage(trimmed)
    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="flex flex-col"
      style={{
        border: "1px solid var(--color-border-divider)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        marginBottom: "var(--space-6)",
      }}
    >
      {/* Thread header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "var(--space-3) var(--space-4)",
          backgroundColor: "var(--color-background-light-grey)",
          borderBottom: "1px solid var(--color-border-divider)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-semibold)",
            color: "var(--color-text-dark)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Conversation
        </span>
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-secondary)",
          }}
        >
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex flex-col"
        style={{
          gap: "var(--space-5)",
          padding: "var(--space-5)",
          maxHeight: "360px",
          overflowY: "auto",
          backgroundColor: "var(--color-background-white)",
        }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} msg={msg} isOwn={msg.sender === "business"} />
        ))}
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "var(--space-3) var(--space-4)",
          borderTop: "1px solid var(--color-border-divider)",
          backgroundColor: "var(--color-background-light-grey)",
        }}
      >
        <div
          className="flex items-end"
          style={{ gap: "var(--space-2)" }}
        >
          <button
            type="button"
            aria-label="Attach file"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              padding: "var(--space-2)",
              borderRadius: "var(--radius-md)",
              flexShrink: 0,
            }}
          >
            <Paperclip size={18} />
          </button>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply..."
            rows={1}
            style={{
              flex: 1,
              padding: "var(--space-2) var(--space-3)",
              fontSize: "var(--text-base-sm)",
              fontFamily: "inherit",
              color: "var(--color-text-dark)",
              backgroundColor: "var(--color-background-white)",
              border: "1px solid var(--color-border-input)",
              borderRadius: "var(--radius-md)",
              resize: "none",
              minHeight: "38px",
              maxHeight: "100px",
              lineHeight: "var(--leading-normal)",
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label="Send message"
            style={{
              background: "none",
              border: "none",
              cursor: inputValue.trim() ? "pointer" : "default",
              color: inputValue.trim()
                ? "var(--color-primary-blue)"
                : "var(--color-text-secondary)",
              display: "flex",
              alignItems: "center",
              padding: "var(--space-2)",
              borderRadius: "var(--radius-md)",
              flexShrink: 0,
              opacity: inputValue.trim() ? 1 : 0.5,
            }}
          >
            <Send size={18} />
          </button>
        </div>
        <div
          style={{
            marginTop: "var(--space-2)",
            fontSize: "11px",
            color: "var(--color-text-secondary)",
            paddingLeft: "var(--space-10)",
          }}
        >
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>

      {/* Approve action */}
      <div
        className="flex items-center"
        style={{
          padding: "var(--space-3) var(--space-4)",
          borderTop: "1px solid var(--color-border-divider)",
          backgroundColor: "var(--color-background-white)",
          gap: "var(--space-3)",
        }}
      >
        <button
          type="button"
          onClick={onApprove}
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
          Approve & Complete
        </button>
      </div>
    </div>
  )
}
