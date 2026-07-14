"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type UseRevealAnimationOptions = {
  scrollTrigger?: boolean,
  start?: string,
  y?: number,
  scale?: number,
  duration?: number,
  stagger?: number,
  ease?: string
};
export const useRevealAnimation = <T extends HTMLElement>({ scrollTrigger = true, start = "top 80%", y = 32, scale = 0.96, duration = 1, stagger = 0.12, ease = "back.out(1.6)" }: UseRevealAnimationOptions = {}): RefObject<T | null> => {
  const scopeRef = useRef<T | null>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scopeRef.current);
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y, scale });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: scrollTrigger ? { trigger: scopeRef.current, start } : undefined
    });
  }, { scope: scopeRef });
  return scopeRef;
};
export default useRevealAnimation;