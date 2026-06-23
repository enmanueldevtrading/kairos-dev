"use client"

import { motion } from "framer-motion"

const steps = [
  {
    num: "01",
    title: "Descubrimiento",
    description:
      "Analizamos tu negocio, objetivos y competencia para entender tus necesidades.",
  },
  {
    num: "02",
    title: "Estrategia",
    description:
      "Definimos la hoja de ruta, tecnologías y métricas de éxito del proyecto.",
  },
  {
    num: "03",
    title: "Diseño",
    description:
      "Creamos interfaces modernas y funcionales centradas en la experiencia del usuario.",
  },
  {
    num: "04",
    title: "Desarrollo",
    description:
      "Construimos tu solución con tecnologías de punta y mejores prácticas.",
  },
  {
    num: "05",
    title: "Lanzamiento",
    description:
      "Desplegamos, probamos y optimizamos para asegurar el mejor rendimiento.",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden py-24 md:py-32">
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
            Proceso
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-4 text-4xl font-bold text-white md:text-5xl"
          >
            Cómo{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              trabajamos
            </span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
          >
            Un proceso claro y transparente desde la idea hasta el lanzamiento.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {steps.map((s) => (
            <motion.div
              key={s.num}
              variants={item}
              className="group relative rounded-2xl border border-white/5 bg-dark-800/50 p-6 text-center backdrop-blur-sm transition-colors hover:border-violet-500/20"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-lg font-bold text-white">
                {s.num}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
