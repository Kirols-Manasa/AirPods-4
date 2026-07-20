 "use client";

import { useEffect, useRef, useState } from "react";

export function useHeader(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  // ✅ جديد: activeSection بيتتبع أي section ظاهر دلوقتي
  const [activeSection, setActiveSection] = useState<string>("");

  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const rafId = useRef<number | null>(null);

  // Scroll hide/show effect — زي ما كان
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

        if (header) {
          if (direction === "down" && currentY > 60 && !isHidden.current) {
            isHidden.current = true;
            header.style.transform = "translateY(-100%)";
          } else if (direction === "up" && isHidden.current) {
            isHidden.current = false;
            header.style.transform = "translateY(0%)";
          }
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

  // ✅ جديد: IntersectionObserver بيراقب كل section
  useEffect(() => {
    // نجمع كل الـ sections اللي عندنا links ليها
    const sectionIds = ["#hero", "#engineered", "#details", "#battery"];
    const elements = sectionIds
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    // ✅ rootMargin: بيحسب الـ active section لما تكون في منتصف الشاشة تقريباً
    // مش لما تلمس أعلى الـ viewport — ده بيديك إحساس أدق
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // نحول الـ id من "hero" لـ "#hero" عشان يتطابق مع الـ links array
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        // ✅ -40% من فوق و -50% من تحت = بيشتغل لما الـ section يكون في الـ 10% الوسطى
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const base = "w-full fixed top-0 left-0 z-50 will-change-transform";

  const bgClass = scrolled
    ? "bg-white/80 backdrop-blur-md border-b border-black/10"
    : "bg-transparent border-b border-transparent";

  return {
    headerRef,
    headerClass: `${base} ${bgClass}`,
    textColor: "text-black",
    isScrolled: scrolled,
    // ✅ بنرجعه للـ Header component يستخدمه
    activeSection,
  };
}