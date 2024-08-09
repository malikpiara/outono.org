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
      <div className='h-full w-full md:grid md:grid-cols-2'>
        <div className='mx-3 hidden h-[93vh] rounded-lg bg-[#f1ebe8] bg-opacity-5 md:block'>
          <BlobAnimation />
          <Motto />

          <div className='absolute left-7 top-16 flex items-center gap-2 text-xl font-medium text-slate-600'>
            <Image
              src={logo}
              alt='Outono logo'
              className='h-8 w-8 opacity-85'
            />
          </div>
        </div>
        <div className='flex h-[93vh] items-center justify-center py-12 animate-in'>
          <div className='mx-auto grid w-[350px] gap-6'>
            <div className='grid gap-2 text-center lg:-mt-20'>
              {fullName ? (
                <>
                  <h1 className='text-3xl font-bold'>
                    👋 Olá, {fullName.split(' ')[0]}!
                  </h1>
                </>
              ) : (
                <>
                  <h1 className='text-3xl font-bold'>Entra na Outono</h1>
                </>
              )}
              <p className='text-balance text-muted-foreground'>
                Ao clicar em entrar, vais receber um link para entrar na
                plataforma via email.
              </p>
            </div>
            <div className='grid gap-4'>
              <form>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type='submit'
                  className='mt-4 w-full'
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
    <p className='hover:text-tertiary fixed bottom-20 mx-3 rotate-180 cursor-default text-xs uppercase tracking-wider text-slate-500 transition-all duration-300 [writing-mode:vertical-lr] hover:animate-pulse max-sm:hidden'>
      Only you know who you can be
    </p>
  );
}
