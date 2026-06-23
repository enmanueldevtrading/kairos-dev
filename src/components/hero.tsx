"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      hero.style.setProperty("--mouse-x", x + "%");
      hero.style.setProperty("--mouse-y", y + "%");
    };
    hero.addEventListener("mousemove", handleMouse);
    return () => hero.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-18"
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-75"
          style={{
            background:
              "radial-gradient(600px at var(--mouse-x,50%) var(--mouse-y,50%), rgba(139,92,246,.06), transparent 60%)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-50 -right-50 h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-50 -left-50 h-[500px] w-[500px] rounded-full bg-cyan-400/8 blur-[120px]"
        />
      </div>

      <div className="container relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              Agencia Full-Stack &amp; AI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-[clamp(36px,8vw,72px)] font-bold leading-[1.05] tracking-tight"
            >
              Creamos tu<br />
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                página web
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-8 max-w-lg text-lg text-white/50 lg:mx-0"
            >
              Somos especialistas en creación de páginas web profesionales, agentes de IA, chatbots y automatizaciones para empresas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="https://wa.me/5351426569?text=Hola%2C%20quiero%20impulsar%20mi%20negocio%20con%20Kairos%20Dev"
                target="_blank"
                className="btn-gradient inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-violet-500/30 hover:shadow-xl"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contrátanos ahora
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-[400px]">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-400/10"
              />
              <div
                className="absolute -inset-1 animate-spin-slow rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, rgba(139,92,246,.3), transparent, rgba(34,211,238,.3), transparent)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
                }}
              />
              <div className="absolute inset-5 rounded-full border border-white/5 bg-dark-950/60 backdrop-blur-2xl flex flex-col items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4L28.09 16.26L40 18.18L31.24 26.12L33.8 38L24 31.5L14.2 38L16.76 26.12L8 18.18L19.91 16.26L24 4Z"
                    fill="url(#lg)"
                  />
                </svg>
                <span className="mt-3 text-xl font-bold">Kairos Dev</span>
                <span className="text-sm text-white/40">Full-Stack &amp; AI Agency</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
