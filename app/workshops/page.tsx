import Link from "next/link";
import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { FaGithub } from "react-icons/fa";

const workshopIcons = { FaGitHub: FaGithub };
import TestimonialMarquee from "@/components/workshop/TestimonialMarquee";
import { prashWorkshops } from "@/data/workshop/details";
import Reveal from "@/components/UI/Reveal";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const workshops = prashWorkshops;

export default function WorkshopsPage() {
  return (
    <div
      className={`${archivo.variable} ${mono.variable} min-h-screen bg-[#F6F6F3] font-sans`}
    >
      <section className="w-full px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <Reveal mode="up">
            <div className="max-w-5xl">
              <h1 className="text-4xl font-semibold tracking-tight text-[#16191C] sm:text-5xl lg:text-[56px]">
                Workshops that turn
                <span className="text-[#1F6F5C]"> learning into doing.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#565B60]">
                Practical technical workshops where you learn concepts, work on
                real projects, and actually get your hands dirty.
              </p>
            </div>
          </Reveal>

          {/* Workshop Grid */}
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {workshops.map((workshop, index) => {
              const Icon =
                workshopIcons[workshop.icon as keyof typeof workshopIcons] ??
                FaGithub;
              const isAvailable = workshop.status === "Available";

              return (
                <Reveal
                  key={workshop.number}
                  mode={index % 2 ? "right" : "left"}
                  delay={index * 70}
                >
                  <article
                    key={workshop.number}
                    className="workshop-card group relative overflow-hidden rounded-2xl border border-[#DEDFDA] bg-white p-6 transition duration-200 sm:p-8"
                  >
                    <Link
                      href={`/workshops/${workshop.slug}`}
                      className="workshop-card-main"
                      aria-label={`View ${workshop.title} details`}
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EFEA] text-[#1F6F5C]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 font-mono text-[10px] ${
                              isAvailable
                                ? "bg-[#E4EFEA] text-[#1F6F5C]"
                                : "bg-[#F6F6F3] text-[#7A7F83]"
                            }`}
                          >
                            {workshop.status}
                          </span>

                          <span className="font-mono text-[11px] text-[#7A7F83]">
                            {workshop.number}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-10">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#16191C] sm:text-3xl">
                          {workshop.title}
                        </h2>

                        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#565B60]">
                          {workshop.description}
                        </p>
                      </div>

                      {/* Topics */}
                      <div className="mt-7">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-[#7A7F83]">
                          You&apos;ll work with
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {workshop.topics.map((topic) => (
                            <span
                              key={topic}
                              className="rounded-full bg-[#F6F6F3] px-3 py-1.5 font-mono text-[10px] text-[#565B60]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="workshop-meta-row">
                        <span>
                          <CalendarDays size={13} aria-hidden="true" />{" "}
                          {workshop.date}
                        </span>
                        <span>
                          <Users size={13} aria-hidden="true" />{" "}
                          {workshop.totalSeats} seats
                        </span>
                      </div>
                    </Link>

                    <div className="mt-8 flex flex-wrap gap-3 border-t border-[#DEDFDA] pt-6">
                      <Link
                        href={
                          workshop.registerLink ?? `/workshops/${workshop.slug}`
                        }
                        target={workshop.registerLink ? "_blank" : undefined}
                        rel={
                          workshop.registerLink
                            ? "noreferrer noopener"
                            : undefined
                        }
                        className="workshop-register-button"
                      >
                        Register <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/workshops/${workshop.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-(--border) px-4 font-mono text-[11px] font-medium text-foreground transition hover:border-(--primary) hover:text-(--primary)"
                      >
                        Explore <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Philosophy */}
          <Reveal mode="left">
            <div className="mt-20 border-t border-[#DEDFDA] pt-14 sm:mt-24">
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#1F6F5C]">
                    The idea
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#16191C] sm:text-4xl">
                    Less watching.
                    <br />
                    More doing.
                  </h2>
                </div>

                <div className="max-w-2xl">
                  <p className="text-[15px] leading-7 text-[#565B60]">
                    Workshops are designed around the idea that technical skills
                    become easier to understand when you actually use them.
                    Instead of spending the entire session listening to theory,
                    you&apos;ll work through examples, make mistakes, fix them,
                    and build something along the way.
                  </p>

                  <p className="mt-5 text-[15px] leading-7 text-[#565B60]">
                    The goal isn&apos;t to leave knowing every command or
                    concept. It&apos;s to leave knowing enough to continue
                    learning and building on your own.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialMarquee />
    </div>
  );
}
