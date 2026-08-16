"use client";

import { useRef, useState, type ReactNode } from "react";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ transform: string }>({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setStyle({
      transform: `perspective(900px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleLeave = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)" });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform: style.transform, transition: "transform 250ms ease-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
