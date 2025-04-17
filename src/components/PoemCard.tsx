
import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export interface PoemCardProps {
  date: Date;
  astronomyFact: string;
  poemTitle: string;
  poemContent: string;
  author: string;
  featured?: boolean;
}

const PoemCard: React.FC<PoemCardProps> = ({ 
  date, 
  astronomyFact, 
  poemTitle, 
  poemContent, 
  author, 
  featured = false 
}) => {
  return (
    <motion.div 
      className={`glass rounded-lg overflow-hidden ${featured ? 'md:flex' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={`p-6 md:p-8 ${featured ? 'md:w-1/2' : ''} border-b md:border-b-0 ${featured ? 'md:border-r' : ''} border-white/10`}>
        <div className="text-celestial-softPurple text-sm mb-2">
          {format(date, 'MMMM d, yyyy')}
        </div>
        <h3 className="text-xl font-medium mb-4 text-celestial-skyBlue">Astronomy Fact</h3>
        <p className="text-gray-300">{astronomyFact}</p>
      </div>
      
      <div className={`p-6 md:p-8 ${featured ? 'md:w-1/2' : ''}`}>
        <h3 className="font-playfair text-2xl text-celestial-purple mb-2">{poemTitle}</h3>
        <div className="mt-4 mb-6">
          {poemContent.split('\n').map((line, i) => (
            <p key={i} className={`${line === '' ? 'h-4' : ''} font-playfair text-gray-200 italic leading-relaxed`}>
              {line}
            </p>
          ))}
        </div>
        <div className="text-sm text-right text-celestial-softPurple">
          — {author}
        </div>
      </div>
    </motion.div>
  );
};

export default PoemCard;
