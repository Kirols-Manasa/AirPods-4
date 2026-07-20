"use client";

import { createContext, useContext, useState, useCallback } from "react";

// ============================
// Intro Context
// بيشيل state واحدة: هل الـ intro خلص ولا لأ
// ============================

interface IntroContextValue {
  introComplete: boolean;
  markIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  introComplete: false,
  markIntroComplete: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  // useCallback عشان الـ reference تفضل stable
  const markIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <IntroContext.Provider value={{ introComplete, markIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}