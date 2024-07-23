'use client';
import React, { useEffect, useState } from 'react';
import { login } from './actions';
import { toast, Toaster } from 'sonner';

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginComponent() {
    const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);
  return (
    <>
    <div className="w-full lg:grid lg:grid-cols-2 lg:min-h-[800px] h-screen">
        <div className="hidden lg:block bg-amber-900 bg-opacity-10 mx-3 mb-3 rounded-lg h-[93vh]">
        <div className='absolute top-16 left-10 text-slate-600 text-xl font-medium'>Outono</div>
        
        {/* <div className='absolute bottom-10 left-5 prose prose-blockquote:not-italic text-black z-50'>
        <blockquote className="border-l-2 pl-6 mb-0 text-black text-lg">
        &quot;This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.&quot;
    </blockquote>
    <small className='border-l-2 pl-6'>Joana Dias</small>
        </div> */}
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center lg:-mt-20">
            <h1 className="text-3xl font-bold">Entra na Outono</h1>
            <p className="text-balance text-muted-foreground">
              Vais receber um link para entrar na plataforma via email.
            </p>
          </div>
          <div className="grid gap-4">
                <form>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <Button
            type="submit"
            className="w-full mt-4"
            formAction={login}
            onClick={() =>
                toast("Email Enviado", {
                  description: "Por favor verifica a tua caixa de correio.",
                })
              }
            >
              Entrar
            </Button>
                </form>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
    <Toaster />
    </>
    
  )
}



