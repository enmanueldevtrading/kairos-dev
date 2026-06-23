"use client"

import { motion } from "framer-motion"
import { LayoutGrid, ShoppingCart, AppWindow } from "lucide-react"

const designs = [
  {
    icon: LayoutGrid,
    title: "Landing Pages",
    description:
      "Páginas de alto impacto diseñadas para captar leads y convertir visitantes en clientes.",
    gradient: "from-violet-600/20 to-dark-900",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Tiendas online optimizadas para la venta, con experiencias de compra fluidas y seguras.",
    gradient: "from-cyan-600/20 to-dark-900",
  },
  {
    icon: AppWindow,
    title: "Web Apps",
    description:
      "Aplicaciones web interactivas con funcionalidades avanzadas y rendimiento excepcional.",
    gradient: "from-violet-600/10 via-cyan-600/10 to-dark-900",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function DesignShowcase() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="mb-16 text-center"
        >
          <motion.span
            variants={card}
            className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400"
          >
            Diseño Premium
          </motion.span>
          <motion.h2
            variants={card}
            className="mt-4 text-4xl font-bold text-white md:text-5xl"
          >
            Sitios web que{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              impactan
            </span>
          </motion.h2>
          <motion.p
            variants={card}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
          >
            Diseñamos experiencias digitales que convierten visitantes en clientes. Cada
            píxel cuenta.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="grid gap-8 md:grid-cols-3"
        >
          {designs.map((d) => {
            const Icon = d.icon
            return (
              <motion.div
                key={d.title}
                variants={card}
                whileHover={{ scale: 1.03 }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${d.gradient} border border-white/5 p-8 transition-shadow hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]`}
              >
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-violet-400 backdrop-blur-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{d.title}</h3>
                  <p className="leading-relaxed text-gray-400">{d.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
