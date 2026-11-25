import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { projects } from "@/data/prash/projects";

export default function ProjectShowcase() {
  const featured = projects.find((project) => project.isCurrent) ?? projects[0];
  const remaining = projects.filter((project) => project.id !== featured.id);

  return (
    <section id="projects" className="section-shell">
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Projects with a point of view.</h2>
        <p>From secure messaging and URL tooling to applied machine learning.</p>
      </div>

      <article className="featured-project">
        <div className="featured-project-image">
          {featured.links.media ? (
            <Image src={featured.links.media} alt={`${featured.title} preview`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
          ) : null}
          <span className="project-year">{featured.year}</span>
        </div>
        <div className="featured-project-content">
          <p className="project-role">{featured.role}</p>
          <h3>{featured.title}</h3>
          <p className="project-description">{featured.description}</p>
          <ul className="technology-list">
            {featured.technologiesUsed.slice(0, 7).map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="project-actions">
            {featured.links.live ? <Link href={featured.links.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={15} /></Link> : null}
            {featured.links.github ? <Link href={featured.links.github} target="_blank" rel="noreferrer"><GitBranch size={15} /> Source</Link> : null}
          </div>
        </div>
      </article>

      <div className="project-grid">
        {remaining.map((project) => (
          <article className="project-entry" key={project.id}>
            <div className="project-entry-image">
              {project.links.media ? <Image src={project.links.media} alt={`${project.title} preview`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" /> : null}
            </div>
            <div className="project-entry-body">
              <div className="project-meta"><span>{project.role}</span><span>{project.year}</span></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions compact">
                {project.links.live ? <Link href={project.links.live} target="_blank" rel="noreferrer">View <ArrowUpRight size={14} /></Link> : null}
                {project.links.github ? <Link href={project.links.github} target="_blank" rel="noreferrer">Code <GitBranch size={14} /></Link> : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
