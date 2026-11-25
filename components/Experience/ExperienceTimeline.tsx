"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { workExperiences, type WorkExperience } from "@/data/prash/work";
import {
  achievements,
  education,
  professionalDetails,
} from "@/data/prash/about";
import Modal from "@/components/UI/Modal";
import Reveal from "@/components/UI/Reveal";

export default function ExperienceTimeline() {
  const [selected, setSelected] = useState<WorkExperience | null>(null);

  return (
    <section id="experience" className="section-shell experience-section">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Building, teaching, and improving.</h2>
        </div>
      </Reveal>

      <div className="timeline">
        {workExperiences.map((item, index) => (
          <Reveal mode="left" delay={index * 55} key={item.id}>
            <article className="timeline-entry">
              <div className="timeline-marker">
                <span />
              </div>
              <div className="timeline-period">
                {item.startMonth} {item.startYear} -{" "}
                {item.isCurrent
                  ? "Present"
                  : `${item.endMonth} ${item.endYear}`}
              </div>
              <div className="timeline-copy">
                <p className="timeline-org">
                  {item.orgName} / {item.workType}
                </p>
                <h3>{item.role}</h3>
                <p>{item.contributions[0]}</p>
                <button
                  type="button"
                  className="contribution-button"
                  onClick={() => setSelected(item)}
                >
                  View contributions <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="portfolio-detail-grid">
        <Reveal mode="up" className="education-panel">
          <div id="about">
            <p className="eyebrow">Education</p>
            <div className="education-list">
              {education.map((item) => (
                <article key={item.id}>
                  <span className="education-date">
                    {item.StartYear}-{item.EndYear}
                  </span>
                  <div>
                    <h3>{item.Institution}</h3>
                    <p>{item.Degree}</p>
                    <small>
                      {item.FieldOfStudy} / {item.Grade}
                    </small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal mode="up" delay={70} className="skills-panel">
          <div id="skills">
            <p className="eyebrow">Technical range</p>
            <div className="skill-columns">
              {Object.entries(professionalDetails.techStack).map(
                ([group, values], index) => (
                  <Reveal mode="left" delay={index * 45} key={group}>
                    <div className="skill-group">
                      <h3>{group.replace(/([A-Z])/g, " $1")}</h3>
                      <p>{values.join(" / ")}</p>
                    </div>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal mode="up" delay={140} className="achievements-panel">
          <div id="achievements">
            <p className="eyebrow">Achievements</p>
            <div className="achievement-list">
              {achievements.map((achievement, index) => (
                <article
                  className={index === 0 ? "achievement-featured" : ""}
                  key={achievement.id}
                >
                  <span>{achievement.position}</span>
                  <h3>{achievement.eventTitle}</h3>
                  <p>{achievement.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Modal
        open={Boolean(selected)}
        title={
          selected
            ? `${selected.role} at ${selected.orgName}`
            : "Experience details"
        }
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <div className="experience-modal-content">
            <p className="eyebrow">
              {selected.orgName} / {selected.workType}
            </p>
            <h2>{selected.role}</h2>
            <p className="experience-duration">
              {selected.startMonth} {selected.startYear} -{" "}
              {selected.isCurrent
                ? "Present"
                : `${selected.endMonth} ${selected.endYear}`}
            </p>
            <h3>Technologies</h3>
            <div className="modal-tech-list">
              {selected.technologiesUsed.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <h3>Contributions</h3>
            <ol className="experience-contributions">
              {selected.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ol>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
