'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

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
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setCurrentCity(data.current_city);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    fullname,
    username,
    website,
    avatar_url,
    currentCity,
  }: {
    fullname: string | null;
    username: string | null;
    website: string | null;
    avatar_url: string | null;
    currentCity: string | null;
  }) {
    console.log('Updating profile with:', {
      id: user?.id,
      fullname,
      username,
      website,
      avatar_url,
      currentCity,
    });
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        current_city: currentCity,
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
    <div className="form-widget bg-slate-200 flex flex-col mx-auto p-8 gap-3">
      <Avatar
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({
            fullname,
            username,
            website,
            avatar_url: url,
            currentCity,
          });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email || ''} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="currentCity">Current City</label>
        <input
          id="currentCity"
          type="text"
          value={currentCity || ''}
          disabled
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({
              fullname,
              username,
              website,
              avatar_url,
              currentCity,
            })
          }
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
