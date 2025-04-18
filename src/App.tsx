
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "./lib/supabase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  // Check if Supabase is configured correctly
  useEffect(() => {
    if (!supabase) {
      setSupabaseError("Supabase client could not be initialized. Please check your environment variables.");
      return;
    }

    const checkSupabaseConnection = async () => {
      try {
        // A simple test query to verify the connection
        await supabase.from('posts').select('id').limit(1);
        // If no error is thrown, connection is successful
      } catch (error) {
        if (error instanceof Error) {
          setSupabaseError(`Supabase connection error: ${error.message}`);
        } else {
          setSupabaseError("Failed to connect to Supabase. Please check your configuration.");
        }
      }
    };
    
    checkSupabaseConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {supabaseError || !supabase ? (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertTitle>Supabase Connection Error</AlertTitle>
              <AlertDescription>
                {supabaseError || "Supabase client could not be initialized."}
                <p className="mt-2 text-sm">
                  Make sure you've set up Supabase correctly and added your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
                  in the Lovable Supabase integration settings.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/post/:id" element={<PostDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
