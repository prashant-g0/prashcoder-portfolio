"use client";

import Link from "next/link";
import { useState } from "react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  Download,
  FileText,
  MapPin,
} from "lucide-react";
import { contact } from "@/data/prash/about";
import SocialLinks from "@/components/UI/SocialLinks";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sans",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/workshops", label: "Workshops" },
];

export default function Footer() {
  const [cardStarted, setCardStarted] = useState(false);
  const [resumeStarted, setResumeStarted] = useState(false);

  const downloadCard = () => {
    setCardStarted(true);
    window.setTimeout(() => setCardStarted(false), 1800);
  };

  const resumeId = contact.resumeLink.match(/\/d\/([^/]+)/)?.[1];
  const resumeDownloadLink = resumeId
    ? `https://drive.google.com/uc?export=download&id=${resumeId}`
    : contact.resumeLink;
  const resumePreviewLink = resumeId
    ? `https://drive.google.com/file/d/${resumeId}/preview`
    : contact.resumeLink;
  const mapPreviewLink = `https://www.openstreetmap.org/export/embed.html?bbox=${contact.location.coordinates.lng - 0.04}%2C${contact.location.coordinates.lat - 0.025}%2C${contact.location.coordinates.lng + 0.04}%2C${contact.location.coordinates.lat + 0.025}&layer=mapnik&marker=${contact.location.coordinates.lat}%2C${contact.location.coordinates.lng}`;
  const mapsUrl = `https://www.google.com/maps?q=${contact.location.coordinates.lat},${contact.location.coordinates.lng}`;

  const openAndDownloadResume = () => {
    setResumeStarted(true);
    window.open(contact.resumeLink, "_blank", "noopener,noreferrer");
    const link = document.createElement("a");
    link.href = resumeDownloadLink;
    link.download = "Prashant-Gupta-Resume";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => setResumeStarted(false), 1800);
  };

  return (
    <footer className={`${archivo.variable} ${mono.variable} footer-shell`}>
      <div className="footer-inner">
        <section className="footer-cta-zone" aria-label="Closing actions">
          <div className="footer-closing">
            <p className="eyebrow">Stay in the loop</p>
            <h2>Have something worth building?</h2>
            <p>
              Explore the work, take a closer look at the code, or start a
              conversation.
            </p>
          </div>

          <div className="footer-actions">
            <div className="footer-card-action-wrap">
              <a
                href="/user/personal/card.png"
                download="Prashant-Gupta-Card.png"
                onClick={downloadCard}
                className={`footer-card-action ${cardStarted ? "is-downloading" : ""}`}
                aria-label="Download Prashant Gupta's personal card"
              >
                <span className="footer-card-thumbnail" aria-hidden="true">
                  <span />
                </span>
                <span className="footer-action-copy">
                  <small>{cardStarted ? "Collected" : "Personal card"}</small>
                  <strong>Get My Card</strong>
                </span>
                <Download size={18} aria-hidden="true" />
              </a>
              <div className="footer-card-preview" aria-hidden="true">
                <Image
                  src="/user/personal/card.png"
                  alt=""
                  width={180}
                  height={270}
                />
              </div>
            </div>

            <div className="footer-resume-action-wrap">
              <button
                type="button"
                onClick={openAndDownloadResume}
                className={`footer-resume-action ${resumeStarted ? "is-opening" : ""}`}
                aria-label="Open and download Prashant Gupta's resume"
              >
                <span className="footer-resume-icon" aria-hidden="true">
                  <FileText size={20} />
                </span>
                <span className="footer-action-copy">
                  <small>
                    {resumeStarted ? "Opening & saving" : "Current resume"}
                  </small>
                  <strong>Get My Resume</strong>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <div
                className="footer-resume-preview"
                aria-label="Resume preview"
              >
                <iframe
                  src={resumePreviewLink}
                  title="Resume preview"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="footer-location-action-wrap">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="footer-location-action"
              >
                <span className="footer-location-icon">
                  <MapPin size={20} />
                </span>
                <span className="footer-action-copy">
                  <small>
                    {contact.location.city}, {contact.location.country}
                  </small>
                  <strong>Visit Me</strong>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <div
                className="footer-map-preview"
                aria-label={`Map preview of ${contact.location.city}`}
              >
                <iframe
                  src={mapPreviewLink}
                  title={`Map of ${contact.location.city}`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="footer-contact-zone"
          aria-label="Contact and social links"
        >
          <a href={`mailto:${contact.email}`} className="footer-email">
            <span>{contact.email}</span>
            <span className="footer-email-icon">↗</span>
          </a>
          <SocialLinks compact />
        </section>

        <div className="footer-utility-row">
          <p>
            © {new Date().getFullYear()} {contact.name}
          </p>
          <nav aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#top"
            aria-label="Back to top"
            title="Back to top"
            className="footer-top-action"
          >
            <ArrowUp size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
