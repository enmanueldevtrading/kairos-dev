"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="rounded-full bg-dark-800/90 px-4 py-2 text-sm text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
        Escríbenos, respondemos en &lt; 1 hora
      </span>
      <a
        href="https://wa.me/5351426569?text=Hola%2C%20quiero%20impulsar%20mi%20negocio%20con%20Kairos%20Dev"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105"
      >
        <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-30" />
        <MessageCircle className="relative h-7 w-7" />
      </a>
    </motion.div>
  )
}
