"use client";

import Image from "next/image";
import { Download, Maximize2, Minimize2 } from "lucide-react";
import { PointerEvent, useEffect, useRef, useState } from "react";

export default function PersonalCard() {
  const normalRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const dragFrame = useRef<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragTarget = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [expanded, setExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState("rotateX(4deg) rotateY(-7deg)");
  const [highlight, setHighlight] = useState("35% 20%");
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [expanded]);

  useEffect(
    () => () => {
      if (dragFrame.current) cancelAnimationFrame(dragFrame.current);
    },
    [],
  );

  function animateDrag() {
    dragOffset.current.x +=
      (dragTarget.current.x - dragOffset.current.x) * 0.18;
    dragOffset.current.y +=
      (dragTarget.current.y - dragOffset.current.y) * 0.18;
    setOffset({ x: dragOffset.current.x, y: dragOffset.current.y });

    if (
      Math.abs(dragTarget.current.x - dragOffset.current.x) > 0.2 ||
      Math.abs(dragTarget.current.y - dragOffset.current.y) > 0.2
    ) {
      dragFrame.current = requestAnimationFrame(animateDrag);
    } else {
      dragFrame.current = null;
    }
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (expanded || event.pointerType !== "mouse") return;
    if ((event.target as HTMLElement).closest("button, a")) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      offsetX: dragOffset.current.x,
      offsetY: dragOffset.current.y,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragging || expanded) return;
    const x = dragStart.current.offsetX + event.clientX - dragStart.current.x;
    const y = dragStart.current.offsetY + event.clientY - dragStart.current.y;
    dragTarget.current = {
      x: Math.max(-180, Math.min(180, x)),
      y: Math.max(-90, Math.min(90, y)),
    };
    setTransform(
      `rotateX(${Math.max(-7, Math.min(7, -y * 0.04))}deg) rotateY(${Math.max(-9, Math.min(9, x * 0.04))}deg)`,
    );
    if (!dragFrame.current)
      dragFrame.current = requestAnimationFrame(animateDrag);
  }

  function endDrag(event?: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    if (event?.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);
    setTransform("rotateX(4deg) rotateY(-7deg)");
    dragTarget.current = { x: 0, y: 0 };
    if (!dragFrame.current)
      dragFrame.current = requestAnimationFrame(animateDrag);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
    expandedView = false,
  ) {
    if (dragging || event.pointerType !== "mouse") return;
    const bounds = (
      expandedView ? expandedRef.current : normalRef.current
    )?.getBoundingClientRect();
    if (!bounds) return;
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - bounds.left) / bounds.width),
    );
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - bounds.top) / bounds.height),
    );
    setTransform(`rotateX(${(0.5 - y) * 11}deg) rotateY(${(x - 0.5) * 14}deg)`);
    setHighlight(`${x * 100}% ${y * 100}%`);
  }

  function resetCard() {
    if (!dragging) setTransform("rotateX(4deg) rotateY(-7deg)");
    setHighlight("35% 20%");
  }

  function renderCard(expandedView = false) {
    return (
      <div
        ref={expandedView ? expandedRef : normalRef}
        className={`personal-card ${dragging && !expandedView ? "is-dragging" : ""}`}
        style={{
          transform: expandedView
            ? transform
            : `translate3d(${offset.x}px, ${offset.y}px, 0) ${transform}`,
        }}
        onPointerMove={(event) => handlePointerMove(event, expandedView)}
        onPointerLeave={resetCard}
        onPointerDown={expandedView ? undefined : startDrag}
        onPointerMoveCapture={expandedView ? undefined : moveDrag}
        onPointerUp={expandedView ? undefined : endDrag}
        onPointerCancel={expandedView ? undefined : endDrag}
      >
        <Image
          src="/user/personal/card.png"
          alt="Prashant Gupta personal developer card"
          width={900}
          height={1350}
          priority
          className="block h-auto w-full"
        />
        <span
          className="personal-card-highlight"
          style={{ backgroundPosition: highlight }}
        />
        {!expandedView ? (
          <div className="personal-card-toolbar" aria-label="Card controls">
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setExpanded(true)}
              aria-label="Maximize personal card"
              title="Maximize card"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div className="relative mx-auto w-full max-w-107.5 px-3 pb-5 sm:px-8 lg:px-0">
        {renderCard(false)}
        <a
          href="/user/personal/card.png"
          download="Prashant-Gupta-Card.png"
          className="card-download"
          aria-label="Download Prashant's personal card"
          title="Download personal card"
        >
          <Download aria-hidden="true" size={16} />
          <span>Download card</span>
        </a>
      </div>

      {expanded ? (
        <div
          className="card-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setExpanded(false);
          }}
        >
          <div
            className="expanded-card-wrap"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded personal card"
          >
            {renderCard(true)}
            <div className="expanded-card-toolbar" aria-label="Expanded card actions">
              <a
                href="/user/personal/card.png"
                download="Prashant-Gupta-Card.png"
                onClick={() => {
                  setDownloadStarted(true);
                  window.setTimeout(() => setDownloadStarted(false), 1800);
                }}
                className={`expanded-card-action ${downloadStarted ? "is-downloading" : ""}`}
                aria-label="Download personal card"
                title="Download card"
              >
                <Download size={15} aria-hidden="true" />
                <span>{downloadStarted ? "Downloaded" : "Download Card"}</span>
              </a>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="expanded-card-action"
                aria-label="Minimize personal card"
                title="Minimize card"
              >
                <Minimize2 size={15} aria-hidden="true" />
                <span>Minimize</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
