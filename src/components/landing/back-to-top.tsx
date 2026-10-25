"use client";

import { useEffect, useRef } from "react";

import { BiArrowUp } from "./bi-icons";

// Appears once the visitor has scrolled past the first screen, so it never covers the hero.
export function BackToTop() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      if (window.scrollY > window.innerHeight) node.dataset.visible = "";
      else delete node.dataset.visible;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a ref={ref} href="#topo" className="back-to-top" aria-label="Voltar ao topo">
      <BiArrowUp size={18} />
    </a>
  );
}
