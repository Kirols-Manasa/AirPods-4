"use client";

// ============================
// IntroShell: الوسيط بين الـ Context والـ Intro component
// بيربط onComplete بـ markIntroComplete من الـ Context
// ============================

import Intro from "@/intro";
import { useIntro } from "@/context/IntroContext";

export default function IntroShell() {
  const { markIntroComplete } = useIntro();

  return <Intro onComplete={markIntroComplete} />;
}