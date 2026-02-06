interface TipBoxProps {
  text: string
}

export default function TipBox({ text }: TipBoxProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-background-light-blue)",
        border: "1px solid var(--color-primary-blue)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5) var(--space-6)",
        marginBottom: "var(--space-10)",
      }}
    >
      <p
        style={{
          fontSize: "var(--text-base-sm)",
          fontWeight: "var(--font-regular)",
          color: "var(--color-primary-blue)",
          lineHeight: "var(--leading-normal)",
          margin: 0,
        }}
      >
        <span style={{ fontWeight: "var(--font-semibold)" }}>Tip:</span> {text}
      </p>
    </div>
  )
}
