import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { prashWorkshops } from "@/data/workshop/details";
import WorkshopBackButton from "@/components/workshop/WorkshopBackButton";

export function generateStaticParams() {
  return prashWorkshops.map((workshop) => ({ slug: workshop.slug }));
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = prashWorkshops.find((item) => item.slug === slug);
  if (!workshop) notFound();

  return (
    <article className="mx-auto w-[calc(100%-40px)] max-w-7xl py-16 sm:py-20">
      <WorkshopBackButton />
      <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-(--primary)">
        Workshop {workshop.number}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
        {workshop.title}
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-7 text-(--muted)">
        {workshop.description}
      </p>

      <div className="workshop-detail-meta">
        <span>{workshop.date}</span>
        <span>{workshop.totalSeats} seats</span>
        <span>{workshop.status}</span>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {workshop.status === "Closed" ? (
          <span className="inline-flex min-h-11 items-center rounded-md border border-(--border) px-4 font-mono text-xs text-(--muted)">
            Workshop closed
          </span>
        ) : null}
        {workshop.registerLink ? (
          <Link
            href={workshop.registerLink}
            target="_blank"
            rel="noreferrer"
            className="workshop-registration-button"
          >
            Registration <ArrowUpRight size={14} />
          </Link>
        ) : null}
      </div>

      {workshop.lessons.length ? (
        <section className="workshop-detail-section">
          <p className="eyebrow">Session modules</p>
          <div className="workshop-lessons">
            {workshop.lessons.map((lesson) => (
              <article key={lesson.module}>
                <span>{String(lesson.module).padStart(2, "0")}</span>
                <h2>{lesson.label}</h2>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="workshop-detail-section">
        <p className="eyebrow">The journey</p>
        <div className="workshop-journey">
          {(
            [
              ["Before", workshop.journey.preSession],
              ["During", workshop.journey.live],
              ["After", workshop.journey.postSession],
            ] as const
          ).map(([title, steps]) => (
            <article key={title}>
              <h2>{title}</h2>
              <ul>
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {workshop.resources.length ? (
        <section className="workshop-detail-section">
          <p className="eyebrow">Resources</p>
          <div className="workshop-resources">
            {workshop.resources.map((resource) => (
              <article key={resource.label}>
                <h2>{resource.label}</h2>
                <p>{resource.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-14 grid gap-px border border-(--border) bg-(--border) md:grid-cols-3">
        {workshop.journey.live.map((step, index) => (
          <section key={step} className="bg-(--surface) p-7">
            <p className="font-mono text-[10px] text-(--primary)">
              0{index + 1}
            </p>
            <h2 className="mt-5 text-xl font-semibold">{step}</h2>
          </section>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <section>
          <p className="font-mono text-[11px] uppercase text-(--muted)">
            Topics
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {workshop.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-(--border) px-3 py-2 font-mono text-[11px]"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
        <section>
          <p className="font-mono text-[11px] uppercase text-(--muted)">FAQ</p>
          <div className="mt-4 divide-y divide-(--border) border-y border-(--border)">
            {workshop.faqs.slice(0, 5).map((faq) => (
              <details key={faq.question} className="py-4">
                <summary className="cursor-pointer text-sm font-medium">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-(--muted)">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
