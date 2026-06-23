"use client"

import { motion } from "framer-motion"

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="space-y-6">
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400"
            >
              Sobre Nosotros
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold leading-tight text-white md:text-5xl"
            >
              Creamos el futuro digital de{" "}
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                tu empresa.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-gray-400">
              En Kairos Dev combinamos creatividad con tecnologías de punta para crear soluciones
              digitales que transforman negocios. Desde Miami para el mundo, llevamos tu marca al
              siguiente nivel.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-gray-400">
              Especialistas en desarrollo web, inteligencia artificial, chatbots y automatizaciones.
              Trabajamos con clientes en Estados Unidos, Latinoamérica y Europa.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <motion.div
              whileHover={{ rotate: [0, 1, -1, 0], scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 p-[2px]"
            >
              <div className="relative rounded-2xl bg-dark-900 p-8 backdrop-blur-sm md:p-12">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl font-bold text-violet-400">&lt;/&gt;</span>
                  <span className="text-lg font-semibold text-white">Global Studio</span>
                </div>
                <p className="text-gray-400">
                  Innovación sin límites. Tecnología de punta.
                </p>
                <div className="mt-6 flex gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
