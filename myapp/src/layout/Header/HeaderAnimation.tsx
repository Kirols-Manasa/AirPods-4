 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useHeader(threshold = 40) {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const headerRef    = useRef<HTMLElement | null>(null);
  const brandRef     = useRef<HTMLSpanElement | null>(null);
  const navLinkRefs  = useRef<HTMLAnchorElement[]>([]);
  const buyBtnRef    = useRef<HTMLAnchorElement | null>(null);

  const lastScrollY = useRef(0);
  const isHidden    = useRef(false);
  const rafId       = useRef<number | null>(null);

  const addNavLink = (el: HTMLAnchorElement | null) => {
    if (el && !navLinkRefs.current.includes(el)) navLinkRefs.current.push(el);
  };

  // ── Scroll hide/show — زي ما كان ──────────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.style.transition =
      "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), " +
      "background-color 0.3s ease-in-out, " +
      "backdrop-filter 0.3s ease-in-out, " +
      "border-color 0.3s ease-in-out";

    const onScroll = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const direction = currentY > lastScrollY.current ? "down" : "up";

        if (direction === "down" && currentY > 60 && !isHidden.current) {
          isHidden.current = true;
          header.style.transform = "translateY(-100%)";
        } else if (direction === "up" && isHidden.current) {
          isHidden.current = false;
          header.style.transform = "translateY(0%)";
        }

        const shouldBeScrolled = currentY > threshold && currentY > 10;
        setScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));

        lastScrollY.current = currentY;
        rafId.current = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [threshold]);

  // ── Active section observer — زي ما كان ───────────────────────────────
  useEffect(() => {
    const sectionIds = ["#hero", "#engineered", "#details", "#battery"];
    const elements = sectionIds
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Page-load animations ───────────────────────────────────────────────
  useGSAP(
    () => {
      if (!headerRef.current) return;

      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Brand — clip-path reveal من اليسار
      tl.fromTo(
        brandRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" }
      )

      // 2. Nav links — clip-path من تحت بـ stagger
      .fromTo(
        navLinkRefs.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
        },
        "-=0.45"
      )

      // 3. Buy button — circle expand
      .fromTo(
        buyBtnRef.current,
        { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
        {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
    },
    { scope: headerRef }
  );

  const base = "w-full fixed top-0 left-0 z-50 will-change-transform";
  const bgClass = scrolled
    ? "bg-white/80 backdrop-blur-md border-b border-black/10"
    : "bg-transparent border-b border-transparent";

  return {
    headerRef,
    brandRef,
    addNavLink,
    buyBtnRef,
    headerClass: `${base} ${bgClass}`,
    textColor: "text-black",
    isScrolled: scrolled,
    activeSection,
  };
}