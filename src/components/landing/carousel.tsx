"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { BiArrowLeft, BiArrowRight, BiPauseFill, BiPlayFill } from "./bi-icons";

export type CarouselSlide = {
  key: string;
  /** Tab text (variant "tabs") or dot label (variant "dots"). */
  label: string;
  /** Status line read out under the controls, e.g. "Tela 2 de 4: Jornada". */
  counter: string;
  icon?: ReactNode;
  content: ReactNode;
};

// Slides are stacked in one grid cell and cross-faded, so the frame never jumps in height.
// Autoplay runs only with motion allowed, and stops while the pointer or focus is inside.
export function Carousel({
  slides,
  label,
  variant = "dots",
  autoplayMs = 0,
}: {
  slides: CarouselSlide[];
  label: string;
  variant?: "tabs" | "dots";
  autoplayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoplayMs > 0);
  const [held, setHeld] = useState(false);
  const reducedMotion = useRef(false);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || held || autoplayMs <= 0) return;
    const timer = window.setTimeout(() => go(index + 1), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [autoplayMs, go, held, index, playing]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div
      className={`carousel carousel--${variant}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      {variant === "tabs" ? (
        <div className="carousel-tabs" role="group" aria-label="Escolher tela">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              className="carousel-tab"
              aria-pressed={i === index}
              onClick={() => go(i)}
            >
              {slide.icon}
              {slide.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="carousel-stage">
        {slides.map((slide, i) => (
          <div
            key={slide.key}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={slide.counter}
            data-active={i === index ? "" : undefined}
            inert={i !== index}
          >
            {slide.content}
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button type="button" className="carousel-button" aria-label="Anterior" onClick={() => go(index - 1)}>
          <BiArrowLeft size={16} />
        </button>
        {variant === "dots" ? (
          <div className="carousel-dots" role="group" aria-label="Escolher prancha">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className="carousel-dot"
                aria-label={slide.label}
                aria-pressed={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>
        ) : null}
        {autoplayMs > 0 ? (
          <button
            type="button"
            className="carousel-button"
            aria-label={playing ? "Pausar rotação automática" : "Retomar rotação automática"}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? <BiPauseFill size={14} /> : <BiPlayFill size={14} />}
          </button>
        ) : null}
        <p className="carousel-counter" aria-live="polite">
          {slides[index]?.counter}
        </p>
        <button type="button" className="carousel-button" aria-label="Próxima" onClick={() => go(index + 1)}>
          <BiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
