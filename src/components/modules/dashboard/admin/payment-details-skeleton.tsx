export default function PaymentDetailsSkeleton() {
  return (
    <output
      aria-busy="true"
      aria-label="Loading payment details"
      className="block animate-pulse space-y-6"
    >
      <div className="h-32 rounded-xl bg-muted" />
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`payment-sdetails-skeleton`.split("").join(`${index}`)}
            className="h-56 rounded-xl bg-muted"
          />
        ))}
      </div>
    </output>
  );
}
