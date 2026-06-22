'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

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
    <nav className="site-nav fixed top-0 left-0 right-0 z-[1000] border-b border-white/5 bg-black/40 backdrop-blur-md">
      {/* Navigation Progress Bar */}
      {isNavigating && (
        <div className="absolute top-0 left-0 h-[2px] bg-led-blue animate-progress-fast z-[1001]"></div>
      )}
      
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-8">
        <div className="flex-1 flex items-center">
          <Link href="/" className="nav-brand flex shrink-0 items-center gap-2.5 no-underline">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full border border-led-blue/30 bg-led-blue/10"></div>
              <div className="absolute inset-[20%] rounded-full bg-led-blue"></div>
            </div>
            <span className="nav-brand-text font-heading text-[18px] font-bold tracking-tight text-white uppercase font-syne">
              Deep Blue
            </span>
          </Link>
        </div>

        <ul className="nav-links m-0 flex list-none items-center gap-6 p-0 max-[1024px]:hidden">
          <li><Link href="/about" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">About</Link></li>
          <li><Link href="/technology" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Technology</Link></li>
          <li><Link href="/subscriptions" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Subscriptions</Link></li>
          <li><Link href="/challenges" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Challenges</Link></li>
          <li><Link href="/milestones" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">Milestones</Link></li>
        </ul>

        <div className="nav-actions flex-1 flex items-center justify-end gap-6">
          {loading ? (
            <div className="h-4 w-20 bg-white/5 animate-pulse rounded"></div>
          ) : user && !isNavigating ? (
            <div className="flex items-center gap-6">
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
            <div className="flex items-center gap-6">
              <Link href="/login" className="font-mono text-[11px] uppercase tracking-widest text-white/70 no-underline hover:text-telemetry transition-colors">
                Login
              </Link>
              <Link href="/join" className="cta-primary !px-6 !py-2.5 !text-[10px]">
                Join Free
              </Link>
            </div>
          ) : (
            /* Keep existing state visible during navigation to prevent flicker */
            <div className="h-4 w-20 bg-white/5 animate-pulse rounded"></div>
          )}
        </div>

        <button className="nav-mobile-toggle hidden cursor-pointer border-none bg-none p-1.5 text-white max-[1024px]:flex" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
}
