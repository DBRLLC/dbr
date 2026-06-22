'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function JoinPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setStep('otp');
      setMessage({ type: 'success', text: 'Verification code sent to your email.' });

      // Milestone 1 Connection: Upsert user into subscribers table
      // Note: We use auth.uid() in RLS, so this will only work fully after verifyOtp
      // but we can prepare the profile entry here if needed or in a trigger.
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email', // Use 'email' type for 6-digit OTP codes
    });

    if (error) {
      setLoading(false);
      setMessage({ type: 'error', text: error.message });
      return;
    }

    if (data.user) {
      // Milestone 1 Connection: Capture user details in our secure subscribers table
      const { error: profileError } = await supabase
        .from('subscribers')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' }); // Explicitly handle conflict on ID

      if (profileError) {
        console.error('Profile creation error:', profileError.message);
      }
    }

    setLoading(false);
    setMessage({ type: 'success', text: 'Success! Redirecting to dashboard...' });
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-abyss flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 border border-telemetry/30 bg-telemetry/5 rounded-full mb-6">
              <span className="text-[10px] font-mono text-telemetry tracking-[0.2em] uppercase">Expedition Protocol</span>
            </div>
            <h1 className="text-4xl font-syne font-extrabold text-white mb-4 uppercase tracking-tight">
              Join the <span className="text-led-blue">Fleet</span>
            </h1>
            <p className="text-muted text-sm font-light">
              Enter your credentials to access the Deep Blue Resources mission deck.
            </p>
          </div>

          <div className="bg-midnight/40 border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm font-mono ${
                message.type === 'success' ? 'bg-telemetry/10 text-telemetry border border-telemetry/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {message.text}
              </div>
            )}

            {step === 'email' ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono text-white/50 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-telemetry/50 transition-colors font-body text-sm"
                    placeholder="name@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="cta-primary w-full !py-4 !text-[11px] disabled:opacity-50"
                >
                  {loading ? 'Initializing...' : 'Send Access Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-led-blue/50 transition-colors font-mono text-center text-lg tracking-[0.3em]"
                    placeholder="00000000"
                    maxLength={8}
                  />
                  <p className="mt-3 text-[10px] text-white/30 font-light text-center">
                    Check your inbox for the 8-digit access code.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="cta-primary w-full !py-4 !text-[11px] disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify & Enter'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="w-full text-[10px] font-mono text-white/30 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Back to Email
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">
              Secured by Subsea RLS Protocol v4.0
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
