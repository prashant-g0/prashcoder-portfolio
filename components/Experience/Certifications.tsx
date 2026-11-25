"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { professionalDetails } from "@/data/prash/about";

export default function Certifications() {
  const [preview, setPreview] = useState<{ title: string; link: string; driveId?: string; x: number; y: number } | null>(null);

  function showPreview(
    event: React.MouseEvent<HTMLElement>,
    title: string,
    previewLink: string,
    driveId?: string,
  ) {
    const width = 360;
    const height = 250;
    const offset = 18;
    const x = event.clientX + width + offset > window.innerWidth
      ? event.clientX - width - offset
      : event.clientX + offset;
    const y = event.clientY + height + offset > window.innerHeight
      ? window.innerHeight - height - 12
      : event.clientY + 12;

    setPreview({
      title,
      link: previewLink,
      driveId,
      x: Math.max(12, x),
      y: Math.max(12, y),
    });
  }

  return (
    <section
      className="certifications"
      aria-labelledby="certifications-heading"
    >
      <p className="eyebrow">Credentials</p>
      <h2 id="certifications-heading">Certifications</h2>
      <div className="certification-list">
        {professionalDetails.certifications.map((certificate) => {
          const mediaLink = certificate.certificateMediaLink;
          const driveId = mediaLink?.match(/\/d\/([^/]+)/)?.[1];
          const previewLink = driveId
            ? `https://drive.google.com/file/d/${driveId}/preview`
            : mediaLink;

          return (
            <article
              key={certificate.id}
              className={previewLink ? "certification-row has-preview" : "certification-row"}
              onMouseEnter={previewLink ? (event) => showPreview(event, certificate.title, previewLink, driveId) : undefined}
              onMouseMove={previewLink ? (event) => showPreview(event, certificate.title, previewLink, driveId) : undefined}
              onMouseLeave={() => setPreview(null)}
            >
              <div>
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
              </div>
              {certificate.certificateLink ? (
                <Link
                  href={certificate.certificateLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`View ${certificate.title} credential`}
                >
                  View credential <ArrowUpRight size={14} />
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>

      {preview ? (
        <div
          className="certificate-preview"
          role="tooltip"
          style={{ left: preview.x, top: preview.y }}
          aria-label={`${preview.title} certificate preview`}
        >
          <div className="certificate-preview-bar">
            <span>{preview.title}</span>
            <i aria-hidden="true" />
          </div>
          <div className="certificate-preview-media">
            {preview.driveId ? (
              <iframe src={preview.link} title={`${preview.title} preview`} loading="lazy" />
            ) : (
              <Image src={preview.link} alt={`${preview.title} certificate preview`} fill unoptimized />
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
