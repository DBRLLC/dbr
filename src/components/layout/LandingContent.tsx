"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function LandingContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = containerRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {/* ── SECTION 2: MACHINES ── */}
      <section id="machines">
        <div className="section-inner">
          <div className="telemetry-divider reveal">
            <div className="tele-line"></div>
            <div className="tele-label">Sector 02 // Fleet</div>
            <div className="depth-marker">↓ 1500m</div>
            <div className="tele-line"></div>
          </div>

          <div className="machines-grid">
            <div className="machines-copy reveal">
              <h2>Built to Endure. Engineered to Explore.</h2>
              <p>We don&apos;t buy off-the-shelf equipment. Deep Blue designs, fabricates, and deploys our own fleet of state-of-the-art ROVs and autonomous subsea drones. Built to withstand crushing pressures that would flatten steel, our tech is the lens through which humanity will finally witness the abyssal plains.</p>
            </div>

            <div className="machines-visual reveal" role="img" aria-label="ROV fleet under stadium lights">
              <div className="machines-visual-corner corner-tl"></div>
              <div className="machines-visual-corner corner-tr"></div>
              <div className="machines-visual-corner corner-bl"></div>
              <div className="machines-visual-corner corner-br"></div>
              <div className="rov-silhouette">
                <svg width="260" height="160" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="70" y="55" width="120" height="60" rx="4" fill="rgba(10,143,209,0.08)" stroke="rgba(10,143,209,0.25)" strokeWidth="1"/>
                  <rect x="30" y="65" width="36" height="16" rx="2" fill="rgba(10,143,209,0.06)" stroke="rgba(10,143,209,0.2)" strokeWidth="1"/>
                  <circle cx="30" cy="73" r="8" fill="rgba(10,143,209,0.05)" stroke="rgba(10,143,209,0.2)" strokeWidth="1"/>
                  <rect x="194" y="65" width="36" height="16" rx="2" fill="rgba(10,143,209,0.06)" stroke="rgba(10,143,209,0.2)" strokeWidth="1"/>
                  <circle cx="230" cy="73" r="8" fill="rgba(10,143,209,0.05)" stroke="rgba(10,143,209,0.2)" strokeWidth="1"/>
                  <rect x="85" y="48" width="90" height="8" rx="1" fill="rgba(10,143,209,0.15)" stroke="rgba(10,143,209,0.3)" strokeWidth="0.5"/>
                  <circle cx="100" cy="52" r="2" fill="rgba(26,180,255,0.9)" />
                  <circle cx="115" cy="52" r="2" fill="rgba(26,180,255,0.8)" />
                  <circle cx="130" cy="85" r="14" fill="rgba(2,6,8,0.8)" stroke="rgba(10,143,209,0.3)" strokeWidth="1"/>
                </svg>
              </div>
              <div className="led-beam"></div>
              <div className="machines-visual-label">ROV-01 // FLEET CONFIGURATION // ACTIVE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PIPELINE ── */}
      <section id="pipeline">
        <div className="section-inner">
          <div className="telemetry-divider reveal">
            <div className="tele-line"></div>
            <div className="tele-label">Sector 03 // Pipeline</div>
            <div className="depth-marker">↓ 3000m</div>
            <div className="tele-line"></div>
          </div>

          <div className="pipeline-header reveal">
            <h2>The Deep Blue Development Pipeline</h2>
          </div>

          <div className="pipeline-phases">
            <div className="phase reveal">
              <div className="phase-num">Phase 01</div>
              <h3>The Concept Drop</h3>
              <p>We scour the globe for radical marine engineering concepts.</p>
              <div className="phase-connector"></div>
            </div>
            <div className="phase reveal">
              <div className="phase-num">Phase 02</div>
              <h3>The Prototype Duel</h3>
              <p>We build and stress-test scaled prototypes entirely in-house. No external shipping, no delays.</p>
              <div className="phase-connector"></div>
            </div>
            <div className="phase reveal">
              <div className="phase-num">Phase 03</div>
              <h3>Deployment</h3>
              <p>The winning model is fully fabricated and added to the expedition fleet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: EXPERIENCE ── */}
      <section id="experience">
        <div className="section-inner">
          <div className="telemetry-divider reveal">
            <div className="tele-line"></div>
            <div className="tele-label">Sector 04 // Mission</div>
            <div className="depth-marker">↓ 4500m</div>
            <div className="tele-line"></div>
          </div>

          <div className="experience-viewport reveal" role="img" aria-label="ROV camera view of ocean floor">
            <div className="viewport-overlay">
              <div className="hud-crosshair">
                <div className="hud-circle"></div>
              </div>
            </div>
            <div className="viewport-label">ROV-01 // LIVE FEED // HYDROTHERMAL ZONE</div>
            <div className="viewport-coords">LAT 27.4°N // LON 111.2°W // ALT +2.4m</div>
          </div>

          <div className="experience-copy">
            <h2 className="reveal">Stop Watching from the Surface.</h2>
            <p className="reveal">This isn&apos;t a documentary. This is a live, high-stakes expedition into a world that is just now starting to be explored. As a passenger on Deep Blue missions, you aren&apos;t a tourist — you are part of the crew, operating alongside our engineers as our drones capture the unknown in real-time.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CHALLENGE ── */}
      <section id="challenge">
        <div className="section-inner">
          <div className="telemetry-divider reveal">
            <div className="tele-line"></div>
            <div className="tele-label">Sector 05 // Challenge</div>
            <div className="depth-marker">↓ 6000m</div>
            <div className="tele-line"></div>
          </div>

          <div className="challenge-inner">
            <div className="challenge-copy">
              <h2 className="reveal">The Global Engineering Challenge</h2>
              <p className="reveal">The world&apos;s top engineering schools are now competing — IIT versus MIT versus ETH Zurich — to design the next generation of subsea tools. Student teams submit real solutions to real ocean problems. Subscribers vote on the winners. Gold backs the prize pool.</p>
              <div className="challenge-hook reveal">Students compete. Subscribers decide. Gold funds the prize.</div>
              <div className="reveal" style={{ marginTop: '36px' }}>
                <Link href="/join" className="cta-primary">Enter the Challenge</Link>
              </div>
            </div>

            <div className="challenge-map reveal" role="img" aria-label="Global map with university competition nodes">
              <div className="map-node" style={{ top: '28%', left: '22%' }}></div>
              <div className="map-node" style={{ top: '35%', left: '48%' }}></div>
              <div className="map-node" style={{ top: '30%', left: '72%' }}></div>
              <div className="map-node" style={{ top: '55%', left: '65%' }}></div>
              <div className="map-node" style={{ top: '62%', left: '35%' }}></div>
              
              <div className="map-label" style={{ top: '18%', left: '14%' }}>MIT</div>
              <div className="map-label" style={{ top: '25%', left: '43%' }}>ETH Zurich</div>
              <div className="map-label" style={{ top: '20%', left: '67%' }}>IIT</div>
              <div className="map-label" style={{ top: '45%', left: '61%' }}>NUS</div>
              <div className="map-label" style={{ top: '52%', left: '28%' }}>UNAM</div>

              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} preserveAspectRatio="none">
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#0a8fd1" strokeWidth="0.5"/>
                <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#0a8fd1" strokeWidth="0.5"/>
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#0a8fd1" strokeWidth="0.5"/>
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#0a8fd1" strokeWidth="0.5"/>
                <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#0a8fd1" strokeWidth="0.5"/>
                <line x1="22%" y1="28%" x2="48%" y2="35%" stroke="#00e87a" strokeWidth="0.5" opacity="0.3"/>
                <line x1="48%" y1="35%" x2="72%" y2="30%" stroke="#00e87a" strokeWidth="0.5" opacity="0.3"/>
                <line x1="72%" y1="30%" x2="65%" y2="55%" stroke="#00e87a" strokeWidth="0.5" opacity="0.2"/>
              </svg>

              <div className="map-overlay-text">GLOBAL COMPETITION NETWORK // ACTIVE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: MANIFESTO ── */}
      <section id="manifesto">
        <div className="manifesto-inner">
          <h2 className="reveal">The abyss is waiting.<br />Will you be on board?</h2>

          <div className="reveal">
            <Link href="/join" className="cta-primary">Join Free Trial</Link>
          </div>

          <div className="tele-ticker reveal">
            <span className="ticker-item">[EXPEDITION FLEET: ACTIVE]</span>
            <span className="ticker-sep">//</span>
            <span className="ticker-item">[ALL SYSTEMS NOMINAL]</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        section {
          position: relative;
          overflow: hidden;
        }
        .section-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 100px 40px;
        }
        .telemetry-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 60px;
        }
        .tele-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(0, 232, 122, 0.2), transparent);
        }
        .tele-label {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--telemetry-dim);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .depth-marker {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          color: var(--telemetry);
          letter-spacing: 0.1em;
          opacity: 0.7;
          white-space: nowrap;
        }
        #machines {
          background: var(--midnight);
        }
        #machines::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(10, 143, 209, 0.3), transparent);
        }
        .machines-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .machines-copy h2 {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 28px;
          letter-spacing: -0.02em;
        }
        .machines-copy p {
          font-size: 16px;
          line-height: 1.75;
          color: var(--muted);
          font-weight: 300;
          font-family: var(--font-body), sans-serif;
        }
        .machines-visual {
          position: relative;
          aspect-ratio: 4/3;
          background: #000;
          overflow: hidden;
        }
        .machines-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 20%, rgba(10, 143, 209, 0.35) 0%, transparent 60%),
            radial-gradient(ellipse 30% 50% at 20% 60%, rgba(10, 143, 209, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 30% 50% at 80% 60%, rgba(10, 143, 209, 0.12) 0%, transparent 50%),
            #020608;
        }
        .rov-silhouette {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .led-beam {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-top: 90px solid rgba(10, 143, 209, 0.08);
        }
        .machines-visual-label {
          position: absolute;
          bottom: 16px; left: 16px;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          color: var(--telemetry-dim);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.6;
        }
        .machines-visual-corner {
          position: absolute;
          width: 16px; height: 16px;
          border-color: var(--telemetry-dim);
          border-style: solid;
          opacity: 0.4;
        }
        .corner-tl { top: 12px; left: 12px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 12px; right: 12px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 12px; left: 12px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 12px; right: 12px; border-width: 0 1px 1px 0; }
        #pipeline { background: var(--deep); }
        #pipeline::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0, 232, 122, 0.15), transparent);
        }
        .pipeline-header { margin-bottom: 64px; }
        .pipeline-header h2 {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--white);
          text-transform: uppercase;
        }
        .pipeline-phases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .phase {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          position: relative;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .phase:hover {
          background: rgba(10, 143, 209, 0.04);
          border-color: rgba(10, 143, 209, 0.15);
        }
        .phase-num {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--telemetry);
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0.8;
        }
        .phase h3 {
          font-family: var(--font-syne), sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .phase p {
          font-size: 14px;
          line-height: 1.7;
          color: var(--muted);
          font-weight: 300;
          font-family: var(--font-body), sans-serif;
        }
        .phase-connector {
          position: absolute;
          top: 50%; right: -1px;
          width: 2px; height: 40px;
          background: linear-gradient(to bottom, transparent, var(--telemetry-dim), transparent);
          transform: translateY(-50%);
          opacity: 0.3;
        }
        #experience { background: var(--black); }
        #experience::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(10, 143, 209, 0.2), transparent);
        }
        .experience-viewport {
          position: relative;
          height: 320px;
          background: #000;
          overflow: hidden;
          margin-bottom: 60px;
        }
        .experience-viewport::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 30% 60% at 30% 30%, rgba(10, 143, 209, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 20% 40% at 70% 50%, rgba(10, 143, 209, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(5, 40, 60, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse 60% 30% at 50% 80%, rgba(2, 30, 45, 0.9) 0%, transparent 60%),
            #000d14;
        }
        .viewport-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }
        .hud-crosshair { position: relative; width: 80px; height: 80px; }
        .hud-crosshair::before, .hud-crosshair::after {
          content: '';
          position: absolute;
          background: var(--telemetry-dim);
          opacity: 0.4;
        }
        .hud-crosshair::before { width: 100%; height: 1px; top: 50%; left: 0; transform: translateY(-50%); }
        .hud-crosshair::after { width: 1px; height: 100%; left: 50%; top: 0; transform: translateX(-50%); }
        .hud-circle {
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(0, 232, 122, 0.25);
          border-radius: 50%;
          animation: hudPulse 3s ease-in-out infinite;
        }
        @keyframes hudPulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .viewport-label {
          position: absolute;
          top: 16px; left: 20px;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          color: var(--telemetry);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.7;
          z-index: 6;
        }
        .viewport-coords {
          position: absolute;
          bottom: 16px; right: 20px;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          color: var(--telemetry-dim);
          letter-spacing: 0.1em;
          opacity: 0.5;
          z-index: 6;
        }
        .experience-copy h2 {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 28px;
          letter-spacing: -0.02em;
          max-width: 600px;
        }
        .experience-copy p {
          font-size: 16px;
          line-height: 1.75;
          color: var(--muted);
          font-weight: 300;
          max-width: 640px;
          font-family: var(--font-body), sans-serif;
        }
        #challenge { background: var(--midnight); }
        #challenge::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0, 232, 122, 0.2), transparent);
        }
        .challenge-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .challenge-copy h2 {
          font-family: var(--font-syne), sans-serif;
          font-size: clamp(24px, 3.5vw, 44px);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--white);
          margin-bottom: 28px;
          line-height: 1.0;
        }
        .challenge-copy p { font-size: 16px; line-height: 1.75; color: var(--muted); font-weight: 300; margin-bottom: 16px; font-family: var(--font-body), sans-serif; }
        .challenge-hook { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--telemetry); letter-spacing: 0.08em; margin-top: 8px; opacity: 0.9; }
        .challenge-map { position: relative; aspect-ratio: 16/10; background: #000810; overflow: hidden; }
        .challenge-map::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(5, 40, 65, 0.9) 0%, #000810 100%); }
        .map-node { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: var(--telemetry); box-shadow: 0 0 8px rgba(0, 232, 122, 0.6), 0 0 20px rgba(0, 232, 122, 0.2); }
        .map-node::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid rgba(0, 232, 122, 0.25); animation: nodeRipple 2.5s ease-in-out infinite; }
        .map-label { position: absolute; font-family: var(--font-mono), monospace; font-size: 8px; color: var(--telemetry-dim); letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; opacity: 0.7; }
        .map-overlay-text { position: absolute; bottom: 16px; left: 16px; font-family: var(--font-mono), monospace; font-size: 8px; color: var(--telemetry); letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.5; }
        #manifesto { background: linear-gradient(to bottom, var(--midnight), #000004); }
        #manifesto::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, rgba(10, 143, 209, 0.25), transparent); }
        .manifesto-inner { text-align: center; padding: 100px 40px 60px; max-width: 800px; margin: 0 auto; }
        .manifesto-inner h2 { font-family: var(--font-syne), sans-serif; font-size: clamp(28px, 4vw, 54px); font-weight: 800; line-height: 1.1; color: var(--white); margin-bottom: 48px; letter-spacing: -0.01em; }
        .tele-ticker { display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; margin-top: 60px; padding-top: 32px; border-top: 1px solid rgba(0, 232, 122, 0.08); }
        .ticker-item { font-family: var(--font-mono), monospace; font-size: 10px; color: var(--telemetry-dim); letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55; }
        .ticker-sep { color: rgba(0, 232, 122, 0.2); font-size: 14px; }
        
        @media (max-width: 768px) {
          .section-inner { padding: 70px 24px; }
          .machines-grid { grid-template-columns: 1fr; gap: 40px; }
          .machines-visual { aspect-ratio: 16/9; }
          .pipeline-phases { grid-template-columns: 1fr; gap: 0; }
          .phase-connector { display: none; }
          .challenge-inner { grid-template-columns: 1fr; gap: 40px; }
          .manifesto-inner { padding: 70px 24px 40px; }
          .tele-ticker { gap: 16px; }
        }
      `}</style>
    </div>
  );
}
