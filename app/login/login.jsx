'use client';
import React, { useEffect, useState } from 'react';
import { login } from './actions';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlobAnimation from './blob';
import logo from '@/public/logo.svg';
import Image from 'next/image';

export default function LoginComponent({ initialEmail, initialFullName }) {
  const [email, setEmail] = useState(initialEmail || '');
  const [fullName, setFullName] = useState(initialFullName || '');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('email')) {
      // Clean the URL
      router.replace('/login', undefined, { shallow: true });
    }
  }, [searchParams, router]);

  return (
    <>
      <div className="w-full md:grid md:grid-cols-2 mt-10 h-full">
        <div className="hidden md:block bg-[#f1ebe8] bg-opacity-5 mx-3 rounded-lg h-[93vh]">
          <BlobAnimation />
          <Motto />

          <div className="absolute top-16 left-7 text-slate-600 text-xl font-medium flex items-center gap-2">
            <Image
              src={logo}
              alt="Outono logo"
              className="w-8 h-8 opacity-85"
            />
          </div>
        </div>
        <div className="flex items-center justify-center py-12 h-[93vh] animate-in">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center lg:-mt-20">
              {fullName ? (
                <>
                  <h1 className="text-3xl font-bold">
                    👋 Olá, {fullName.split(' ')[0]}!
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">Entra na Outono</h1>
                </>
              )}
              <p className="text-balance text-muted-foreground">
                Ao clicar em entrar, vais receber um link para entrar na
                plataforma via email.
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
                    toast('Email Enviado', {
                      description: 'Por favor verifica a tua caixa de correio.',
                    })
                  }
                >
                  Entrar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export function Motto() {
  return (
    <p className="uppercase text-xs [writing-mode:vertical-lr] rotate-180 fixed bottom-20 tracking-wider mx-3 hover:text-tertiary max-sm:hidden transition-all duration-300 cursor-default text-slate-500 hover:animate-pulse">
      Only you know who you can be
    </p>
  );
}
