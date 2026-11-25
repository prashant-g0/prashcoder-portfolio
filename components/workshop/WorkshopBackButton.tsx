"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkshopBackButton() {
  const router = useRouter();

  function handleBack() {
    if (typeof document !== "undefined" && document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (
          referrer.origin === window.location.origin &&
          referrer.pathname.startsWith("/workshops")
        ) {
          router.back();
          return;
        }
      } catch {}
    }
    router.push("/workshops");
  }

  return (
    <button type="button" onClick={handleBack} className="workshop-back-button">
      <ArrowLeft size={16} aria-hidden="true" />
      <span>Back</span>
    </button>
  );
}
