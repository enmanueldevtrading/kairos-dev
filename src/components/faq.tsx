"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="mb-16 text-center"
        >
          <motion.span
            variants={item}
            className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-4 text-4xl font-bold text-white md:text-5xl"
          >
            Preguntas{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              frecuentes
            </span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-4 text-lg text-gray-400"
          >
            Respuestas rápidas a las dudas más comunes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                variants={item}
                className="group rounded-2xl border border-white/5 bg-dark-800/50 backdrop-blur-sm transition-colors hover:border-violet-500/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-white md:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/5 px-6 pb-5 pt-4">
                        <p className="text-gray-400">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
