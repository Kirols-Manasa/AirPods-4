 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useIntro } from "@/context/IntroContext";

gsap.registerPlugin(useGSAP);

const SECTION_IDS = ["#hero", "#engineered", "#details", "#battery"] as const;
const HIDE_THRESHOLD_PX = 60;
const SCROLL_MARGIN = 10;
const ROOT_MARGIN   = "-40% 0px -50% 0px";

const HEADER_TRANSITION =
  "transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), " +
  "background-color 0.3s ease-in-out, " +
  "backdrop-filter 0.3s ease-in-out, " +
  "border-color 0.3s ease-in-out";

export function useHeader(threshold = 40) {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState<string>("");

  const headerRef   = useRef<HTMLElement | null>(null);
  const brandRef    = useRef<HTMLSpanElement | null>(null);
  const navLinkRefs = useRef<HTMLAnchorElement[]>([]);
  const buyBtnRef   = useRef<HTMLAnchorElement | null>(null);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  const lastScrollY = useRef(0);
  const isHidden    = useRef(false);
  const rafId       = useRef<number | null>(null);
  const scrolled$   = useRef(false);

  const { introComplete } = useIntro();

  const addNavLink = (el: HTMLAnchorElement | null) => {
    if (el && !navLinkRefs.current.includes(el)) navLinkRefs.current.push(el);
  };

  // ── Scroll hide / show + scrolled state ──────────────────────────────────
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.style.transition = HEADER_TRANSITION;

    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        const currentY  = window.scrollY;
        const goingDown = currentY > lastScrollY.current;

        if (goingDown && currentY > HIDE_THRESHOLD_PX && !isHidden.current) {
          isHidden.current = true;
          header.style.transform = "translateY(-100%)";
        } else if (!goingDown && isHidden.current) {
          isHidden.current = false;
          header.style.transform = "translateY(0%)";
        }

        const shouldBeScrolled = currentY > threshold && currentY > SCROLL_MARGIN;
        if (scrolled$.current !== shouldBeScrolled) {
          scrolled$.current = shouldBeScrolled;
          setScrolled(shouldBeScrolled);
        }

        lastScrollY.current = currentY;
        rafId.current = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [threshold]);

  // ── Active section observer ───────────────────────────────────────────────
  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
            break;
          }
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Page-load animation (paused until intro completes) ───────────────────
  useGSAP(
    () => {
      if (!headerRef.current) return;

      const tl = gsap.timeline({ delay: 0.1, paused: true });

      tl.fromTo(
        brandRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" }
      )
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

      tlRef.current = tl;
    },
    { scope: headerRef }
  );

  // ── Play animation when intro finishes ───────────────────────────────────
  useEffect(() => {
    if (introComplete && tlRef.current) {
      tlRef.current.play();
    }
  }, [introComplete]);

  // ─────────────────────────────────────────────────────────────────────────

  const base    = "w-full fixed top-0 left-0 z-50 will-change-transform";
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