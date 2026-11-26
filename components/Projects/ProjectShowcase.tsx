"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { projects, type Projects } from "@/data/prash/projects";
import { getLatestProjects } from "@/data/prash/selectors";
import Modal from "@/components/UI/Modal";
import Reveal from "@/components/UI/Reveal";

export default function ProjectShowcase({
  preview = false,
}: {
  preview?: boolean;
}) {
  const source = preview
    ? getLatestProjects(projects)
    : [...projects].sort((a, b) => b.id - a.id);
  const [selected, setSelected] = useState<Projects | null>(null);

  if (!source.length) return null;
  const featured = source[0];
  const remaining = source.slice(1);

  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Projects with a point of view.</h2>
          <p>
            From secure messaging and URL tooling to applied machine learning.
          </p>
        </div>
      </Reveal>

      <Reveal mode="left">
        <article className="featured-project project-open">
          <span className="featured-project-image">
            {featured.links.media ? (
              <Image
                src={featured.links.media}
                alt={`${featured.title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            ) : null}
            <span className="project-year">{featured.year}</span>
          </span>
          <span className="featured-project-content">
            <span className="project-role">{featured.role}</span>
            {featured.isCurrent ? (
              <span className="active-status">
                <i /> Actively Working
              </span>
            ) : null}
            <span className="featured-project-title">{featured.title}</span>
            <span className="project-description">{featured.description}</span>
            <span className="technology-list">
              {featured.technologiesUsed.slice(0, 7).map((technology) => (
                <i key={technology}>{technology}</i>
              ))}
            </span>
            <div className="project-link-row">
              <button
                type="button"
                className="project-explore project-detail-link"
                onClick={() => setSelected(featured)}
              >
                Explore project <ArrowUpRight size={15} />
              </button>
              {featured.links.live ? (
                <Link
                  href={featured.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="project-explore"
                >
                  Live <ArrowUpRight size={15} />
                </Link>
              ) : null}
              {featured.links.github ? (
                <Link
                  href={featured.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-explore"
                >
                  <FaGithub size={15} /> GitHub
                </Link>
              ) : null}
            </div>
          </span>
        </article>
      </Reveal>

      {remaining.length ? (
        <div className="project-grid">
          {remaining.map((project, index) => (
            <Reveal
              mode={index % 2 ? "right" : "left"}
              delay={index * 70}
              key={project.id}
            >
              <article className="project-entry project-open">
                <span className="project-entry-image">
                  {project.links.media ? (
                    <Image
                      src={project.links.media}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : null}
                </span>
                <span className="project-entry-body">
                  <span className="project-meta">
                    <span>{project.role}</span>
                    <span>{project.year}</span>
                  </span>
                  {project.isCurrent ? (
                    <span className="active-status">
                      <i /> Actively Working
                    </span>
                  ) : null}
                  <span className="project-entry-title">{project.title}</span>
                  <span className="project-entry-description">
                    {project.description}
                  </span>
                  <div className="project-link-row">
                    <button
                      type="button"
                      className="project-explore project-detail-link"
                      onClick={() => setSelected(project)}
                    >
                      Explore <ArrowUpRight size={14} />
                    </button>
                    {project.links.live ? (
                      <Link
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="project-explore"
                      >
                        Live <ArrowUpRight size={14} />
                      </Link>
                    ) : null}
                    {project.links.github ? (
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-explore"
                      >
                        <FaGithub size={14} /> GitHub
                      </Link>
                    ) : null}
                  </div>
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      ) : null}

      {preview ? (
        <div className="section-end-link">
          <Link href="/projects">
            View all projects <ArrowUpRight size={16} />
          </Link>
        </div>
      ) : null}

      <Modal
        open={Boolean(selected)}
        title={selected?.title ?? "Project details"}
        onClose={() => setSelected(null)}
        className="project-modal"
      >
        {selected ? (
          <div className="modal-project-layout">
            {selected.links.media ? (
              <div className="modal-project-image">
                <Image
                  src={selected.links.media}
                  alt={`${selected.title} preview`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="modal-project-copy">
              <p className="eyebrow">
                {selected.role} / {selected.year}
              </p>
              {selected.isCurrent ? (
                <p className="active-status">
                  <i /> Actively Working
                </p>
              ) : null}
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <h3>Technologies</h3>
              <ul className="modal-tech-list">
                {selected.technologiesUsed.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              {selected.contributions.length ? (
                <>
                  <h3>What it does</h3>
                  <ul className="modal-contributions">
                    {selected.contributions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <div className="project-actions">
                {selected.links.live ? (
                  <Link
                    href={selected.links.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live project <ArrowUpRight size={15} />
                  </Link>
                ) : null}
                {selected.links.github ? (
                  <Link
                    href={selected.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={15} /> Source code
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
