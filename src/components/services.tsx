"use client"

import { motion } from "framer-motion"
import { Globe, Bot, MessageSquare, Cog, Palette, BarChart3 } from "lucide-react"

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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            Servicios
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-4 text-4xl font-bold text-white md:text-5xl"
          >
            Todo lo que{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              necesitas
            </span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
          >
            Soluciones completas de desarrollo web, IA y automatización para impulsar tu
            negocio.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={item}
                className="group rounded-2xl border border-white/5 bg-dark-800/50 p-6 backdrop-blur-sm transition-colors hover:border-violet-500/20"
              >
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
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
