import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useFirestoreCollection } from '@/src/hooks/useFirestoreCollection';
import { orderBy } from 'firebase/firestore';

const INITIAL_PROJECTS = [
  {
    id: '1',
    title: 'Modern Villa',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070',
    description: 'A contemporary residential project featuring open spaces and sustainable materials.',
    ratio: 'aspect-[3/4]'
  },
  {
    id: '2',
    title: 'Corporate HQ',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    description: 'High-tech corporate headquarters with integrated smart building solutions.',
    ratio: 'aspect-video'
  },
  {
    id: '3',
    title: 'Luxury Apartments',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2070',
    description: 'Premium apartment complex in the heart of the city.',
    ratio: 'aspect-[4/5]'
  },
  {
    id: '4',
    title: 'Industrial Hub',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f4369f4?auto=format&fit=crop&q=80&w=2070',
    description: 'A large-scale industrial facility designed for maximum efficiency.',
    ratio: 'aspect-square'
  },
  {
    id: '5',
    title: 'Minimalist Studio',
    category: 'Renovation',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070',
    description: 'Renovation of an old warehouse into a minimalist photography studio.',
    ratio: 'aspect-[3/2]'
  },
  {
    id: '6',
    title: 'Eco Friendly Home',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2070',
    description: 'A sustainable living space utilizing solar energy and rainwater harvesting.',
    ratio: 'aspect-[3/4]'
  }
];

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Renovation'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: projects } = useFirestoreCollection('projects', INITIAL_PROJECTS, orderBy('createdAt', 'desc'));

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter((p: any) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[420px_1fr] gap-24">
        <div className="lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mb-6">Our Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-black text-zinc-950 leading-[0.85] uppercase tracking-tighter mb-10 font-display">
              Architectural <br className="hidden sm:block" /> masterpieces <br className="hidden sm:block" /> in focus
            </h3>
            <p className="text-zinc-500 mb-12 max-w-sm leading-relaxed font-medium">
              We bring decades of experience to every project, ensuring that aesthetic vision meets structural integrity.
            </p>
            <div className="flex flex-wrap gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-zinc-950 text-white shadow-xl shadow-zinc-900/20" 
                      : "bg-zinc-100 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="group relative px-12 py-5 bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-500/40 active:scale-95">
              <span className="relative z-10">Download Catalog</span>
              <div className="absolute inset-0 bg-zinc-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>

        <motion.div 
          layout
          className="columns-1 md:columns-2 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any, index: number) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-zinc-100 mb-8 border border-zinc-100"
              >
                <div className={cn(
                  "relative overflow-hidden",
                  project.ratio || (index % 3 === 0 ? "aspect-[4/3]" : index % 3 === 1 ? "aspect-[3/4]" : "aspect-square")
                )}>
                  <img 
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=2070'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=2070';
                    }}
                  />
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="overflow-hidden">
                    <motion.span 
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                      className="inline-block text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-3"
                    >
                      {project.category}
                    </motion.span>
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-3 transform transition-transform duration-500 delay-75">{project.title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed max-w-xs font-medium transform transition-transform duration-500 delay-150">
                    {project.description}
                  </p>
                  
                  <div className="h-px w-0 bg-orange-500/50 mt-6 group-hover:w-full transition-all duration-1000 delay-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
