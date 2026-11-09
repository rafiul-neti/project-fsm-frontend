const stats = [
  { value: "2022", label: "Founded in Dhaka" },
  { value: "850+", label: "Verified technicians" },
  { value: "12,000+", label: "Jobs completed" },
  { value: "4.9 / 5", label: "Average rating" },
];

const Story = () => {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="w-full px-6 py-16 md:px-10 lg:px-0 lg:py-22"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_560px] lg:gap-16">
        <div className="flex flex-col gap-4.5">
          <h2
            id="story-title"
            className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
          >
            Why we started
          </h2>
          <p className="text-lg leading-7 text-muted-foreground">
            Finding a trustworthy plumber, electrician or AC technician used to
            mean phone calls, unclear prices and waiting at home all day. We
            believed it could be as simple as booking a ride.
          </p>
          <p className="text-lg leading-7 text-muted-foreground">
            Today Fieldly reviews every request, matches it with an approved
            technician, and keeps every step visible from the first request to
            the final payment.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse gap-1 rounded-2xl border bg-card p-6 sm:p-7"
            >
              <dt className="text-muted-foreground">{stat.label}</dt>
              <dd className="font-heading text-3xl font-bold tracking-tight text-primary lg:text-[40px] lg:leading-12">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Story;