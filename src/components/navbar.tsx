"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm text-white/50 transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block rounded-lg px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-18 border-b border-white/5 bg-dark-950/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3 text-lg font-bold">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <rect
              x="2"
              y="2"
              width="32"
              height="32"
              rx="8"
              stroke="url(#lg)"
              strokeWidth="1.5"
              fill="rgba(139,92,246,.06)"
            />
            <text
              x="18"
              y="24"
              fontSize="20"
              fontWeight="700"
              fill="url(#lg)"
              textAnchor="middle"
              fontFamily="system-ui"
            >
              K
            </text>
          </svg>
          <span>
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              Kairos
            </span>{" "}
            <span className="text-white">Dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="#servicios">Servicios</NavLink>
          <NavLink href="#portafolio">Portafolio</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <a
            href="https://wa.me/5351426569?text=Hola%2C%20quiero%20impulsar%20mi%20negocio%20con%20Kairos%20Dev"
            target="_blank"
            className="rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-b border-white/5 bg-dark-950/95 backdrop-blur-2xl"
      >
        <div className="space-y-1 px-6 py-4">
          <MobileLink href="#servicios" onClick={() => setOpen(false)}>
            Servicios
          </MobileLink>
          <MobileLink href="#portafolio" onClick={() => setOpen(false)}>
            Portafolio
          </MobileLink>
          <MobileLink href="#faq" onClick={() => setOpen(false)}>
            FAQ
          </MobileLink>
          <a
            href="https://wa.me/5351426569?text=Hola%2C%20quiero%20impulsar%20mi%20negocio%20con%20Kairos%20Dev"
            target="_blank"
            className="mt-4 block rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
