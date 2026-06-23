"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const energy1Ref = useRef<HTMLDivElement>(null);
  const energy2Ref = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (overlayRef.current) overlayRef.current.style.opacity = "0";
      return;
    }

    const tl = gsap.timeline();

    // Overlay fade
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });

    // Badge
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Logo ring
    tl.fromTo(
      ringRef.current,
      { opacity: 0, scale: 0.5, rotate: -20 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power4.out" },
      "-=0.6"
    );

    // Heading - letter by letter via clip reveal
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll(".char-reveal");
      tl.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Energy lines
    if (energy1Ref.current && energy2Ref.current) {
      tl.fromTo(
        energy1Ref.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );
      tl.fromTo(
        energy2Ref.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.6, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }

    // Parallax on scroll
    if (heroInnerRef.current) {
      gsap.to(heroInnerRef.current, {
        y: 80,
        opacity: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Mouse tracking for ring
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const handleMove = (e: MouseEvent) => {
      const rect = ring.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ring.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const headingText = "Creamos tu página web";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-18"
      id="hero"
    >
      {/* Load overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-50 bg-deep-black"
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-50 -right-50 h-[600px] w-[600px] animate-pulse-glow rounded-full bg-violet-500/10 blur-[120px]" />
        <div
          className="absolute -bottom-50 -left-50 h-[500px] w-[500px] animate-pulse-glow rounded-full bg-cyan-400/8 blur-[120px]"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Energy lines */}
      <div
        ref={energy1Ref}
        className="energy-line absolute left-0 right-0 top-1/3"
        style={{ transformOrigin: "left center" }}
      />
      <div
        ref={energy2Ref}
        className="energy-line absolute left-0 right-0 top-2/3"
        style={{ transformOrigin: "right center", opacity: 0.6 }}
      />

      <div
        ref={heroInnerRef}
        className="container relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div ref={badgeRef} className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              Agencia Full-Stack &amp; AI
            </div>

            {/* Heading with letter reveal */}
            <h1
              ref={headingRef}
              className="mb-6 overflow-hidden text-[clamp(36px,8vw,72px)] font-bold leading-[1.05] tracking-tight"
            >
              {headingText.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.15em]">
                  {word.split("").map((char, ci) => (
                    <span
                      key={`${wi}-${ci}`}
                      className="char-reveal inline-block"
                      style={{ opacity: 0 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              ))}
              <br />
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                {Array.from("página web").map((char, i) => (
                  <span
                    key={i}
                    className="char-reveal inline-block"
                    style={{ opacity: 0 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mx-auto mb-8 max-w-lg text-lg text-white/50 lg:mx-0"
            >
              Somos especialistas en creación de páginas web profesionales, agentes de IA, chatbots y automatizaciones para empresas.
            </p>

            {/* CTA */}
            <div ref={ctaRef}>
              <a
                href="https://wa.me/5351426569?text=Hola%2C%20quiero%20impulsar%20mi%20negocio%20con%20Kairos%20Dev"
                target="_blank"
                className="btn-gradient inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-violet-500/30 hover:shadow-xl glow-violet"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contrátanos ahora
              </a>
            </div>
          </div>

          {/* Right side - hero ring */}
          <div ref={ringRef} className="hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-[400px]" style={{ perspective: "800px" }}>
              <div className="absolute inset-0 animate-float rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-400/10" />
              <div
                className="absolute -inset-1 animate-spin-slow rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(139,92,246,.3), transparent, rgba(34,211,238,.3), transparent)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                }}
              />
              <div className="glass-premium absolute inset-5 flex flex-col items-center justify-center rounded-full">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                  <defs>
                    <linearGradient id="hero-lg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M24 4L28.09 16.26L40 18.18L31.24 26.12L33.8 38L24 31.5L14.2 38L16.76 26.12L8 18.18L19.91 16.26L24 4Z"
                    fill="url(#hero-lg)"
                  />
                </svg>
                <span className="mt-3 text-xl font-bold">Kairos Dev</span>
                <span className="text-sm text-white/40">Full-Stack &amp; AI Agency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
