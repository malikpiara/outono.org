'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useState, useCallback, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { SupabaseAvatar } from './supabaseAvatar';
import { SkeletonSummary, SkeletonPost, SkeletonTitle } from './skeleton';

import { MapPin } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

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

export default function Home({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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

      // Calculate the date from two weeks ago
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      const { data, error, status } = await supabase
        .from('posts')
        .select(
          `
            *,
            profiles ( full_name, id, email, avatar_url, bio )
        `
        )
        .gte('created_at', twoWeeksAgo.toISOString()); // Filter posts created in the last 2 weeks

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

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, email')
        .order('full_name');

      if (error) throw error;

      if (data) {
        setAllUsers(data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getProfile(), getPosts(), getAllUsers();
  }, [user, getProfile, getPosts, getAllUsers]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  if (loading) {
    return (
      <div className='flex min-h-screen w-screen flex-col items-center justify-center p-4 sm:p-12'>
        <div className='flex w-full flex-col space-y-8 md:w-[650px]'>
          <SkeletonTitle />
          <SkeletonSummary />
          <SkeletonPost />
          <SkeletonPost />
        </div>
      </div>
    );
  }

  return (
    <>
      <main className='flex min-h-screen w-screen justify-center gap-10 p-4 animate-in sm:p-12'>
        <div>
          {firstname && (
            <h2 className='mb-3 text-3xl font-bold tracking-tight'>
              👋 Olá {firstname}, estes são os updates da semana
            </h2>
          )}

          <h2 className='mb-3 mt-8 text-2xl font-semibold tracking-tight'>
            Resumo
          </h2>

          <div className='space-y-4'>
            {posts &&
              posts.map((post, i) => (
                <div key={i} className='flex gap-2'>
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

          <h2 className='mb-3 mt-8 text-2xl font-semibold tracking-tight'>
            Detalhes
          </h2>

          <div className='space-y-8'>
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
                  bio={post.profiles.bio}
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
        <aside className='ml-20 hidden border-l pl-10 sm:flex'>
          <CardWithListOfPeople users={allUsers} />
        </aside>
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
  bio,
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
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-md bg-slate-100 bg-opacity-0 p-1 text-outono no-underline transition-all hover:bg-opacity-100'
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
    <Card className='w-full md:w-[650px]'>
      <CardHeader>
        <div className='flex space-x-4'>
          <SupabaseAvatar
            path={profilePic}
            fallback={author ? author[0] : 'U'}
          />
          <div className='space-y-1'>
            <div className='flex items-center gap-1 text-center'>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <h4 className='cursor-pointer font-semibold underline-offset-4 hover:underline'>
                    {author}
                  </h4>
                </HoverCardTrigger>
                <HoverCardContent className='w-96'>
                  <div className='flex flex-row-reverse justify-between space-x-4'>
                    <SupabaseAvatar
                      className='h-16 w-16'
                      path={profilePic}
                      fallback={author ? author[0] : 'U'}
                    />
                    <div className='space-y-1 self-start text-left'>
                      <h4 className='text-xl font-semibold'>{author}</h4>
                      <p className='text-[15px] text-muted-foreground'>{bio}</p>
                      <div className='flex items-center pt-2'>
                        <MapPin className='mr-2 h-4 w-4 opacity-70' />{' '}
                        <span className='text-sm text-muted-foreground'>
                          Berlin
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {option == 'looking' && <span>is looking for</span>}
              {option == 'offering' && <span>is offering</span>}
              {option == 'sharing' && <span>is sharing</span>}
            </div>

            <p className='text-sm text-outono'>{shortMessage}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex w-full flex-col space-y-8'>
          <div className='prose prose-slate'>{longMessageWithLinks}</div>
          <div>
            <form className='space-y-4'>
              <Label htmlFor='name' className='text-base'>
                Can you help {author.split(' ')[0]}?
              </Label>
              <Textarea
                placeholder='Escreve a tua mensagem aqui.'
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div />
        <Button className={'w-full sm:w-fit'}>
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
    <Card className='w-full md:w-[650px]'>
      <CardHeader>
        <div className='flex space-x-4'>
          <SupabaseAvatar path={profilePic} fallback={name ? name[0] : 'U'} />
          <div className='w-full space-y-1 self-end'>
            <div className='flex flex-col items-start gap-2 text-center sm:flex-row sm:items-center'>
              <Select value={option} onValueChange={setOption}>
                <SelectTrigger className='w-full sm:w-[180px]'>
                  <SelectValue placeholder='Seleciona' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='looking'>I&apos;m looking for</SelectItem>
                  <SelectItem value='offering'>I&apos;m offering</SelectItem>
                  <SelectItem value='sharing'>I&apos;m sharing</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type='text'
                placeholder='Escreve alguma coisa aqui.'
                value={shortMessage}
                onChange={(e) => setShortMessage(e.target.value)}
              />
            </div>
            <div className='flex items-center pt-2'></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div></div>
          <div className='flex w-full flex-col gap-4'>
            <Label htmlFor='name' className='text-base'>
              Mais Detalhes
            </Label>
            <Textarea
              placeholder='Escreve a tua mensagem aqui.'
              value={longMessage}
              onChange={(e) => setLongMessage(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div />
        <Button
          className={'w-full sm:w-fit'}
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
    <div className='flex flex-col'>
      <div className='space-y-1'>
        <div className='space-x-1'>
          <span className='font-semibold'>{author}</span>
          {option == 'looking' && <span>is looking for</span>}
          {option == 'offering' && <span>is offering</span>}
          {option == 'sharing' && <span>is sharing</span>}
          <span className='text-sm text-outono'>{shortMessage}.</span>
        </div>
      </div>
    </div>
  );
}

export function CardWithListOfPeople({ users }) {
  return (
    <div className='hidden w-60 sm:flex sm:flex-col'>
      <h3 className='mb-3 text-lg font-semibold tracking-tight'>Pessoas</h3>

      <div className='flex flex-col space-y-4'>
        {users.map((user) => (
          <div
            key={user.id}
            className='flex items-center space-x-3 rounded-lg hover:bg-muted'
          >
            <SupabaseAvatar
              path={user.avatar_url}
              fallback={user.full_name ? user.full_name[0] : 'U'}
              className='h-8 w-8'
            />
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className='cursor-pointer'>{user.full_name}</span>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex justify-between space-x-4'>
                  <div>
                    <h4 className='text-xl font-semibold'>{user.full_name}</h4>

                    <div className='flex items-center pt-2'>
                      <MapPin className='mr-2 h-4 w-4 opacity-70' />
                      <span className='text-xs text-muted-foreground'>
                        Berlin
                      </span>
                    </div>
                  </div>
                  <SupabaseAvatar
                    path={user.avatar_url}
                    fallback={user.full_name ? user.full_name[0] : 'U'}
                    className='h-16 w-16'
                  />
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
    </div>
  );
}
