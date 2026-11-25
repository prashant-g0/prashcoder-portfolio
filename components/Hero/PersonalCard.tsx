"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { PointerEvent, useRef, useState } from "react";

export default function PersonalCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(4deg) rotateY(-7deg)");
  const [highlight, setHighlight] = useState("35% 20%");

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") {
      const bounds = cardRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      setTransform(`rotateX(${(0.5 - y) * 11}deg) rotateY(${(x - 0.5) * 14}deg)`);
      setHighlight(`${x * 100}% ${y * 100}%`);
    }
  }

  function resetCard() {
    setTransform("rotateX(4deg) rotateY(-7deg)");
    setHighlight("35% 20%");
  }

  return (
    <div className="relative mx-auto w-full max-w-107.5 px-3 pb-5 sm:px-8 lg:px-0">
      <div
        ref={cardRef}
        className="personal-card"
        style={{ transform }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetCard}
        onPointerCancel={resetCard}
      >
        <Image
          src="/user/personal/card.png"
          alt="Prashant Gupta personal developer card"
          width={900}
          height={1350}
          priority
          className="block h-auto w-full"
        />
        <span className="personal-card-highlight" style={{ backgroundPosition: highlight }} />
      </div>

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
  );
}
