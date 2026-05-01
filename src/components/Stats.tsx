import { motion } from 'motion/react';
import { CheckCircle, Users, Trophy, Target } from 'lucide-react';

const STATS = [
  { label: 'Projects Completed', value: '678+', icon: CheckCircle },
  { label: 'Happy Clients', value: '120+', icon: Users },
  { label: 'Expert Team', value: '635+', icon: Trophy },
  { label: 'Awards Won', value: '25+', icon: Target },
];

export default function Stats() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
        <div className="relative">
          <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-6">About Our Company</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8 font-display">
            Shaping the Future <br className="hidden sm:block" /> of Construction
          </h3>
          <p className="text-zinc-500 font-bold text-sm leading-relaxed max-w-md mb-10">
            We are committed to redefining the construction industry with innovative solutions, 
            cutting-edge technology, and a remarkable team of experts available for your projects.
          </p>
          <button className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-transform active:scale-95">
            All Services
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">678+</span>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Complete Projects</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">120+</span>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Team Members</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">635+</span>
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Client Reviews</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
