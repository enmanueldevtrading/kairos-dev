"use client";

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: "¿Cuánto tiempo toma crear un sitio web?",
    a: "Depende de la complejidad. Una landing page puede estar lista en 3-5 días. Un sitio web completo en 1-2 semanas. Un e-commerce en 2-4 semanas.",
  },
  {
    q: "¿Ofrecen hosting y dominio?",
    a: "Sí, ofrecemos hosting de alta velocidad y podemos ayudarte a gestionar tu dominio. Contamos con infraestructura en la nube para máxima seguridad y rendimiento.",
  },
  {
    q: "¿Trabajan con clientes internacionales?",
    a: "Sí, trabajamos principalmente con clientes en Estados Unidos, Latinoamérica y Europa. Todo el contacto es vía WhatsApp, email o videollamada.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos transferencias bancarias internacionales y PayPal. Facturamos para empresas en Estados Unidos.",
  },
  {
    q: "¿Ofrecen mantenimiento después del lanzamiento?",
    a: "Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, respaldos, soporte técnico y mejoras continuas.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const chevronRefs = useRef<(HTMLSpanElement | null)[]>([])
  const animRefs = useRef<(gsap.core.Timeline | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: isMobile ? "play none none none" : "play none none none",
          },
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        }
      )

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: isMobile ? "play none none none" : "play none none none",
            },
            opacity: 1, y: 0, duration: 0.5, delay: i * 0.12, ease: "power3.out",
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    faqs.forEach((_, i) => {
      const answer = answerRefs.current[i]
      const chevron = chevronRefs.current[i]
      if (!answer) return

      if (animRefs.current[i]) {
        animRefs.current[i]?.kill()
      }

      const isOpen = openIndex === i

      if (isOpen) {
        gsap.set(answer, { display: "block" })
        const h = answer.scrollHeight
        const tl = gsap.timeline()
        tl.fromTo(
          answer,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.4, ease: "power2.inOut" }
        )
        if (chevron) {
          tl.fromTo(
            chevron,
            { rotate: 0 },
            { rotate: 180, duration: 0.3, ease: "power2.inOut" },
            0
          )
        }
        animRefs.current[i] = tl
      } else {
        const tl = gsap.timeline()
        tl.fromTo(
          answer,
          { height: answer.scrollHeight, opacity: 1 },
          {
            height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut",
            onComplete: () => { gsap.set(answer, { display: "none" }) },
          }
        )
        if (chevron) {
          tl.fromTo(
            chevron,
            { rotate: 180 },
            { rotate: 0, duration: 0.3, ease: "power2.inOut" },
            0
          )
        }
        animRefs.current[i] = tl
      }
    })
  }, [openIndex])

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section ref={sectionRef} id="faq" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              frecuentes
            </span>
          </h2>
          <p className="mx-auto mt-4 text-lg text-gray-400">
            Respuestas rápidas a las dudas más comunes.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el }}
              className="group rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur-sm transition-colors hover:border-violet-500/20"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base font-medium text-white md:text-lg">
                  {faq.q}
                </span>
                <span ref={(el) => { chevronRefs.current[i] = el }}>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
                </span>
              </button>
              <div
                ref={(el) => { answerRefs.current[i] = el }}
                style={{ display: "none", height: 0, overflow: "hidden" }}
              >
                <div className="border-t border-white/5 px-6 pb-5 pt-4">
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
