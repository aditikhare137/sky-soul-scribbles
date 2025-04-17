
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  astroFact: z.string().min(10, "Astronomy fact must be at least 10 characters").max(500, "Astronomy fact is too long"),
  poemText: z.string().min(10, "Poem must be at least 10 characters").max(2000, "Poem is too long"),
});

type FormValues = z.infer<typeof formSchema>;

const PoemSubmissionForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      astroFact: "",
      poemText: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a poem",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: values.title,
            astro_fact: values.astroFact,
            poem_text: values.poemText,
            author_id: user.id,
            likes_count: 0,
            reposts_count: 0
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Poem submitted!",
        description: "Thank you for your contribution to Astro-Poetry Journal.",
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poem Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the title of your poem"
                  className="bg-white/5 border-white/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="astroFact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Astronomy Connection</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What celestial event or astronomy fact inspired your poem?"
                  className="bg-white/5 border-white/20 min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="poemText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Poem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your poetry here..."
                  className="bg-white/5 border-white/20 min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-celestial-purple hover:bg-celestial-secondaryPurple px-6"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Poem'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PoemSubmissionForm;
