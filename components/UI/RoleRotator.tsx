"use client";

import { useEffect, useState } from "react";
import { professionalDetails } from "@/data/prash/about";

export default function RoleRotator() {
  const roles = professionalDetails.professionalRoles;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || roles.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % roles.length),
      2200,
    );
    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <span className="role-rotator" aria-live="polite" aria-label={roles[index]}>
      <span key={roles[index]}>{roles[index]}</span>
    </span>
  );
}
