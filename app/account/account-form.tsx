'use client';
import { useCallback, useEffect } from 'react';
import { createClient } from '../../utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  fullname: z.string().min(5, {
    message: 'Name must be at least 5 characters.',
  }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  website: z.string().url().optional().or(z.literal('')),
  currentCity: z.string().optional(),
  avatar_url: z.string().nullable(),
});

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = React.useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      username: '',
      website: '',
      currentCity: '',
      avatar_url: null,
    },
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url, current_city`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        form.reset({
          fullname: data.full_name || '',
          username: data.username || '',
          website: data.website || '',
          currentCity: data.current_city || '',
          avatar_url: data.avatar_url,
        });
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase, form]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProfile(values);
  }

  async function updateProfile(values: z.infer<typeof formSchema>) {
    console.log('Updating profile with:', {
      id: user?.id,
      ...values,
    });
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: values.fullname,
        username: values.username,
        website: values.website,
        avatar_url: values.avatar_url,
        current_city: values.currentCity,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      console.error('Error details:', error);
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col mx-auto gap-3 o w-screen min-h-screen items-center justify-center sm:p-12 p-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 md:w-[650px] w-full p-4'
        >
          <Avatar
            uid={user?.id}
            url={form.watch('avatar_url')}
            size={150}
            onUpload={(filePath) => {
              form.setValue('avatar_url', filePath);
            }}
          />

          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Full Name' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>
                <FormDescription>This is your public username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='currentCity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current City</FormLabel>
                <FormControl>
                  <Input disabled placeholder='Current City' {...field} />
                </FormControl>
                <FormDescription>
                  A cidade em que estás afeta o que tu vês na plataforma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' variant='outline'>
            Update Profile
          </Button>
        </form>
      </Form>

      <form action='/auth/signout' method='post'>
        <Button variant='secondary' type='submit'>
          Sign out
        </Button>
      </form>
    </div>
  );
}
