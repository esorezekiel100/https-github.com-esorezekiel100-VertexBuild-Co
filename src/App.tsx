import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { AdminProvider } from './components/AdminProvider';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-orange-500/30 selection:text-orange-500">
        <Navigation />
        
        <main>
          <Hero />
          <Gallery />
          <Services />
          <Stats />
          <Pricing />
          <FAQ />
          <Blog />
          <ContactForm />
        </main>

        <Footer />
        <AdminDashboard />
      </div>
    </AdminProvider>
  );
}
