import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Tenders from '@/components/Tenders';
import Projects from '@/components/Projects';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Partners from '@/components/Partners';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Tenders />
        <Projects />
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <Partners />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
