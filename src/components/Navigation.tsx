import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Hammer, User, Compass, ChevronRight } from 'lucide-react';
import { auth } from '@/src/lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { cn } from '@/src/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-700 ease-in-out border-b',
        isScrolled 
          ? 'bg-zinc-950/80 backdrop-blur-3xl border-white/5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
          : 'bg-zinc-950 border-b border-white/10 py-10'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center gap-5 group transition-all duration-500 hover:scale-[1.01] active:scale-95 text-left relative">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 group-hover:border-orange-500/50 transition-colors duration-500 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              >
                <Compass className="w-6 h-6 text-orange-500" />
              </motion.div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-lg flex items-center justify-center border-2 border-zinc-950">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="flex flex-col -space-y-2 pt-1 transition-transform duration-500 group-hover:translate-x-1">
            <span className="text-3xl font-black tracking-tighter text-white leading-none">
              VERTEX<span className="text-orange-500 italic">BUILD</span>
            </span>
            <span className="text-[10px] font-black text-white/20 tracking-[1em] uppercase ml-1 group-hover:text-orange-500/60 transition-all duration-700">Construction</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-14">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-all duration-500 group/link"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute -bottom-5 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-500 ease-out group-hover/link:w-full rounded-full opacity-0 group-hover/link:opacity-100 shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {user ? (
            <div className="flex items-center gap-8">
              <button
                onClick={logout}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-rose-500 transition-all duration-300"
              >
                Sign Out
              </button>
              <div className="relative group/avatar cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-white/5 p-1 overflow-hidden transition-all duration-700 group-hover/avatar:border-orange-500/40 group-hover/avatar:scale-105 shadow-2xl">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700"><User className="w-5 h-5" /></div>
                  )}
                </div>
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-zinc-950 rounded-full" />
              </div>
            </div>
          ) : (
            <button
              onClick={login}
              className="relative group px-12 py-4 bg-white text-zinc-950 text-[11px] font-black uppercase tracking-[0.4em] rounded-full transition-all duration-700 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-zinc-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                Start Project
                <motion.span 
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-orange-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </span>
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Compass className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                    VERTEX<span className="text-orange-500">BUILD</span>
                  </span>
                  <span className="text-[8px] font-black text-white/20 tracking-[1em] uppercase ml-0.5">Construction</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black text-white uppercase tracking-tighter hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="p-10 border-t border-white/5 flex flex-col gap-6">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-orange-500/50 p-0.5 overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm tracking-tight">{user.displayName || 'User'}</p>
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={logout} className="text-rose-500 font-black uppercase text-[10px] tracking-widest">Sign Out</button>
                </div>
              ) : (
                <button
                  onClick={() => { login(); setIsOpen(false); }}
                  className="w-full py-5 bg-white text-zinc-950 font-black uppercase tracking-[0.3em] text-xs rounded-full"
                >
                  Start A Project
                </button>
              )}
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                <span>London / Dubai / NY</span>
                <span>© 2024</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
