
import React, { useEffect, useState } from 'react';
import StarBackground from '../components/StarBackground';
import HeroSection from '../components/HeroSection';
import DailyFeature from '../components/DailyFeature';
import SkyArchives from '../components/SkyArchives';
import PoemSubmission from '../components/PoemSubmission';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '../components/auth/UserAvatar';
import AuthForm from '../components/auth/AuthForm';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const { user, profile, signOut, loading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    document.title = "Astro-Poetry Journal | Today's Sky, Today's Soul";
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarBackground />
      
      <motion.div style={{ opacity }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-celestial-purple/20 blur-[100px] -z-10" />
      
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20">
        <nav className="flex justify-between items-center max-w-7xl mx-auto p-4">
          <a href="#" className="font-playfair font-bold text-xl text-white">Astro-Poetry</a>
          <div className="space-x-6">
            <a href="#daily" className="text-celestial-softPurple hover:text-white transition-colors">Today's Poem</a>
            <a href="#archives" className="text-celestial-softPurple hover:text-white transition-colors">Archives</a>
            <a href="#aditi" className="text-celestial-softPurple hover:text-white transition-colors">Aditi's Corner</a>
            <a href="#community" className="text-celestial-softPurple hover:text-white transition-colors">Community</a>
            <a href="#submit" className="text-celestial-softPurple hover:text-white transition-colors">Submit</a>
          </div>
          
          <div>
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0">
                    <UserAvatar profile={profile} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-celestial-darkPurple border-celestial-purple/20">
                  <DropdownMenuLabel className="text-celestial-softPurple">
                    {profile?.username || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-white/10 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-celestial-softPurple border-celestial-softPurple/30 hover:bg-celestial-purple/20"
                onClick={() => setAuthDialogOpen(true)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
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
      
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md bg-celestial-darkPurple border-celestial-purple/20">
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
