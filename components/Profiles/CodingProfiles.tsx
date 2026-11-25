import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaHackerrank } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef } from "react-icons/si";
import { professionalDetails } from "@/data/prash/about";

const icons = { FaGithub, FaHackerrank, SiLeetcode, SiGeeksforgeeks, SiCodechef };

export default function CodingProfiles({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`coding-profiles ${compact ? "coding-profiles-compact" : ""}`} aria-label="Coding profiles">
      <p className="eyebrow">Coding profiles</p>
      <div className="coding-profile-row">
        {professionalDetails.codingProfiles.map((profile) => {
          const Icon = icons[profile.icon as keyof typeof icons];
          return (
            <Link key={profile.label} href={profile.href} target="_blank" rel="noreferrer noopener" aria-label={`Visit ${profile.label} profile`} className="coding-profile-link">
              {Icon ? <Icon size={16} aria-hidden="true" /> : null}
              <span>{profile.label}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
