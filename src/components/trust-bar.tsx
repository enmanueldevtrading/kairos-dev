"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const techs = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "OpenAI",
  "Cloudflare",
  "Python",
]

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set(itemsRef.current.filter(Boolean), { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: isMobile ? "play none none none" : "play none none none",
          },
          opacity: 1, duration: 0.6, ease: "power2.out",
        }
      )

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        const seed = i * 37
        const fromX = (seed % 200) - 100
        const fromY = i % 2 === 0 ? -60 + (i * 5) : 60 - (i * 3)

        gsap.fromTo(
          item,
          { opacity: 0, x: fromX, y: fromY, scale: 0.6, filter: "blur(6px)" },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: isMobile ? "play none none none" : "play none none none",
            },
            opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)",
            duration: 0.7 + (i * 0.05),
            delay: i * 0.08,
            ease: "back.out(1.4)",
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          ref={labelRef}
          className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-gray-500"
        >
          Tecnologías con las que trabajamos
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {techs.map((tech, i) => (
            <span
              key={tech}
              ref={(el) => { itemsRef.current[i] = el }}
              className="text-lg font-medium text-gray-500 transition-colors hover:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
