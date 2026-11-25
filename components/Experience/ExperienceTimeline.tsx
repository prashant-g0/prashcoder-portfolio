import { workExperiences } from "@/data/prash/work";
import { achievements, education, professionalDetails } from "@/data/prash/about";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell experience-section">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Building, teaching, and improving.</h2>
      </div>

      <div className="timeline">
        {workExperiences.map((item) => (
          <article className="timeline-entry" key={item.id}>
            <div className="timeline-marker"><span /></div>
            <div className="timeline-period">
              {item.startMonth} {item.startYear} - {item.isCurrent ? "Present" : `${item.endMonth} ${item.endYear}`}
            </div>
            <div className="timeline-copy">
              <p className="timeline-org">{item.orgName} / {item.workType}</p>
              <h3>{item.role}</h3>
              <p>{item.contributions[0]}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="portfolio-detail-grid">
        <div id="about">
          <p className="eyebrow">Education</p>
          <div className="education-list">
            {education.map((item) => (
              <article key={item.id}>
                <span>{item.StartYear}-{item.EndYear}</span>
                <h3>{item.Degree}</h3>
                <p>{item.Institution}</p>
                <small>{item.FieldOfStudy} / {item.Location}</small>
              </article>
            ))}
          </div>
        </div>

        <div id="skills">
          <p className="eyebrow">Technical range</p>
          <div className="skill-columns">
            {Object.entries(professionalDetails.techStack).map(([group, values]) => (
              <div key={group}>
                <h3>{group.replace(/([A-Z])/g, " $1")}</h3>
                <p>{values.join(" / ")}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="achievements">
          <p className="eyebrow">Achievements</p>
          <div className="achievement-list">
            {achievements.map((achievement) => (
              <article key={achievement.id}>
                <span>{achievement.position}</span>
                <h3>{achievement.eventTitle}</h3>
                <p>{achievement.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
