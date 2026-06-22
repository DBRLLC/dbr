'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check current auth state
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Only update user state immediately if it's NOT a sign-in/sign-out event
      // for those, we let the page redirect handle the visual change
      if (event !== 'SIGNED_IN' && event !== 'SIGNED_OUT') {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setIsNavigating(true);
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      <nav className="site-nav fixed top-0 left-0 right-0 z-[1000] border-b border-white/5 bg-black/40 backdrop-blur-md">
        {/* Navigation Progress Bar */}
        {isNavigating && (
          <div className="absolute top-0 left-0 h-[2px] bg-led-blue animate-progress-fast z-[1001]"></div>
        )}
        
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 sm:px-8">
          <div className="flex items-center shrink-0">
            <Link href="/" title="Deep Blue Resources Official" className="nav-brand flex items-center gap-2 sm:gap-2.5 no-underline">
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                <div className="absolute inset-0 rounded-full border border-led-blue/30 bg-led-blue/10"></div>
                <div className="absolute inset-[20%] rounded-full bg-led-blue"></div>
              </div>
              <span className="nav-brand-text hidden min-[480px]:inline font-heading text-[15px] sm:text-[18px] font-bold tracking-tight text-white uppercase font-syne whitespace-nowrap ml-2.5">
                Deep Blue <span className="hidden min-[640px]:inline">Resources</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center max-[1024px]:hidden px-4">
            <ul className="nav-links m-0 flex list-none items-center gap-6 p-0 whitespace-nowrap">
              <li><Link href="#" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">About</Link></li>
              <li><Link href="#" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Technology</Link></li>
              <li><Link href="#" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Subscriptions</Link></li>
              <li><Link href="#" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Challenges</Link></li>
              <li><Link href="#" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Milestones</Link></li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 sm:gap-6 shrink-0 max-[1024px]:hidden">
            {loading ? (
              <div className="h-4 w-16 sm:w-20 bg-white/5 animate-pulse rounded"></div>
            ) : user && !isNavigating ? (
              <div className="flex items-center gap-3 sm:gap-6 max-[1024px]:hidden">
                <Link href="/dashboard" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="font-mono text-[11px] uppercase tracking-widest text-red-500/70 no-underline hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : !user && !isNavigating ? (
              <div className="flex items-center gap-3 sm:gap-6">
                <Link href="/login" className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">
                  Login
                </Link>
                <Link href="/join" className="cta-primary hidden min-[540px]:flex !px-6 !py-2.5 !text-[10px] whitespace-nowrap">
                  Join Free
                </Link>
              </div>
            ) : (
              <div className="h-4 w-16 sm:w-20 bg-white/5 animate-pulse rounded"></div>
            )}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="nav-mobile-toggle hidden cursor-pointer border-none bg-none p-1.5 text-white max-[1024px]:flex max-[1024px]:order-3" 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
      <aside className={`fixed top-0 right-0 h-full w-[280px] z-[1000] bg-abyss border-l border-white/5 pt-24 px-8 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="flex flex-col gap-8 list-none p-0 m-0">
          <li><Link href="#" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 no-underline hover:text-led-blue block py-2">About</Link></li>
          <li><Link href="#" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 no-underline hover:text-led-blue block py-2">Technology</Link></li>
          <li><Link href="#" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 no-underline hover:text-led-blue block py-2">Subscriptions</Link></li>
          <li><Link href="#" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 no-underline hover:text-led-blue block py-2">Challenges</Link></li>
          <li><Link href="#" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 no-underline hover:text-led-blue block py-2">Milestones</Link></li>
          <li className="pt-4 border-t border-white/5">
            {loading ? (
              <div className="h-4 w-20 bg-white/5 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex flex-col gap-6">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-led-blue no-underline block py-2">
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-left font-mono text-[12px] uppercase tracking-[0.2em] text-red-500/70 no-underline hover:text-red-500 block py-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/70 no-underline block py-2">
                  Login
                </Link>
                <Link href="/join" onClick={() => setIsMenuOpen(false)} className="cta-primary text-center !w-full !px-0 !py-4 !text-[11px]">
                  Join Free
                </Link>
              </div>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
}
