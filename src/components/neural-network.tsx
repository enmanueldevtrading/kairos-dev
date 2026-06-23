"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  connections: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;
    const particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 120;
    const connectionDist = isMobile ? 120 : 200;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 300 - 150,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1.5,
        connections: 0,
      });
    }

    function drawConnections(px: number, py: number, pz: number, idx: number) {
      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = px - p2.x;
        const dy = py - p2.y;
        const dz = pz - p2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.4;
          const mouseInfluence = Math.max(0, 1 - Math.sqrt(
            (mouseX - (px + p2.x) / 2) ** 2 +
            (mouseY - (py + p2.y) / 2) ** 2
          ) / 300);
          ctx!.strokeStyle = `rgba(139, 92, 246, ${alpha + mouseInfluence * 0.3})`;
          ctx!.lineWidth = 0.5 + mouseInfluence;
          ctx!.beginPath();
          ctx!.moveTo(px, py);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.stroke();
        }
      }
    }

    function drawParticle(x: number, y: number, z: number, size: number) {
      const scale = (z + 200) / 400;
      const s = size * Math.max(0.3, scale);
      const mouseDist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
      const glow = Math.max(1, 3 - mouseDist / 100);

      const grad = ctx!.createRadialGradient(x, y, 0, x, y, s * glow * 2);
      grad.addColorStop(0, "rgba(139, 92, 246, 0.9)");
      grad.addColorStop(0.3, "rgba(34, 211, 238, 0.4)");
      grad.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(x, y, s * glow * 2, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = `rgba(255, 255, 255, ${0.6 + mouseDist < 50 ? 0.4 : 0})`;
      ctx!.beginPath();
      ctx!.arc(x, y, s * 0.5, 0, Math.PI * 2);
      ctx!.fill();
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const mx = (mouseX - canvas.width / 2) * 0.0001;
        const my = (mouseY - canvas.height / 2) * 0.0001;

        p.vx += (Math.random() - 0.5) * 0.02 + mx;
        p.vy += (Math.random() - 0.5) * 0.02 + my;
        p.vz += (Math.random() - 0.5) * 0.01;

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vz *= 0.98;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.z < -150) p.z = 150;
        if (p.z > 150) p.z = -150;

        drawParticle(p.x, p.y, p.z, p.size);
        drawConnections(p.x, p.y, p.z, i);
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
