'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (!user) {
        window.location.href = '/join';
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-abyss flex items-center justify-center">
        <div className="text-telemetry font-mono text-sm tracking-widest animate-pulse">
          AUTHENTICATING...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="inline-block px-3 py-1 border border-telemetry/30 bg-telemetry/5 rounded-full mb-6">
              <span className="text-[10px] font-mono text-telemetry tracking-[0.2em] uppercase">Fleet Status: Active</span>
            </div>
            <h1 className="text-4xl font-syne font-extrabold text-white mb-4 uppercase tracking-tight">
              Welcome, <span className="text-led-blue">Commander</span>
            </h1>
            <p className="text-muted text-sm font-mono opacity-50">
              ID: {user?.id}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Expedition Status', value: 'Nominal', color: 'text-telemetry' },
              { label: 'Subsea Depth', value: '0000m', color: 'text-led-blue' },
              { label: 'Crew Level', value: 'Observer', color: 'text-white' }
            ].map((stat) => (
              <div key={stat.label} className="bg-midnight/40 border border-white/5 p-6 rounded-2xl">
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className={`text-2xl font-mono font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-midnight/40 border border-white/5 p-8 rounded-2xl mb-12">
            <h2 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-6">Mission Deck</h2>
            <div className="space-y-4">
              <div className="p-4 bg-black/20 border border-white/5 rounded-lg flex items-center justify-between">
                <span className="text-sm text-white/70">Connect Subscription</span>
                <span className="text-[10px] font-mono text-yellow-500 uppercase">Pending</span>
              </div>
              <div className="p-4 bg-black/20 border border-white/5 rounded-lg flex items-center justify-between">
                <span className="text-sm text-white/70">Security Protocol Verification</span>
                <span className="text-[10px] font-mono text-telemetry uppercase">Verified</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="text-[10px] font-mono text-red-500/50 uppercase tracking-[0.2em] hover:text-red-500 transition-colors"
          >
            Terminate Session
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
