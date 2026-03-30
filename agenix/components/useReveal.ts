"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -28px 0px" }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => obs.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [pathname]); // re-run on every page navigation
}
