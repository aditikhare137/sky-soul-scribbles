
import React from 'react';

interface PoemContentProps {
  title: string;
  poemText: string;
}

const PoemContent: React.FC<PoemContentProps> = ({ title, poemText }) => {
  return (
    <>
      <h3 className="font-playfair text-2xl text-celestial-purple mb-2">{title}</h3>
      <div className="mt-4 mb-6">
        {poemText.split('\n').map((line, i) => (
          <p key={i} className={`${line === '' ? 'h-4' : ''} font-playfair text-gray-200 italic leading-relaxed`}>
            {line}
          </p>
        ))}
      </div>
    </>
  );
};

export default PoemContent;
