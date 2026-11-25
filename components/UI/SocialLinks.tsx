import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
  FaRegEnvelope,
} from "react-icons/fa";
import { contact } from "@/data/prash/about";

const icons = { FaLinkedin, FaInstagram, FaYoutube, FaWhatsapp, FaRegEnvelope };

export default function SocialLinks({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className={compact ? "social-links compact" : "social-links"}>
      {contact.socialLinks.map((social) => {
        const Icon = icons[social.icon as keyof typeof icons] ?? FaWhatsapp;
        return (
          <div className="social-link-wrap" key={social.label}>
            <Link
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="social-link"
            >
              <Icon size={16} aria-hidden="true" />
            </Link>
            <span className="social-tooltip" role="tooltip">
              {social.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
