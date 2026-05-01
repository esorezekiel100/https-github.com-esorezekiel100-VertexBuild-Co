import { Hammer, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Hammer className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic font-display">
                VERTEX<span className="text-orange-500">BUILD</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Premium architectural and construction services for the bold and visionaries. 
              We build structures that stand the test of time and redefine modern living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-orange-500 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-orange-500 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-orange-500 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-orange-500 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Projects', 'Services', 'Pricing', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-zinc-500 text-sm hover:text-orange-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex flex-col">
                <span className="text-zinc-700 font-bold uppercase text-[10px] tracking-widest mb-1">Phone</span>
                <span className="text-zinc-400 font-medium">+1 (234) 567-890</span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-700 font-bold uppercase text-[10px] tracking-widest mb-1">Email</span>
                <span className="text-zinc-400 font-medium">hello@vertexbuild.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-700 font-bold uppercase text-[10px] tracking-widest mb-1">Office</span>
                <span className="text-zinc-400 font-medium leading-relaxed">
                  123 Construction Ave, Suite 456<br />Modern City, NY 10001
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Work With Us</h4>
            <p className="text-zinc-500 text-sm mb-6">
              Subscribe to get latest updates and news on construction trends.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-orange-500"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6 uppercase">
          <p className="text-zinc-700 text-[10px] font-black tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} VertexBuild Co. All rights reserved.
          </p>
          <div className="flex gap-8 text-zinc-700 text-[10px] font-black tracking-widest">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:border-orange-500 transition-all group"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
