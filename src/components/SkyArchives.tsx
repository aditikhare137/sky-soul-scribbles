
import React, { useState } from 'react';
import PoemCard from './PoemCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';

const SkyArchives: React.FC = () => {
  // This would be fetched from an API in a real implementation
  const archiveData = [
    {
      date: new Date('2025-04-16'),
      astronomyFact: "A partial lunar eclipse is visible across Asia and parts of Europe tonight. Approximately 35% of the Moon's surface will be covered by Earth's shadow.",
      poemTitle: "Partial Shadow",
      poemContent: "Moon wears a veil of Earth's curved shade,\nA crescent bite on silver plate.\nHalf-light speaks of borders made—\nNot wholly dark, not fully bright.\n\nSo too are we in partial light,\nEclipsed by doubts we cannot name.\nBut even shadows promise dawn,\nAnd wholeness after midnight's claim.",
      author: "Marcus Chen"
    },
    {
      date: new Date('2025-04-15'),
      astronomyFact: "Mars and Jupiter appear within 0.5° of each other in the evening sky today, creating a striking conjunction visible to the naked eye. This celestial meetup happens near the bright star Antares.",
      poemTitle: "Red Meets Giant",
      poemContent: "Mars and Jupiter dance tonight,\nRed passion meets jovial light.\nRivals or lovers in starlit space—\nAmbition and wisdom in close embrace.\n\nAgainst velvet backdrop they converge,\nWarm ochre and amber verge.\nReminds us how opposites often need\nEach other's orbit to fully succeed.",
      author: "Aria Nightshade"
    },
    {
      date: new Date('2025-04-14'),
      astronomyFact: "The Lyrid meteor shower has begun, increasing in activity before peaking on April 22. These meteors are fragments of Comet Thatcher, which orbits the sun once every 415 years.",
      poemTitle: "April's Arrows",
      poemContent: "Four centuries of silent flight,\nBefore returning to our sight.\nThatcher's children streak the sky—\nMomentary lines that swiftly die.\n\nWhat patience have these cosmic seeds,\nTo journey centuries before they bleed\nTheir light across our April view,\nReminding us how time burns too.",
      author: "Julian Storey"
    },
  ];

  const [visibleCount, setVisibleCount] = useState(2);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, archiveData.length));
  };

  return (
    <section id="archives" className="py-16 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-3 text-white">
            <span className="text-gradient">Sky Archives</span>
          </h2>
          <p className="text-center text-celestial-softPurple/80 mb-8 max-w-2xl mx-auto">
            Explore previous celestial moments and their poetic echoes
          </p>
          
          <div className="flex justify-center mb-12">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Filter by Date</span>
            </Button>
          </div>
        </motion.div>
        
        <div className="space-y-8">
          {archiveData.slice(0, visibleCount).map((poem, index) => (
            <PoemCard
              key={index}
              date={poem.date}
              astronomyFact={poem.astronomyFact}
              poemTitle={poem.poemTitle}
              poemContent={poem.poemContent}
              author={poem.author}
            />
          ))}
        </div>
        
        {visibleCount < archiveData.length && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={loadMore}
              className="bg-celestial-purple hover:bg-celestial-secondaryPurple"
            >
              Load More Entries
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkyArchives;
