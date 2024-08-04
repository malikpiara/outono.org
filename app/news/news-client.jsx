'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useState, useCallback, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { SupabaseAvatar } from './supabaseAvatar';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);

  // I think I should create a separate file with my main functions
  // and call them anytime I need to make my code more succint and less prone to errors.
  // Looking into useContext might also be a good idea.
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setFirstname(data.full_name.split(' ')[0]);
        setProfilePic(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase.from('posts').select(`
            *,
            profiles ( full_name, id, email, avatar_url )
        `);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setPosts(data);
      }
    } catch (error) {
      alert('Error loading data!');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile(), getPosts();
  }, [user, getProfile, getPosts]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between md:p-20 p-4 md:max-w-4xl max-w-7xl m-auto">
        <div className="w-full items-center justify-between text-black animate-in">
          {firstname && (
            <h2 className="text-3xl font-bold mb-3 tracking-tight">
              👋 Olá {firstname}, estes são os updates da semana
            </h2>
          )}

          <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">
            Resumo
          </h2>

          <div className="space-y-4">
            {posts &&
              posts.map((post, i) => (
                <div key={i} className="flex space-x-1">
                  <span>{i + 1}.</span>
                  <SummaryItem
                    key={post.id}
                    author={post.profiles.full_name}
                    option={post.option}
                    shortMessage={post.short_message}
                  />
                </div>
              ))}
          </div>

          <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">
            Detalhes
          </h2>

          <div className="space-y-8">
            {posts &&
              posts.map((post, i) => (
                <CardWithForm
                  key={post.id}
                  author={post.profiles.full_name}
                  authorEmail={post.profiles.email}
                  option={post.option}
                  shortMessage={post.short_message}
                  longMessage={post.long_message}
                  profilePic={post.profiles.avatar_url}
                />
              ))}

            <CardWithFormToShare
              onAddPost={addPost}
              name={fullname}
              email={user?.email}
              supabase={supabase}
              user={user}
              profilePic={profilePic}
            />
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}

export function CardWithForm({
  author,
  option,
  shortMessage,
  longMessage,
  authorEmail,
  profilePic,
}) {
  const [formMessage, setFormMessage] = useState('');

  function renderMessageWithLinks(message) {
    if (typeof message !== 'string') {
      message = String(message);
    }

    // Regex to catch www. and https.
    const linkRegex = /(https?:\/\/\S+|www\.\S+)/gi;

    return message.split('\n').map((line, lineIndex) => (
      <p key={lineIndex}>
        {line.split(linkRegex).map((part, partIndex) => {
          if (part.match(linkRegex)) {
            const href = part.startsWith('www.') ? `https://${part}` : part;
            let displayText = part;

            // Remove common prefixes from display text
            if (displayText.startsWith('https://'))
              displayText = displayText.slice(8);
            else if (displayText.startsWith('http://'))
              displayText = displayText.slice(7);
            if (displayText.startsWith('www.'))
              displayText = displayText.slice(4);

            return (
              <Link
                key={partIndex}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-outono no-underline p-1 rounded-md bg-slate-100 bg-opacity-0 hover:bg-opacity-100 transition-all"
              >
                {displayText}
              </Link>
            );
          } else {
            return part;
          }
        })}
      </p>
    ));
  }

  const longMessageWithLinks = renderMessageWithLinks(longMessage);

  return (
    <Card className="md:w-[650px] w-full">
      <CardHeader>
        <div className="flex space-x-4">
          <SupabaseAvatar
            path={profilePic}
            fallback={author ? author[0] : 'U'}
          />
          <div className="space-y-1">
            <div className="flex text-center items-center gap-1">
              <h4 className=" font-semibold">{author}</h4>
              {option == 'looking' && <span>is looking for</span>}
              {option == 'offering' && <span>is offering</span>}
              {option == 'sharing' && <span>is sharing</span>}
            </div>

            <p className="text-sm text-outono">{shortMessage}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-8 w-full">
          <div className="prose prose-slate">{longMessageWithLinks}</div>
          <div>
            <form className="space-y-4">
              <Label htmlFor="name" className="text-base">
                Can you help {author.split(' ')[0]}?
              </Label>
              <Textarea
                placeholder="Escreve a tua mensagem aqui."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div />
        <Button>
          <Link
            href={`mailto:${authorEmail}?subject=Outono&body=Este email é para ${author.split(' ')[0]} e mais ninguém consegue ler o que escreveres aqui :) %0D%0A%0D%0A%0D%0A ${formMessage}`}
          >
            Reply to {author.split(' ')[0]}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardWithFormToShare({
  onAddPost,
  name,
  email,
  supabase,
  user,
  profilePic,
}) {
  const [option, setOption] = useState('');
  const [shortMessage, setShortMessage] = useState('');
  const [longMessage, setLongMessage] = useState('');

  const handleSharePost = async () => {
    try {
      const { error } = await supabase.from('posts').insert({
        author_id: user.id, // Associate the post with the user
        option: option,
        short_message: shortMessage,
        long_message: longMessage,
      });

      if (error) throw error;

      // If successful, update the UI (you can customize this)
      onAddPost({
        author: name,
        authorEmail: email,
        option,
        short_message: shortMessage,
        long_message: longMessage,
        profiles: {
          full_name: name,
          email: email,
        },
      });

      setOption('');
      setShortMessage('');
      setLongMessage('');
    } catch (error) {
      alert('Error adding post: ' + error.message);
    }
  };
  return (
    <Card className="md:w-[650px] w-full">
      <CardHeader>
        <div className="flex space-x-4">
          <SupabaseAvatar path={profilePic} fallback={name ? name[0] : 'U'} />
          <div className="space-y-1 w-full self-end">
            <div className="flex text-center items-center gap-2">
              <Select value={option} onValueChange={setOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="looking">I&apos;m looking for</SelectItem>
                  <SelectItem value="offering">I&apos;m offering</SelectItem>
                  <SelectItem value="sharing">I&apos;m sharing</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Escreve alguma coisa aqui."
                value={shortMessage}
                onChange={(e) => setShortMessage(e.target.value)}
              />
            </div>
            <div className="flex items-center pt-2"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div></div>
          <div className="flex w-full flex-col  gap-4">
            <Label htmlFor="name" className="text-base">
              Mais Detalhes
            </Label>
            <Textarea
              placeholder="Escreve a tua mensagem aqui."
              value={longMessage}
              onChange={(e) => setLongMessage(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div />
        <Button
          onClick={() => {
            handleSharePost();
            toast(
              `🎉 Obrigado por contribuires, ${name ? name.split(' ')[0] : ''}!'`,
              {
                description:
                  'O teu post foi publicado com sucesso e vai ser partilhado na próxima edição da newsletter.',
              }
            );
          }}
        >
          Share your post
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SummaryItem({ author, option, shortMessage }) {
  return (
    <div className="flex flex-col">
      <div className="space-y-1">
        <div className="space-x-1">
          <span className="font-semibold">{author}</span>
          {option == 'looking' && <span>is looking for</span>}
          {option == 'offering' && <span>is offering</span>}
          {option == 'sharing' && <span>is sharing</span>}
          <span className="text-sm text-outono">{shortMessage}.</span>
        </div>
      </div>
    </div>
  );
}
