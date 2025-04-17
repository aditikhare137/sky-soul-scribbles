
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <motion.section 
      className="min-h-[80vh] flex items-center justify-center text-center p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="max-w-4xl z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-2">
            <span className="text-gradient">Astro-Poetry Journal</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-celestial-softPurple/90 italic font-playfair mt-4">
            Today's Sky, Today's Soul
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="mt-8 max-w-2xl mx-auto text-gray-300">
            Where the wonders of astronomy inspire the beauty of poetry.
            Each day, a new celestial fact paired with a poem that captures its essence.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10"
        >
          <a 
            href="#daily" 
            className="px-6 py-3 bg-celestial-purple hover:bg-celestial-secondaryPurple text-white rounded-md transition-all transform hover:scale-105 mr-4"
          >
            Today's Poem
          </a>
          <a 
            href="#archives" 
            className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-celestial-purple rounded-md transition-all transform hover:scale-105"
          >
            Explore Archives
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
