import { Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Sample content. Replace with real reviews before launch.
const testimonials: Testimonial[] = [
  {
    quote:
      "The technician arrived in the morning window they confirmed and fixed our AC in under an hour. Booking felt effortless.",
    name: "Nusrat J.",
    role: "Customer, Gulshan",
  },
  {
    quote:
      "I could see exactly when someone was coming and paid online afterwards. No haggling at the door.",
    name: "Sabbir H.",
    role: "Customer, Dhanmondi",
  },
  {
    quote:
      "My weekly schedule is finally under control. I only take the day-parts that work for me.",
    name: "Tanvir A.",
    role: "Electrician",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="w-full px-6 py-16 md:px-10 lg:px-20 lg:pb-22 lg:pt-0"
    >
      <h2
        id="testimonials-title"
        className="text-center font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-12"
      >
        Loved by customers and technicians
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map(({ quote, name, role }) => (
          <figure
            key={name}
            className="flex flex-col gap-4.5 rounded-2xl border bg-card p-7"
          >
            <div
              role="img"
              aria-label="5 out of 5 stars"
              className="flex gap-0.5"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explnation>
                  key={index}
                  size={16}
                  aria-hidden="true"
                  className="fill-amber-500 text-amber-500"
                />
              ))}
            </div>

            <blockquote className="flex-1 leading-7">{quote}</blockquote>

            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary"
              >
                {getInitials(name)}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;