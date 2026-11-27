"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import Modal from "@/components/UI/Modal";
import styles from "./gallery.module.css";

export interface GalleryEntry {
  id: number;
  title: string;
  description?: string;
  images: string[];
  sources?: string;
  category: string;
  year: string;
  featured?: boolean;
}

interface GalleryProps {
  entries: GalleryEntry[];
}

function toDisplayUrl(url: string) {
  if (!url) return "";

  if (url.includes("drive.google.com")) {
    const fileId =
      url.match(/\/file\/d\/([^/]+)/)?.[1] ?? url.match(/[?&]id=([^&]+)/)?.[1];

    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
    }
  }

  // Other image providers and local URLs
  return url;
}

function GalleryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const imageUrl = toDisplayUrl(src);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!imageUrl || failedSrc === imageUrl) {
    return (
      <div
        className={`${styles.imageFallback} ${className ?? ""}`}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(imageUrl)}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function Gallery({ entries }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryEntry | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const usableEntries = entries.filter(
    (entry) =>
      entry.title && Array.isArray(entry.images) && entry.images.length > 0,
  );

  const media = selected?.images ?? [];

  useEffect(() => {
    if (!selected) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setImageIndex((current) => (current - 1 + media.length) % media.length);
      } else if (event.key === "ArrowRight") {
        setImageIndex((current) => (current + 1) % media.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, media.length]);

  if (usableEntries.length === 0) return null;

  const openEntry = (entry: GalleryEntry) => {
    setSelected(entry);
    setImageIndex(0);
  };

  const closeEntry = () => setSelected(null);

  const moveImage = (direction: -1 | 1) => {
    setImageIndex(
      (current) => (current + direction + media.length) % media.length,
    );
  };

  const renderCard = (entry: GalleryEntry, duplicate = false) => {
    return (
      <button
        type="button"
        className={`${styles.card} ${entry.featured ? styles.featured : ""}`}
        key={`${duplicate ? "duplicate" : "original"}-${entry.id}`}
        onClick={() => openEntry(entry)}
        aria-label={`Open gallery entry: ${entry.title}`}
        aria-hidden={duplicate || undefined}
        tabIndex={duplicate ? -1 : 0}
      >
        <GalleryImage
          src={entry.images[0]}
          alt=""
          className={styles.previewImage}
        />
        <span className={styles.imageCountBadge} aria-hidden="true">
          1/{entry.images.length}
        </span>
        <span className={styles.cardOverlay}>
          <span className={styles.cardMeta}>
            <span>{entry.category}</span>
            <span>{entry.year}</span>
          </span>
          <strong>{entry.title}</strong>
        </span>
      </button>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.heading}>
        <p>Moments</p>
        <h2 id="gallery-heading">A few frames along the way.</h2>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.set}>
            {usableEntries.map((entry) => renderCard(entry))}
          </div>
          <div className={styles.set} aria-hidden="true">
            {usableEntries.map((entry) => renderCard(entry, true))}
          </div>
        </div>
      </div>

      {selected && (
        <Modal
          open
          title={selected.title}
          onClose={closeEntry}
          className={styles.modalPanel}
        >
          <div className={styles.modalGrid}>
            <div className={styles.modalMedia}>
              {media.length > 0 ? (
                <GalleryImage
                  key={`${selected.id}-${imageIndex}`}
                  src={media[imageIndex]}
                  alt={`${selected.title}, image ${imageIndex + 1} of ${media.length}`}
                  className={styles.modalImage}
                />
              ) : (
                <div className={styles.imageFallback}>No images available</div>
              )}

              {media.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.imageNav} ${styles.imageNavPrev}`}
                    onClick={() => moveImage(-1)}
                    aria-label="Previous image"
                  >
                    <ArrowLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`${styles.imageNav} ${styles.imageNavNext}`}
                    onClick={() => moveImage(1)}
                    aria-label="Next image"
                  >
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                  <span className={styles.counter}>
                    {imageIndex + 1} / {media.length}
                  </span>
                </>
              )}
            </div>

            <div className={styles.modalDetails}>
              <p className={styles.modalMeta}>
                {selected.category} · {selected.year}
              </p>
              <h3>{selected.title}</h3>
              {selected.description && (
                <p className={styles.description}>{selected.description}</p>
              )}
              {selected.sources && (
                <a
                  className={styles.sourceLink}
                  href={selected.sources}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source <ExternalLink size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
