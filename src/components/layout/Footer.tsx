import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
      return;
    }

    setStatus("loading");
    
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") { // Unique violation
          setStatus("success");
          setMessage("You're already on the list!");
        } else {
          throw error;
        }
      } else {
        setStatus("success");
        setMessage("Welcome to the fleet!");
        setEmail("");
      }
    } catch (err: any) {
      console.error("Newsletter error:", err);
      setStatus("error");
      setMessage("Connection failed. Try again.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 4000);
  };

  return (
    <footer className="site-footer mt-20 border-t border-white/5 bg-abyss">
      <div className="mx-auto max-w-[1280px] px-8 pb-8 pt-[60px]">
        <div className="footer-grid mb-12 grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 max-[860px]:grid-cols-1">
          <div className="footer-col">
            <Link href="/" className="footer-logo flex items-center gap-2.5 no-underline mb-6">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-full border border-led-blue/30 bg-led-blue/10"></div>
                <div className="absolute inset-[20%] rounded-full bg-led-blue"></div>
              </div>
              <span className="footer-brand-text font-heading text-[16px] sm:text-[18px] font-bold tracking-tight text-white uppercase font-syne whitespace-nowrap">
                Deep Blue <span className="hidden min-[420px]:inline">Resources</span>
              </span>
            </Link>
            <p className="footer-brand-tagline font-body text-white/50 text-sm leading-relaxed mb-8">Pioneering sustainable subsea mining for a prosperous future.</p>
            <div className="footer-social flex items-center gap-5">
              <a href="https://twitter.com/deepblueresources" target="_blank" rel="noopener" aria-label="Twitter" className="text-white/50 hover:text-led-blue transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com/@deepblueresources" target="_blank" rel="noopener" aria-label="YouTube" className="text-white/50 hover:text-led-blue transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://linkedin.com/company/deepblueresources" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-white/50 hover:text-led-blue transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="list-none p-0 space-y-3">
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">About Us</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Our Technology</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Subscriptions</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Golden Ticket</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Newsletter</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Legal</h4>
            <ul className="list-none p-0 space-y-3">
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Disclosure</Link></li>
              <li><Link href="#" className="font-body text-sm text-white/50 hover:text-led-blue transition-colors">Challenge Rules</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Stay Updated</h4>
            <p className="footer-stay-text font-body text-sm text-white/50 leading-relaxed mb-6">Join our newsletter to get the latest news and offers.</p>
            <form onSubmit={handleNewsletterSignup} className="relative group">
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={status === "success" ? message : "EMAIL ADDRESS"}
                className={`w-full bg-white/5 border px-4 py-3 font-mono text-[10px] tracking-widest transition-all duration-300 focus:outline-none ${
                  status === "success" 
                    ? "border-telemetry/50 text-telemetry placeholder:text-telemetry" 
                    : status === "error"
                    ? "border-red-500/50 text-red-400 placeholder:text-red-400"
                    : "border-white/10 text-white focus:border-led-blue/50"
                }`}
                disabled={status === "loading" || status === "success"}
                required
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`absolute right-2 top-1/2 -translate-y-1/2 transition-colors ${
                  status === "success" ? "text-telemetry" : "text-led-blue hover:text-led-bright"
                }`}
              >
                {status === "loading" ? (
                  <div className="h-4 w-4 border-2 border-led-blue border-t-transparent rounded-full animate-spin"></div>
                ) : status === "success" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom border-t border-white/5 pt-8 text-center">
          <p className="footer-copyright font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">&copy; 2026 Deep Blue Resource Media LLC. All Rights Reserved.</p>
          <p className="footer-disclaimer font-body text-[10px] text-white/20 leading-relaxed max-w-3xl mx-auto uppercase tracking-tighter">Deep Blue Resources LLC content is for entertainment and educational purposes only, not investment advice. Contests void where prohibited. Deep Blue Resources LLC is not responsible for misuse of content.</p>
        </div>
      </div>
    </footer>
  );
}
