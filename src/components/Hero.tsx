import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ShieldCheck, Clock, Users, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    title: 'Building The Future Of',
    highlight: 'Urban Living',
    description: 'Specializing in high-end commercial skyscrapers and sustainable urban developments that redefine metropolitan skylines.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
    title: 'Excellence In Premium',
    highlight: 'Residential Design',
    description: 'Crafting bespoke luxury villas and residential estates with meticulous attention to detail and unparalleled craftsmanship.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f4369f4?auto=format&fit=crop&q=80&w=2070',
    title: 'Industrial Strength &',
    highlight: 'Precision Engineering',
    description: 'Delivering complex industrial facilities and infrastructure projects with technical expertise and safety as our core priority.'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative h-[calc(100vh-104px)] min-h-[700px] flex items-center overflow-hidden bg-zinc-950">
      {/* Parallax Background Layer */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={SLIDES[currentSlide].image}
              alt="Construction Background"
              className="w-full h-full object-cover"
              decoding="async"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=2070';
              }}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-zinc-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/20 border border-orange-500/50 text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
            >
              Established 2012
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 uppercase font-display"
            >
              {SLIDES[currentSlide].title} <br />
              <span className="text-orange-500 italic">{SLIDES[currentSlide].highlight}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl mb-10 md:mb-12 font-medium"
            >
              {SLIDES[currentSlide].description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <button className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] rounded shadow-2xl shadow-orange-500/40 transition-all active:scale-95 flex items-center justify-center gap-3 group">
                Discover More
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-black uppercase tracking-widest text-[11px] rounded border border-white/20 transition-all active:scale-95">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute right-6 md:right-12 bottom-44 md:top-1/2 md:-translate-y-1/2 z-30 flex md:flex-col gap-4">
        <button 
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Carousel Progress Indicators (Dots) */}
      <div className="absolute left-6 md:left-12 bottom-44 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 transition-all duration-700 rounded-full",
              currentSlide === i ? "w-8 md:w-12 bg-orange-500" : "w-2 md:w-3 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>

      {/* Bottom Features Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-white z-20 hidden sm:block">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3">
          <div className="flex items-center gap-4 px-6 md:px-10 py-6 md:py-8 border-r border-zinc-100 hover:bg-orange-500 group transition-colors cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-zinc-100 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-zinc-950 group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 group-hover:text-white mb-1">Building with Integrity</h4>
              <p className="text-[8px] md:text-[9px] font-bold text-zinc-400 group-hover:text-white/70 tracking-[0.3em] uppercase">Quality Guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 md:px-10 py-6 md:py-8 border-r border-zinc-100 bg-orange-500 group transition-colors cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-white/20 flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white mb-1">Delivering Quality Projects</h4>
              <p className="text-[8px] md:text-[9px] font-bold text-white/70 tracking-[0.3em] uppercase">On-Time Completion</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 md:px-10 py-6 md:py-8 hover:bg-orange-500 group transition-colors cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-zinc-100 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-zinc-950 group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950 group-hover:text-white mb-1">Shaping Modern Spaces</h4>
              <p className="text-[8px] md:text-[9px] font-bold text-zinc-400 group-hover:text-white/70 tracking-[0.3em] uppercase">Expert Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


