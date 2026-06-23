"use client"

import { motion } from "framer-motion"


const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 md:grid-cols-4">
          <motion.div variants={item} className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
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
          </motion.div>

          <motion.div variants={item}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Enlaces
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#servicios" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Portafolio
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-gray-400 transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="https://wa.me/5351426569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp: +53 5 142 6569
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@kairos-dev.com"
                  className="transition-colors hover:text-white"
                >
                  contacto@kairos-dev.com
                </a>
              </li>
              <li>Estados Unidos • Latinoamérica • Europa</li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Síguenos
            </h4>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-gray-500"
        >
          &copy; 2025 Kairos Dev. Todos los derechos reservados.
        </motion.div>
      </motion.div>
    </footer>
  )
}
