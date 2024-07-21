'use client'

import { Button } from "@/components/ui/button"
import { Mail, Send, MessageCircle} from "lucide-react"
import Link from "next/link"
import { createClient } from '@/utils/supabase/client'
import { useState, useCallback, useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const initialPosts = [{
    author: 'Gislaine Zaramella',
    authorEmail: 'example@outono.org',
    option: 'looking',
    shortMessage: 'talented social media manager and/or social media agency',
    longMessage: `A friend of mine recently launched a new DTC coffee brand based in Nashville, Tennessee.

They're a fully remote team of six passionate individuals and are currently searching for a talented social media manager to join their growing team. Additionally, any recommendations for marketing agencies with a strong focus on social media expertise would be greatly appreciated!

If you know someone who might be a great fit or an agency comes to mind, please pass along the details! They're excited to build their brand and connect with coffee lovers everywhere.`,
}, {
    author: 'Khuyen Bui',
    authorEmail: 'example@outono.org',
    option: 'offering',
    shortMessage: 'Self-Reboot coaching program',
    longMessage:`Do you or anyone you know need a self-reboot, or a nudge?

I've helped many people say the thing and take the step they know they deep down have to, but haven't.

I'm offering 5 free consultation sessions for my pilot Reboot coaching program, which you'll get clarity on your situation and the courage to take One Small Action on it.

At the end, if you find it helpful and want to do more, we can work out some work together. Of course, you get to decide.

Pls see the post below or msg me, and I'll send you more info.

Maybe this is exactly the nudge you need.
Ps: my name Khuyến means "encourage" in Vietnamese.`
}]

export default function Home({ user }) {
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [firstname, setFirstname] = useState(null)
  const [posts, setPosts] = useState(initialPosts);

  // I think I should create a separate file with my main functions
  // and call them anytime I need to make my code more succint and less prone to errors.
  // Looking into useContext might also be a good idea.
  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setFirstname(data.full_name.split(' ')[0])
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

    const addPost = (newPost) => {
        setPosts([...posts, newPost]);
      };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-4 md:max-w-4xl max-w-7xl m-auto">
     
      <div className="w-full items-center justify-between text-black animate-in">
      <h2 className="text-3xl font-bold mb-3 tracking-tight">👋 Olá {firstname}, estes são os updates da semana</h2>

      <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">Resumo</h2>

      <div className="space-y-4">
      {posts.map((post, i) => { return (
        <>
       <div
       key={i}
       className="flex space-x-1"
       >
       <span>{i+1}.</span>
       <SummaryItem key={i} author={post.author} option={post.option} shortMessage={post.shortMessage}/>
       </div>
       </>
    
      )
      })}
      </div>

      <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">Detalhes</h2>
      
      <div className="space-y-8">
      {posts.map((post, i) => { return (
       
    <CardWithForm key={i} author={post.author} authorEmail={post.authorEmail} option={post.option} shortMessage={post.shortMessage} longMessage={post.longMessage}/> 
    
      )
      })}

      <CardWithFormToShare onAddPost={addPost} name={fullname} email={user?.email}/>
      </div>
      
      </div>

    </main>
  );
}



export function CardWithForm({ author, option, shortMessage, longMessage, authorEmail }) {
    const [formMessage, setFormMessage] = useState('');
    
    function renderMessageWithLinks(message) {
        if (typeof message !== 'string') {
          message = String(message);
        }
        
        // Regex to catch www. and https.
        const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g; 
    
        return message.split('\n').map((line, lineIndex) => (
          <p key={lineIndex}>
            {line.split(linkRegex).map((part, partIndex) => {
              if (part.match(linkRegex)) {
                return (
                  <Link
                    key={partIndex}
                    href={part.startsWith("www.") ? `https://${part}` : part} // Add https:// if needed
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 no-underline p-1 rounded-sm  bg-slate-100 bg-opacity-0 hover:bg-opacity-100 transition-all"
                  >
                    {part.split('www.')[1]}
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
    <Card className="w-[650px]">
      <CardHeader>
      <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src="#" />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex text-center items-center gap-1">
            <h4 className=" font-semibold">{author}</h4>
            {option == 'looking' && <span>is looking for</span>}
            {option == 'offering' && <span>is offering</span>}
            {option == 'sharing' && <span>is sharing</span>}
            </div>
            
            <p className="text-sm text-orange-600">
            {shortMessage}
            </p>
            
          </div>
        </div>
      </CardHeader>
      <CardContent>
        
        
            <div className="flex flex-col space-y-8 w-full">
                <div className="prose prose-slate">
                {longMessageWithLinks}
                </div>
                <div>
        <form className="space-y-4">
              <Label htmlFor="name" className='text-base'>Can you help {author.split(' ')[0]}?</Label>
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
        <div/>
        <Button><Link href={`mailto:${authorEmail}?subject=Outono&body=Este email é para ${author.split(' ')[0]} e mais ninguém consegue ler o que escreveres aqui :) %0D%0A%0D%0A%0D%0A ${formMessage}`}>Reply to {author.split(' ')[0]}</Link></Button>
      </CardFooter>
    </Card>
  )
}

export function CardWithFormToShare({ onAddPost, name, email }) {
    const [option, setOption] = useState('');
    const [shortMessage, setShortMessage] = useState('');
    const [longMessage, setLongMessage] = useState('');

    const handleSharePost = () => {
        onAddPost({
            author: name,
            authorEmail: email,
            option: option, // There's a bug here because I'm using 2 different types
            shortMessage: shortMessage,
            longMessage: longMessage,
        });
        setOption('');
    setShortMessage('');
    setLongMessage('');
    }
    return (
      <Card className="w-[650px]">
        <CardHeader>
        <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="#" />
              <AvatarFallback>{name ? name[0] : `U`}</AvatarFallback>
            </Avatar>
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
              <div className="flex items-center pt-2">
                
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form>
          <div>
          
        </div>
            <div className="flex w-full flex-col  gap-4">
                <Label htmlFor="name" className='text-base'>Mais Detalhes</Label>
                <Textarea
                placeholder="Escreve a tua mensagem aqui."
                value={longMessage}
                onChange={(e) => setLongMessage(e.target.value)}
                />
             
              
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div/>
          <Button onClick={handleSharePost}>Share your post</Button>
        </CardFooter>
      </Card>
    )
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
                <span className="text-sm text-orange-600">
                {shortMessage}.
                </span>
            </div>
          </div>
        </div>
  )
}


    