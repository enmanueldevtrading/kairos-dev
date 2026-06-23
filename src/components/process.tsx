"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: "01",
    title: "Descubrimiento",
    description: "Entendemos tu negocio, objetivos y audiencia.",
  },
  {
    num: "02",
    title: "Estrategia",
    description: "Definimos la arquitectura y el plan de acción.",
  },
  {
    num: "03",
    title: "Diseño",
    description: "Creamos prototipos y diseños impactantes.",
  },
  {
    num: "04",
    title: "Desarrollo",
    description: "Construimos con tecnologías modernas.",
  },
  {
    num: "05",
    title: "Lanzamiento",
    description: "Desplegamos y monitoreamos el rendimiento.",
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const circlesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    const line = lineRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set(stepsRef.current.filter(Boolean), { clearProps: "all" })
      if (line) gsap.set(line, { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
      // Connecting line animation (draws itself from left to right)
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "center 40%",
              scrub: isMobile ? 0 : 0.5,
            },
            scaleX: 1,
            duration: 2,
          }
        )
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: isMobile ? "play none none none" : "play none none none",
        },
      })

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )

      stepsRef.current.forEach((step, i) => {
        if (!step) return
        const circle = circlesRef.current[i]

        tl.fromTo(
          step,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.3)" },
          "-=0.15"
        )

        if (circle) {
          tl.fromTo(
            circle,
            { scale: 0, borderColor: "rgba(139,92,246,0.3)" },
            {
              scale: 1,
              borderColor: "rgba(139,92,246,0.8)",
              duration: 0.5,
              ease: "back.out(2)",
            },
            "-=0.5"
          )
        }
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proceso" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
            Proceso
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Cómo{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              trabajamos
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Un proceso claro y transparente desde la idea hasta el lanzamiento.
          </p>
        </div>

        {/* Connecting line */}
        <div className="relative mb-12 hidden lg:block">
          <div className="absolute left-[10%] right-[10%] top-0 h-px bg-white/5" />
          <div
            ref={lineRef}
            className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-violet-500 to-cyan-400"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => { stepsRef.current[i] = el }}
              className="group relative rounded-2xl border border-white/5 bg-dark-800/50 p-6 text-center backdrop-blur-sm transition-colors hover:border-violet-500/20"
            >
              <div className="relative mx-auto mb-4">
                <div
                  ref={(el) => { circlesRef.current[i] = el }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-500/30"
                >
                  <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-lg font-bold text-transparent">
                    {s.num}
                  </span>
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
