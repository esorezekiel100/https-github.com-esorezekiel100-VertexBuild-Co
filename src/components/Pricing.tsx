import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PLANS = [
  {
    name: 'Basic Plan',
    price: '$499',
    description: 'Perfect for small consultation and minor structural assessments.',
    features: [
      'Initial Site Consultation',
      'Basic Structural Report',
      'Safety Compliance Audit',
      'Phone & Email Support',
      'Project Feasibility Study'
    ],
    cta: 'Choose Plan',
    popular: false
  },
  {
    name: 'Standard Plan',
    price: '$999',
    description: 'Comprehensive package for medium-sized residential projects.',
    features: [
      'Everything in Basic',
      'Detailed Architectural 3D',
      'Material Sourcing Assistance',
      'Priority Support Line',
      'Weekly Site Inspections',
      'Budget Management Tools'
    ],
    cta: 'Choose Plan',
    popular: true
  },
  {
    name: 'Premium Plan',
    price: 'Custom',
    description: 'Full-service management for large scale commercial developments.',
    features: [
      'Everything in Standard',
      'Dedicated Project Manager',
      'Legal & Permit Handling',
      '24/7 Concierge Support',
      'Post-Construction Warranty',
      'Custom Design Workshops'
    ],
    cta: 'Get a Quote',
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-6">Pricing Plans</h2>
          <h3 className="text-5xl md:text-6xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6 font-display">
            Transparent Pricing <br className="hidden md:block" /> For Every Project
          </h3>
          <p className="mt-8 text-zinc-400 max-w-xl mx-auto text-lg">
            Choose the construction management plan that best fits your requirements and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 md:p-12 rounded-[2.5rem] border flex flex-col transition-all duration-500 group",
                plan.popular 
                  ? "bg-zinc-900 border-orange-500 shadow-2xl shadow-orange-500/10 md:-translate-y-4 z-10" 
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  Recommended
                </div>
              )}

              <div className="mb-10">
                <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">{plan.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-white tracking-tighter italic">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">/ start</span>}
                </div>
                <p className="mt-6 text-zinc-400 text-sm leading-relaxed font-medium">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4">
                    <div className="shrink-0 w-5 h-5 rounded bg-orange-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-zinc-300 text-sm font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={cn(
                  "w-full py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                  plan.popular
                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/20"
                    : "bg-white text-zinc-950 hover:bg-zinc-200"
                )}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
