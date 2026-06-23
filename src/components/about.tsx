"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set([textRef.current, cardRef.current, tagRef.current], { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
      const defaults = { ease: "power3.out", duration: 1.2 }

      gsap.fromTo(
        tagRef.current,
        { opacity: 0, y: -30 },
        {
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: isMobile ? "play none none reverse" : "play none none reverse" },
          opacity: 1, y: 0, duration: 0.6, ...defaults,
        }
      )

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -120, scale: 0.95 },
        {
          scrollTrigger: { trigger: el, start: "top 75%", toggleActions: isMobile ? "play none none none" : "play none none none" },
          opacity: 1, x: 0, scale: 1, duration: 1.0, ease: "power4.out",
        }
      )

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 120, scale: 0.9, rotate: 3 },
        {
          scrollTrigger: { trigger: el, start: "top 75%", toggleActions: isMobile ? "play none none none" : "play none none none" },
          opacity: 1, x: 0, scale: 1, rotate: 0, duration: 1.1, ease: "back.out(1.7)",
        }
      )

      // Magnetic pull overshoot effect on card
      gsap.fromTo(
        cardRef.current,
        { filter: "blur(4px)" },
        {
          scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: isMobile ? 0 : 0.5 },
          filter: "blur(0px)",
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div ref={textRef} className="space-y-6">
            <span
              ref={tagRef}
              className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400"
            >
              Sobre Nosotros
            </span>
            <h2 className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
              Creamos el futuro digital de tu empresa.
            </h2>
            <p className="text-lg leading-relaxed text-gray-400">
              En Kairos Dev combinamos creatividad con tecnologías de punta para crear soluciones digitales que transforman negocios. Desde Miami para el mundo, llevamos tu marca al siguiente nivel.
            </p>
            <p className="text-lg leading-relaxed text-gray-400">
              Especialistas en desarrollo web, inteligencia artificial, chatbots y automatizaciones. Trabajamos con clientes en Estados Unidos, Latinoamérica y Europa.
            </p>
          </div>

          <div ref={cardRef} className="flex justify-center">
            <div className="glass-premium rounded-2xl p-8 md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">&lt;/&gt;</span>
                <span className="text-lg font-semibold text-white">Global Studio</span>
              </div>
              <p className="text-gray-400">
                Innovación sin límites. Tecnología de punta.
              </p>
              <div className="mt-6 flex gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="h-2 w-2 rounded-full bg-violet-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
