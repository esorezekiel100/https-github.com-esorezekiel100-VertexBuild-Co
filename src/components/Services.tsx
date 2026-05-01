import { Home, Building2, HardHat, Ruler, Paintbrush, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const SERVICES = [
  {
    title: 'Interior Design',
    description: 'We build beautiful, modern homes tailored to your lifestyle and future needs.',
    icon: Paintbrush
  },
  {
    title: 'Building Architecture',
    description: 'Expert construction services for offices, retail hubs, and industrial spaces.',
    icon: Building2
  },
  {
    title: 'Flooring Installation',
    description: 'Breathe new life into your existing structures with our premium restoration services.',
    icon: Ruler
  },
  {
    title: 'House Renovation',
    description: 'Full oversight from planning to completion, ensuring quality and timelines.',
    icon: Home
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Export Solutions</h2>
          <h3 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter leading-tight uppercase font-display">
            Provide Quality Services
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-12 bg-white hover:bg-zinc-50 transition-all flex flex-col items-center text-center last:border-r-0"
            >
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:text-orange-500 transition-all mb-8">
                <service.icon className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-zinc-950 mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tighter">
                {service.title}
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed font-bold tracking-tight">
                {service.description}
              </p>
              <button className="mt-8 text-[10px] font-black text-zinc-950 uppercase tracking-widest border-b-2 border-orange-500 pb-1">
                Read More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
