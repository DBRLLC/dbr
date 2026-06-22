import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function SubscriptionsPage() {
  const tiers = [
    {
      name: "Observer",
      price: "Free",
      period: "",
      description: "Basic access to the Deep Blue Resources expedition archives and community updates.",
      features: [
        "Access to mission logs (24h delay)",
        "Standard community forum access",
        "Public gallery viewing",
        "Weekly newsletter"
      ],
      cta: "Start Free",
      popular: false,
      theme: "dim"
    },
    {
      name: "Engineer",
      price: "$19",
      period: "/mo",
      description: "For the technical minds following our build process and subsea designs.",
      features: [
        "Live technical briefings",
        "CAD model viewer access",
        "Early access to mission data",
        "Private discord channel",
        "Vote on engineering challenges"
      ],
      cta: "Join as Engineer",
      popular: false,
      theme: "blue"
    },
    {
      name: "Captain",
      price: "$49",
      period: "/mo",
      description: "Direct control and high-priority access to live ROV expeditions.",
      features: [
        "Real-time 4K mission feeds",
        "Priority mission queueing",
        "Direct comms with the crew",
        "Exclusive 'Captain' digital assets",
        "Early bird challenge submissions"
      ],
      cta: "Join as Captain",
      popular: true,
      theme: "telemetry"
    },
    {
      name: "Commander",
      price: "$199",
      period: "/mo",
      description: "The ultimate level of influence and access to the Deep Blue Resources fleet operations.",
      features: [
        "All Captain level features",
        "1-on-1 with mission directors",
        "Name on the fleet hull",
        "VIP physical expedition invites",
        "Custom fleet dashboard access"
      ],
      cta: "Join as Commander",
      popular: false,
      theme: "gold"
    }
  ];

  return (
    <div className="min-h-screen bg-abyss flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-16">
            <div className="inline-block px-3 py-1 border border-telemetry/30 bg-telemetry/5 rounded-full mb-6">
              <span className="text-[10px] font-mono text-telemetry tracking-[0.2em] uppercase">Fleet Access Protocols</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-syne font-extrabold text-white mb-6 uppercase tracking-tight">
              Choose Your <span className="text-led-blue">Station</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto font-light">
              95% of the ocean is unexplored. Choose your level of access and join the crew as we descend into the unknown.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div 
                key={tier.name}
                className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 group hover:-translate-y-2 ${
                  tier.popular 
                    ? "bg-gradient-to-b from-telemetry/10 to-transparent border-telemetry/30 shadow-[0_0_40px_rgba(0,232,122,0.1)]" 
                    : "bg-midnight/40 border-white/5 hover:border-white/20"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-telemetry text-black font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Most Active
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-sm font-mono text-white/50 uppercase tracking-[0.2em] mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-syne font-bold text-white">{tier.price}</span>
                    <span className="text-white/40 font-mono text-xs">{tier.period}</span>
                  </div>
                </div>

                <p className="text-sm text-muted mb-8 font-light leading-relaxed">
                  {tier.description}
                </p>

                <ul className="flex-grow space-y-4 mb-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[13px] text-white/70">
                      <svg className="w-4 h-4 mt-0.5 text-telemetry shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/join" 
                  className={`cta-primary text-center !py-4 !text-[11px] ${
                    tier.popular ? "" : "!bg-white/10 !text-white hover:!bg-white/20"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-2xl border border-white/5 bg-midnight/20 text-center">
            <h4 className="font-mono text-[10px] text-telemetry uppercase tracking-[0.3em] mb-4">Commander Protocol</h4>
            <p className="text-sm text-muted max-w-2xl mx-auto leading-relaxed">
              Looking for institutional access or private expedition sponsorship? <Link href="/contact" className="text-led-blue hover:underline">Contact our operations deck</Link> for custom fleet deployment options.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
