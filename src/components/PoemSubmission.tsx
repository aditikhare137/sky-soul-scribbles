
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const PoemSubmission: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    toast({
      title: "Poem submitted!",
      description: "Thank you for your contribution to Astro-Poetry Journal.",
    });
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  required
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                  className="bg-white/5 border-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="poem-title">Poem Title</Label>
              <Input
                id="poem-title"
                placeholder="Enter the title of your poem"
                required
                className="bg-white/5 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="astronomy-connection">
                Astronomy Connection
              </Label>
              <Input
                id="astronomy-connection" 
                placeholder="What celestial event or astronomy fact inspired your poem?"
                required
                className="bg-white/5 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="poem">Your Poem</Label>
              <Textarea
                id="poem"
                placeholder="Share your poetry here..."
                required
                className="min-h-[150px] bg-white/5 border-white/20"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-celestial-purple hover:bg-celestial-secondaryPurple px-6"
              >
                Submit Poem
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default PoemSubmission;
