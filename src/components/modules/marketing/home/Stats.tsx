const stats = [
  { value: "12,000+", label: "Jobs completed" },
  { value: "850+", label: "Verified technicians" },
  { value: "4.9 / 5", label: "Average rating" },
  { value: "30 min", label: "Average response time" },
];

const Stats = () => {
  return (
    <section aria-label="Fieldly in numbers" className="border-y bg-card">
      <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-10 px-6 py-10 md:px-10 lg:grid-cols-4 lg:px-20 lg:py-11">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse items-center gap-1 text-center"
          >
            <dt className="text-sm text-muted-foreground sm:text-base">
              {stat.label}
            </dt>
            <dd className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-[40px] lg:leading-12">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Stats;