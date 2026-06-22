'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AdminLoginPage() {
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Note: Admin authentication logic for Milestone 4
    // For now, we'll implement the visual shell and basic check
    try {
      // Placeholder for admin validation
      if (adminKey === 'DBR-SECURE-2026') {
        setMessage({ type: 'success', text: 'Access Granted. Initializing Command Center...' });
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirect to admin dashboard in future
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Invalid Command Key. Access Denied.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Check subsea link.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-abyss flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 border border-red-500/30 bg-red-500/5 rounded-full mb-6">
              <span className="text-[10px] font-mono text-red-500 tracking-[0.2em] uppercase">Authorized Personnel Only</span>
            </div>
            <h1 className="text-4xl font-syne font-extrabold text-white mb-4 uppercase tracking-tight">
              Command <span className="text-led-blue">Access</span>
            </h1>
            <p className="text-muted text-sm font-light">
              Enter your secure admin key to unlock the management deck.
            </p>
          </div>

          <div className="bg-midnight/40 border border-white/5 p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden">
            {/* Visual scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm font-mono relative z-20 ${
                message.type === 'success' ? 'bg-telemetry/10 text-telemetry border border-telemetry/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-6 relative z-20">
              <div>
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                  Admin Security Key
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono placeholder:text-white/10 focus:outline-none focus:border-led-blue/50 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cta-primary flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-pulse">AUTHENTICATING...</span>
                ) : (
                  <>
                    UNLOCK PANEL
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.1em]">
                Secure Protocol v4.0.8 // DBR-COMMAND-DECK
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
