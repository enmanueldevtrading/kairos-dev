"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LayoutGrid, ShoppingCart, AppWindow } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const designs = [
  {
    icon: LayoutGrid,
    title: "Landing Pages",
    description:
      "Diseñadas para convertir. Animaciones fluidas, CTAs estratégicos, carga ultrarrápida.",
    gradient: "bg-gradient-to-br from-violet-600/20 to-dark-900",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Tiendas online completas con carrito, pasarela de pago y dashboard de administración.",
    gradient: "bg-gradient-to-br from-cyan-600/20 to-dark-900",
  },
  {
    icon: AppWindow,
    title: "Web Apps",
    description:
      "Aplicaciones web interactivas con tecnologías modernas y experiencia de usuario premium.",
    gradient: "bg-gradient-to-br from-violet-600/10 via-cyan-600/10 to-dark-900",
  },
]

export default function DesignShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const curtainRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set(cardRefs.current.filter(Boolean), { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
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

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const curtain = curtainRefs.current[i]
        tl.fromTo(
          curtain,
          { scaleY: 1, transformOrigin: "top center" },
          { scaleY: 0, duration: 0.8, ease: "power4.inOut" },
          "-=0.1"
        ).fromTo(
          card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        )
      })

      // Background color shift on scroll
      gsap.fromTo(
        el,
        { backgroundColor: "rgba(5,5,5,1)" },
        {
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 0 : 0.8,
          },
          backgroundColor: "rgba(17,17,17,1)",
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 transition-colors duration-500 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
            Diseño Premium
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Sitios web que{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              impactan
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Diseñamos experiencias digitales que convierten visitantes en clientes. Cada píxel cuenta.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {designs.map((d, i) => {
            const Icon = d.icon
            return (
              <div
                key={d.title}
                ref={(el) => { cardRefs.current[i] = el }}
                className="card-premium relative overflow-hidden rounded-2xl"
              >
                <div
                  ref={(el) => { curtainRefs.current[i] = el }}
                  className="absolute inset-0 z-10 bg-dark-900"
                />
                <div className={`relative z-0 ${d.gradient} border border-white/5 p-8`}>
                  <div className="relative z-10">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-violet-400 backdrop-blur-sm">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{d.title}</h3>
                    <p className="leading-relaxed text-gray-400">{d.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
