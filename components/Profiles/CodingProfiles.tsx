"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaHackerrank } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef } from "react-icons/si";
import { useEffect, useState } from "react";
import { professionalDetails } from "@/data/prash/about";
import { fetchDesktopCodingMetrics, type CodingMetricsResult, type CodingProfileMetrics } from "./codingMetrics";

const icons = { FaGithub, FaHackerrank, SiLeetcode, SiGeeksforgeeks, SiCodechef };

function platformKey(label: string): string {
  if (label.toLowerCase() === "geeksforgeeks") return "geeksforgeeks";
  if (label.toLowerCase() === "leetcode") return "leetcode";
  if (label.toLowerCase() === "codechef") return "codechef";
  if (label.toLowerCase() === "hackerrank") return "hackerrank";
  return "github";
}

function MetricValue({ label, value }: { label: string; value: number | string | undefined }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <span>
      <strong>{value}</strong> {label}
    </span>
  );
}

function MetricPanel({ label, metrics }: { label: string; metrics: CodingMetricsResult | null }) {
  const key = platformKey(label);

  if (key === "github") {
    const github = metrics?.github;
    if (!github) return null;
    return (
      <div className="coding-metric-panel" role="tooltip">
        {github.name && <strong className="coding-metric-name">{github.name}</strong>}
        <div className="coding-metric-values">
          <MetricValue label="repos" value={github.publicRepos} />
          <MetricValue label="followers" value={github.followers} />
          <MetricValue label="following" value={github.following} />
        </div>
      </div>
    );
  }

  const profile = metrics?.profiles[key];
  if (!profile) return null;
  return <ProfileMetrics label={label} profile={profile} />;
}

function ProfileMetrics({ label, profile }: { label: string; profile: CodingProfileMetrics }) {
  const key = platformKey(label);
  const badges = Array.isArray(profile.badges) ? profile.badges.length : profile.badges;

  return (
    <div className="coding-metric-panel" role="tooltip">
      <strong className="coding-metric-name">{label} live stats</strong>
      <div className="coding-metric-values">
        <MetricValue label="solved" value={profile.totalSolved} />
        {key !== "hackerrank" && <MetricValue label="easy" value={profile.easySolved} />}
        {key !== "hackerrank" && <MetricValue label="medium" value={profile.mediumSolved} />}
        {key !== "hackerrank" && <MetricValue label="hard" value={profile.hardSolved} />}
        {(key === "leetcode" || key === "codechef") && <MetricValue label="rating" value={profile.maxRating} />}
        {(key === "leetcode" || key === "codechef") && <MetricValue label="contests" value={profile.contestsParticipated} />}
        {key === "codechef" && <MetricValue label="stars" value={profile.stars} />}
        {key === "hackerrank" && <MetricValue label="badges" value={typeof badges === "number" ? badges : undefined} />}
      </div>
    </div>
  );
}

export default function CodingProfiles({ compact = false }: { compact?: boolean }) {
  const [metrics, setMetrics] = useState<CodingMetricsResult | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setDesktop(media.matches);
      if (media.matches) {
        fetchDesktopCodingMetrics().then(setMetrics);
      }
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section className={`coding-profiles ${compact ? "coding-profiles-compact" : ""}`} aria-label="Coding profiles">
      <p className="eyebrow">Coding profiles</p>
      <div className="coding-profile-row">
        {professionalDetails.codingProfiles.map((profile) => {
          const Icon = icons[profile.icon as keyof typeof icons];
          return (
            <div className="coding-profile-item" key={profile.label}>
              <Link
                href={profile.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit ${profile.label} profile`}
                className="coding-profile-link"
              >
                {Icon ? <Icon size={16} aria-hidden="true" /> : null}
                <span>{profile.label}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              {desktop && metrics && <MetricPanel label={profile.label} metrics={metrics} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
