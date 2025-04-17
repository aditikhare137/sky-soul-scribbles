
import React from 'react';
import PoemCard from './PoemCard';
import { motion } from 'framer-motion';

const DailyFeature: React.FC = () => {
  // In a real implementation, this would be fetched from an API
  const todaysData = {
    date: new Date(),
    astronomyFact: "Today Venus appears at its greatest brightness in the morning sky, shining at magnitude -4.5. The 'morning star' is 39° away from the Sun and can be seen in the eastern sky before sunrise.",
    poemTitle: "Daybreak's Diamond",
    poemContent: "In eastern skies before the dawn,\nA diamond burns through purple haze.\nVenus, bright, defies the sun—\nCelestial jewel of morning's gaze.\n\nWhile stars retreat to day's advance,\nShe stands alone, refusing night.\nLike hope that glows through circumstance,\nA brilliant point of lasting light.",
    author: "Eleanor Starfield"
  };

  return (
    <section id="daily" className="py-16 px-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-3 text-white">
          <span className="text-gradient">Today's Celestial Verse</span>
        </h2>
        <p className="text-center text-celestial-softPurple/80 mb-12 max-w-2xl mx-auto">
          Where astronomical wonders inspire poetic reflection
        </p>
        
        <div className="mt-10">
          <PoemCard 
            date={todaysData.date}
            astronomyFact={todaysData.astronomyFact}
            poemTitle={todaysData.poemTitle}
            poemContent={todaysData.poemContent}
            author={todaysData.author}
            featured={true}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default DailyFeature;
