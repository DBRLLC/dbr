"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; speed: number; size: number; opacity: number; wobble: number; wobbleSpeed: number; phase: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 0.6 + 0.15,
          size: Math.random() * 2.5 + 0.3,
          opacity: Math.random() * 0.4 + 0.05,
          wobble: Math.random() * 0.8 - 0.4,
          wobbleSpeed: Math.random() * 0.01 + 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Deep gradient wash like original
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0,10,20,0.6)');
      grad.addColorStop(0.5, 'rgba(0,20,35,0.4)');
      grad.addColorStop(1, 'rgba(0,5,12,0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.phase += p.wobbleSpeed;
        p.x += Math.sin(p.phase) * p.wobble;
        p.y -= p.speed;
        
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const isBlue = Math.random() < 0.15;
        if (isBlue) {
          ctx.fillStyle = `rgba(10,143,209,${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(200,230,255,${p.opacity * 0.5})`;
        }
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150,200,230,${p.opacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    createParticles();
    draw();

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? Math.min(scrolled / totalHeight, 1) : 0;
      const newDepth = Math.round(pct * 6000);
      setDepth(newDepth);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div id="depth-gauge" aria-hidden="true">
        <div className="gauge-label">DEPTH</div>
        <div id="depth-track">
          <div 
            id="depth-fill" 
            style={{ height: `${(depth / 6000) * 100}%` }}
          ></div>
        </div>
        <div id="depth-readout">
          {depth.toString().padStart(4, "0")}m
        </div>
      </div>

      <section id="hero">
        <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true"></canvas>

        <div className="hero-content">
          <div className="hero-eyebrow">ROV-01 // ACTIVE EXPEDITION // DEPTH NOMINAL</div>

          <h1 className="hero-title">
            DEEP<br />
            <span>BLUE</span>
          </h1>

          <p className="hero-sub">
            95% of the ocean remains unseen by human eyes. We built the machines to change that. Now, we&apos;re taking you with us.
          </p>

          <div className="hero-cta-row flex items-center gap-6">
            <Link href="/join" className="cta-primary no-underline">
              Start Free Trial
            </Link>
            <div className="hero-depth-cue font-mono text-[10px] uppercase tracking-[0.2em] text-telemetry/60">
              {depth.toString().padStart(4, "0")}m // SURFACE
            </div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <div className="scroll-cue-text">Descend</div>
          <div className="scroll-cue-line"></div>
        </div>
      </section>

      <style jsx>{`
        #depth-gauge {
          position: fixed;
          top: 50%;
          right: 24px;
          transform: translateY(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: none;
        }
        #depth-gauge .gauge-label {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--telemetry-dim);
          text-transform: uppercase;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          opacity: 0.7;
        }
        #depth-readout {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--telemetry);
          letter-spacing: 0.08em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          text-shadow: 0 0 8px rgba(0, 232, 122, 0.6);
        }
        #depth-track {
          width: 2px;
          height: 120px;
          background: rgba(0, 232, 122, 0.12);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }
        #depth-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(to top, var(--telemetry), var(--telemetry-dim));
          border-radius: 2px;
          transition: height 0.1s linear;
          box-shadow: 0 0 6px rgba(0, 232, 122, 0.5);
        }
        #hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          background: var(--black);
        }
        #hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.55;
        }
        #hero::before {
          content: '';
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 800px;
          background: radial-gradient(ellipse 40% 60% at 50% 0%, rgba(10, 143, 209, 0.22) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        #hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.7) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
          z-index: 2;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 40px;
          padding-top: 120px;
        }
        .hero-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: var(--telemetry);
          text-transform: uppercase;
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeIn 1s ease 0.3s forwards;
        }
        .hero-eyebrow::before {
          content: '▶ ';
          opacity: 0.7;
        }
        h1.hero-title {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(64px, 10vw, 128px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: var(--white);
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeInUp 1s ease 0.5s forwards;
          text-transform: uppercase;
        }
        h1.hero-title span {
          display: block;
          color: var(--led-blue);
          text-shadow: 0 0 40px rgba(10, 143, 209, 0.4), 0 0 80px rgba(10, 143, 209, 0.15);
        }
        .hero-sub {
          max-width: 560px;
          font-size: 17px;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 44px;
          opacity: 0;
          animation: fadeInUp 1s ease 0.7s forwards;
          font-family: var(--font-body), sans-serif;
        }
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeInUp 1s ease 0.9s forwards;
        }

        .hero-depth-cue {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          color: var(--telemetry-dim);
          letter-spacing: 0.15em;
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 120px 24px 60px;
          }
          .hero-cta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          #depth-gauge {
            right: 8px;
            opacity: 0.5;
          }
          h1.hero-title {
            font-size: clamp(48px, 12vw, 64px);
          }
        }
        .scroll-cue {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeIn 1.2s ease 1.4s forwards;
        }
        .scroll-cue-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--telemetry-dim), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        .scroll-cue-text {
          font-family: var(--font-mono), monospace;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: var(--telemetry-dim);
          text-transform: uppercase;
          opacity: 0.6;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </>
  );
}
