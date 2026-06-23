"use client";

import { useEffect, useRef, useCallback } from "react";

interface TrailParticle {
  x: number;
  y: number;
  life: number;
  size: number;
}

export default function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  const spawnExplosion = useCallback((x: number, y: number) => {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        life: 1,
        size: 2 + Math.random() * 3,
      });
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], .card-premium, .btn-gradient, .nav-cta");
      isHovering.current = !!interactive;

      if (ring) {
        ring.classList.toggle("hovering", !!interactive);
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      if (ring) ring.classList.add("clicking");
      spawnExplosion(mouseRef.current.x, mouseRef.current.y);
      setTimeout(() => {
        isClicking.current = false;
        if (ring) ring.classList.remove("clicking");
      }, 200);
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -200, y: -200 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);

    function animate() {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ringPos.current.x += (mx - ringPos.current.x) * 0.15;
      ringPos.current.y += (my - ringPos.current.y) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.025;
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spawnExplosion]);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-dot"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9998 }}
      />
    </>
  );
}
