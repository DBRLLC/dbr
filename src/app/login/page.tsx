'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

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
      setMessage({ type: 'success', text: 'Access code sent to your email.' });
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    if (error) {
      setLoading(false);
      setMessage({ type: 'error', text: error.message });
      return;
    }

    if (data.user) {
      // Ensure they are in the subscribers table
      await supabase
        .from('subscribers')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          updated_at: new Date().toISOString(),
        });
    }

    setLoading(false);
    setMessage({ type: 'success', text: 'Identity verified. Accessing Command Center...' });
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-abyss flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="min-h-[calc(100vh-30px)] flex flex-col items-center justify-center pt-20 px-6 relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-led-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 py-12">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 border border-led-blue/30 bg-led-blue/5 mb-6 status-badge-clipped">
              <span className="text-[10px] font-mono text-led-blue tracking-[0.2em] uppercase">Expedition Command Center</span>
            </div>
            <h1 className="text-4xl font-syne font-extrabold text-white mb-4 uppercase tracking-tight">
              Sign <span className="text-led-blue">In</span>
            </h1>
            <p className="text-muted text-sm font-light">
              Private partner portal — authorized access only.
            </p>
          </div>

          <div className="bg-midnight/40 border border-white/5 p-8 backdrop-blur-sm">
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
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-black/40 border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-led-blue/50 transition-colors font-mono text-[11px] tracking-widest placeholder:text-white/20"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cta-primary !py-4 !text-[11px] flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-pulse">REQUESTING ACCESS...</span>
                  ) : (
                    <>
                      ENTER COMMAND CENTER
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="00000000"
                    className="w-full bg-black/40 border border-white/10 px-4 py-4 text-white font-mono tracking-[0.3em] text-center focus:outline-none focus:border-led-blue/50 transition-colors"
                    required
                    maxLength={8}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cta-primary flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-pulse">VERIFYING...</span>
                  ) : (
                    <>
                      VERIFY IDENTITY
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="w-full text-[10px] font-mono text-white/30 uppercase tracking-widest hover:text-white/60 transition-colors"
                >
                  Change Email
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
