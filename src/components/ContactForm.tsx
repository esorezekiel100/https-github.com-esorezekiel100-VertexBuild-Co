import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', projectType: 'Residential', message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'inquiries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-6">Contact Us</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8 font-display">
            Let's Build Your <br className="hidden sm:block" /> Future Together
          </h3>
          <p className="text-zinc-400 mb-12 text-lg leading-relaxed max-w-lg">
            Ready to start your next construction project? Get a free consultation and quote from our expert team today.
          </p>

          <div className="space-y-10">
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 transition-all group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-zinc-500 font-black text-[10px] uppercase tracking-widest mb-2">Call Support</h4>
                <p className="text-xl font-black text-white italic tracking-tight">+1 (234) 567-890</p>
                <p className="text-zinc-500 text-sm mt-1 font-bold">Available 24/7 for urgent matters</p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 transition-all group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-zinc-500 font-black text-[10px] uppercase tracking-widest mb-2">Email Inquiry</h4>
                <p className="text-xl font-black text-white italic tracking-tight">build@vertexbuild.com</p>
                <p className="text-zinc-500 text-sm mt-1 font-bold">Response within 12 business hours</p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 transition-all group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-zinc-500 font-black text-[10px] uppercase tracking-widest mb-2">Main Office</h4>
                <p className="text-xl font-black text-white italic tracking-tight">123 Industrial Way, Suite 100</p>
                <p className="text-zinc-500 text-sm mt-1 font-bold">Modern City, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 md:p-14 shadow-2xl relative">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Message Received!</h3>
              <p className="text-zinc-400 max-w-sm text-base md:text-lg">
                Thank you for reaching out. A VertexBuild specialist will contact you shortly to discuss your project.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-10 px-8 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full h-14 px-6 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-700 outline-none focus:border-orange-500 transition-colors font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full h-14 px-6 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-700 outline-none focus:border-orange-500 transition-colors font-medium"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (000) 000-0000"
                    className="w-full h-14 px-6 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-700 outline-none focus:border-orange-500 transition-colors font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full h-14 px-6 rounded-xl bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500 transition-colors appearance-none font-medium"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Renovation</option>
                    <option>Industrial Building</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Message Details</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project goals, timeline, and any specific requirements..."
                  className="w-full px-6 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-700 outline-none focus:border-orange-500 transition-colors resize-none font-medium"
                />
              </div>

              <button
                disabled={loading}
                className="w-full h-16 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 text-white font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-4"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Request Free Quote
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
