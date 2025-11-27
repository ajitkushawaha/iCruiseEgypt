import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { FeaturedCruises } from '@/components/home/FeaturedCruises';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      <FeaturedCruises />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
