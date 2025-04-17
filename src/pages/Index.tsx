
import React, { useEffect } from 'react';
import StarBackground from '../components/StarBackground';
import HeroSection from '../components/HeroSection';
import DailyFeature from '../components/DailyFeature';
import SkyArchives from '../components/SkyArchives';
import PoemSubmission from '../components/PoemSubmission';
import { motion, useScroll, useTransform } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    document.title = "Astro-Poetry Journal | Today's Sky, Today's Soul";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarBackground />
      
      <motion.div style={{ opacity }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-celestial-purple/20 blur-[100px] -z-10" />
      
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="#" className="font-playfair font-bold text-xl text-white">Astro-Poetry</a>
          <div className="space-x-6">
            <a href="#daily" className="text-celestial-softPurple hover:text-white transition-colors">Today's Poem</a>
            <a href="#archives" className="text-celestial-softPurple hover:text-white transition-colors">Archives</a>
            <a href="#submit" className="text-celestial-softPurple hover:text-white transition-colors">Submit</a>
          </div>
        </nav>
      </header>
      
      <main>
        <HeroSection />
        <DailyFeature />
        <SkyArchives />
        <PoemSubmission />
      </main>
      
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-celestial-softPurple/70 text-sm">
            © {new Date().getFullYear()} Astro-Poetry Journal | Today's Sky, Today's Soul
          </p>
          <p className="mt-2 text-celestial-softPurple/50 text-xs">
            Connecting the cosmos with creativity, one poem at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
