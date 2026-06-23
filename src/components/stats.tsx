"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 30, suffix: "+", label: "Clientes activos" },
  { value: 98, suffix: "%", label: "Satisfacción" },
]

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      valueRefs.current.forEach((ref, i) => {
        if (ref) ref.textContent = String(stats[i]?.value ?? "") + (stats[i]?.suffix ?? "")
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 40%",
          scrub: isMobile ? 0 : 0.3,
        },
      })

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )

      // Cards expand outward from center
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const dir = i === 0 ? -1 : i === 2 ? 1 : 0
        tl.fromTo(
          card,
          { opacity: 0, scale: 0.5, x: dir * 80 },
          {
            opacity: 1, scale: 1, x: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
      })

      // Count up animation
      const countTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: isMobile ? "play none none none" : "play none none none",
        },
      })

      stats.forEach((s, i) => {
        const ref = valueRefs.current[i]
        if (!ref) return
        countTl.fromTo(
          { val: 0 },
          {
            val: 0,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const target = this.targets()[0]
              ref.textContent = Math.round(target.val) + s.suffix
            },
          },
          {
            val: s.value,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const target = this.targets()[0]
              ref.textContent = Math.round(target.val) + s.suffix
            },
          },
          "-=1.8"
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
            Resultados
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Números que{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              hablan
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Hemos ayudado a decenas de empresas a transformar su presencia digital.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => { cardsRef.current[i] = el }}
              className="card-premium p-8 text-center"
            >
              <span
                ref={(el) => { valueRefs.current[i] = el }}
                className="block text-5xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent md:text-6xl"
              >
                0
              </span>
              <div className="mt-2 text-lg text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
