'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function SupabaseAvatar({ path, fallback, ...props }) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function downloadImage() {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (path) downloadImage();
  }, [path, supabase]);

  return (
    <Avatar {...props}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
