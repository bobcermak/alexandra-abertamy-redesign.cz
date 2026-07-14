"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRevealAnimation } from "../../animations/useRevealAnimation";

type RevealSectionProps = ComponentPropsWithoutRef<"section"> & {
  scrollTrigger?: boolean
};
const RevealSection = ({ scrollTrigger = true, children, ...rest }: RevealSectionProps) => {
  const ref = useRevealAnimation<HTMLElement>({ scrollTrigger });
  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
};
export default RevealSection;