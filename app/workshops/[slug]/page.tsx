import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { prashWorkshops } from "@/data/workshop/details";

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
      <p className="font-mono text-[11px] uppercase tracking-wider text-[#176b58]">
        Workshop {workshop.number}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
        {workshop.title}
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-7 text-[#686f73]">
        {workshop.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        {workshop.status === "Closed" ? (
          <span className="inline-flex min-h-11 items-center rounded-md border border-[#d8dad4] px-4 font-mono text-xs text-[#686f73]">
            Workshop closed
          </span>
        ) : null}
        {workshop.registerLink ? (
          <Link
            href={workshop.registerLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#176b58] px-5 font-mono text-xs text-white"
          >
            Registration <ArrowUpRight size={14} />
          </Link>
        ) : null}
      </div>

      <div className="mt-14 grid gap-px border border-[#d8dad4] bg-[#d8dad4] md:grid-cols-3">
        {workshop.journey.live.map((step, index) => (
          <section key={step} className="bg-[#f4f4ef] p-7">
            <p className="font-mono text-[10px] text-[#176b58]">0{index + 1}</p>
            <h2 className="mt-5 text-xl font-semibold">{step}</h2>
          </section>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <section>
          <p className="font-mono text-[11px] uppercase text-[#686f73]">
            Topics
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {workshop.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-[#d8dad4] px-3 py-2 font-mono text-[11px]"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>
        <section>
          <p className="font-mono text-[11px] uppercase text-[#686f73]">FAQ</p>
          <div className="mt-4 divide-y divide-[#d8dad4] border-y border-[#d8dad4]">
            {workshop.faqs.slice(0, 3).map((faq) => (
              <details key={faq.question} className="py-4">
                <summary className="cursor-pointer text-sm font-medium">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#686f73]">
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
