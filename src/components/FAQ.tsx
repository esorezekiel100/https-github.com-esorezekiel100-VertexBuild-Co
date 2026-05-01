import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const FAQS = [
  {
    question: 'How long does a typical construction project take?',
    answer: 'Timeline varies significantly by project scope. A luxury residential home typically takes 12-18 months, while a full renovation might take 4-8 months. We provide detailed gantt charts during the planning phase.'
  },
  {
    question: 'Do you provide free estimates and site visits?',
    answer: 'Yes! We offer a complimentary initial consultation and preliminary estimate. Detailed structural surveys and bill of quantities are part of our paid planning services.'
  },
  {
    question: 'Are you licensed and insured to work in my area?',
    answer: 'Absolutely. VertexBuild Co is fully licensed for both residential and commercial construction, and we carry comprehensive liability and workers compensation insurance.'
  },
  {
    question: 'Do you handle the building permits and city approvals?',
    answer: 'Yes, we handle the entire bureaucratic process. Our team coordinates with local architectural and zoning departments to secure all necessary permits before construction begins.'
  },
  {
    question: 'What happens if there are delays due to weather?',
    answer: 'Construction schedules always include "contingency days" for weather. We use advanced weather tracking to optimize our indoor vs outdoor phases to minimize disruptions.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-10 bg-orange-500/10 blur-3xl -z-10 rounded-full" />
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35682ff933cc?auto=format&fit=crop&q=80&w=2070" 
            alt="Construction Consultation"
            className="rounded-[2rem] md:rounded-[3rem] aspect-square object-cover border border-white/10 shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=2070';
            }}
          />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 p-6 md:p-8 bg-orange-500 rounded-2xl md:rounded-3xl shadow-2xl">
             <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">Contact Experts</h4>
             <p className="text-white font-black text-xl md:text-2xl tracking-tighter italic">Get Free Quote</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-6">Expert Solutions</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-10 md:mb-12 font-display">
            Answers to Your Construction Queries
          </h3>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  openIndex === index ? "bg-zinc-900 border-orange-500/40" : "bg-zinc-900/40 border-zinc-900"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left group"
                >
                  <span className={cn(
                    "text-sm font-black uppercase tracking-widest transition-colors",
                    openIndex === index ? "text-orange-500" : "text-zinc-400 group-hover:text-white"
                  )}>
                    {index + 1}. {faq.question}
                  </span>
                  <div className={cn(
                    "w-6 h-6 rounded flex items-center justify-center transition-colors",
                    openIndex === index ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-500"
                  )}>
                    {openIndex === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-zinc-500 text-xs font-bold leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
