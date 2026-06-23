"use client"

import { motion } from "framer-motion"

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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-gray-500"
        >
          Tecnologías con las que trabajamos
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={container}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {techs.map((tech) => (
            <motion.span
              key={tech}
              variants={item}
              className="text-lg font-medium text-gray-500 transition-colors hover:text-gray-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
