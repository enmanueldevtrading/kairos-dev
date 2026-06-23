"use client";

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)
  const col4Ref = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    if (reduced) {
      gsap.set([logoRef.current, col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current, copyrightRef.current], { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
      const cols = [col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current]

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: isMobile ? "play none none none" : "play none none none",
        },
      })

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 60, rotate: -3 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
      )

      cols.forEach((col, i) => {
        if (!col) return
        tl.fromTo(
          col,
          { opacity: 0, y: 80 + (i * 10), rotate: i % 2 === 0 ? -2 : 2 },
          {
            opacity: 1, y: 0, rotate: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
      })

      tl.fromTo(
        copyrightRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div ref={col1Ref}>
            <div ref={logoRef} className="mb-4 flex items-center gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
                <text
                  x="16"
                  y="21"
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill="white"
                >
                  K
                </text>
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-bold text-white">Kairos Dev</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Creamos el futuro digital de tu empresa. Innovación sin fronteras.
            </p>
          </div>

          <div ref={col2Ref}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Enlaces
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#servicios" className="text-sm text-gray-400 transition-all hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 transition-all hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                  Portafolio
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-gray-400 transition-all hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div ref={col3Ref}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="https://wa.me/5351426569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                >
                  WhatsApp: +53 5 142 6569
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@kairos-dev.com"
                  className="transition-all hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                >
                  contacto@kairos-dev.com
                </a>
              </li>
              <li>Estados Unidos &bull; Latinoamérica &bull; Europa</li>
            </ul>
          </div>

          <div ref={col4Ref}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Síguenos
            </h4>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <div ref={copyrightRef} className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-gray-500">
          &copy; 2025 Kairos Dev. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
