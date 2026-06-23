"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Globe, Bot, MessageSquare, Cog, Palette, BarChart3 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    badge: "Web",
    icon: Globe,
    title: "Páginas Web Profesionales",
    description:
      "Creamos landing pages, sitios corporativos, e-commerce y más. Diseñados para empresas en USA y el mundo.",
  },
  {
    badge: "AI",
    icon: Bot,
    title: "Agentes de IA",
    description:
      "Desarrollamos agentes inteligentes que automatizan tareas, analizan datos y optimizan tus procesos.",
  },
  {
    badge: "Chat",
    icon: MessageSquare,
    title: "Chatbots Inteligentes",
    description:
      "Chatbots con IA para soporte al cliente 24/7, generación de leads y atención personalizada.",
  },
  {
    badge: "Auto",
    icon: Cog,
    title: "Automatizaciones",
    description:
      "Automatizamos flujos de trabajo, integraciones y procesos repetitivos para ahorrar tiempo y dinero.",
  },
  {
    badge: "Design",
    icon: Palette,
    title: "Diseño UI/UX",
    description:
      "Interfaces modernas, intuitivas y centradas en el usuario que maximizan la conversión.",
  },
  {
    badge: "Growth",
    icon: BarChart3,
    title: "Consultoría Digital",
    description:
      "Asesoría estratégica para transformar digitalmente tu negocio con tecnología de punta.",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set(cardsRef.current.filter(Boolean), { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: isMobile ? "play none none none" : "play none none none",
        },
      })

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const angle = i % 2 === 0 ? -25 : 25
        const xOff = i < 3 ? -60 : 60
        tl.fromTo(
          card,
          {
            opacity: 0,
            rotationY: angle,
            rotationX: 15,
            x: xOff,
            scale: 0.85,
          },
          {
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="relative overflow-hidden py-24 md:py-32" style={{ perspective: "1200px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
            Servicios
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Todo lo que{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              necesitas
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Soluciones completas de desarrollo web, IA y automatización para impulsar tu negocio.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="card-premium p-[1px]"
              >
                <div className="glass-premium h-full rounded-[15px] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{s.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
