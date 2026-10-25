"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

const REST = "perspective(900px) rotateX(0deg) rotateY(0deg)";
const MAX_TILT_DEG = 6;

// Tilts toward the cursor on precise pointers only (no touch, no reduced motion). The transform
// is written straight to the element instead of through React state, so a mouse move never
// re-renders the card.
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      enabled.current = query.matches;
    };

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !enabled.current || event.pointerType !== "mouse") return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.transform = `perspective(900px) rotateX(${(-y * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(x * MAX_TILT_DEG).toFixed(2)}deg)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = REST;
  };

  return (
    <div ref={ref} className={`tilt-card ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {children}
    </div>
  );
}
