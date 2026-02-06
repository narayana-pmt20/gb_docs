export function ContactInfoCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold text-card-foreground">
        Contact Information
      </h2>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="text-sm font-medium text-card-foreground">
            Cruz Gallagher
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <a
            href="mailto:koqol@mailinator.com"
            className="text-sm font-medium text-primary hover:underline"
          >
            koqol@mailinator.com
          </a>
        </div>

        {/* Phone */}
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="text-sm font-medium text-card-foreground">
            +1 (794) 132-1076
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-sm text-muted-foreground">Company</p>
          <p className="text-sm font-medium text-card-foreground">
            Martin Moody Co
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          <p className="text-sm font-medium text-card-foreground">
            Alpharetta, GA, USA
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <span className="mt-1 inline-block rounded-md border border-border px-3 py-1 text-xs font-medium text-card-foreground">
            Discovery
          </span>
        </div>
      </div>
    </div>
  )
}
