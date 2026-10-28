"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "./Cursor";
import { PrefillProvider } from "./PrefillContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <PrefillProvider>
          {children}
          <Cursor />
        </PrefillProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
