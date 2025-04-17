
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import PoemSubmissionForm from './post/PoemSubmissionForm';
import AuthForm from './auth/AuthForm';

const PoemSubmission: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <section id="submit" className="py-16 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-3 text-white">
            <span className="text-gradient">Submit Your Poem</span>
          </h2>
          <p className="text-center text-celestial-softPurple/80 mb-10 max-w-2xl mx-auto">
            Inspired by the stars? Share your astronomical poetry with our community
          </p>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-pulse h-8 w-32 bg-white/10 rounded mx-auto mb-4"></div>
              <div className="animate-pulse h-4 w-64 bg-white/10 rounded mx-auto"></div>
            </div>
          ) : user ? (
            <PoemSubmissionForm />
          ) : (
            <div>
              <p className="text-center text-celestial-softPurple/80 mb-6">
                Please sign in or create an account to submit your poem
              </p>
              <AuthForm />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PoemSubmission;
