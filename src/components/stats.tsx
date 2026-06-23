"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "50+", label: "Proyectos" },
  { value: "30+", label: "Clientes" },
  { value: "98%", label: "Satisfacción" },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Stats() {
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
            variants={item}
            className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400"
          >
            Resultados
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-4 text-4xl font-bold text-white md:text-5xl"
          >
            Números que{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              hablan
            </span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
          >
            Hemos ayudado a decenas de empresas a transformar su presencia digital.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="grid gap-8 md:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              className="rounded-2xl border border-white/5 bg-dark-800/50 p-8 text-center backdrop-blur-sm"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent md:text-6xl">
                {s.value}
              </div>
              <div className="mt-2 text-lg text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
