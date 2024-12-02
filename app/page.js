import { Button } from '@/components/ui/button';
import { Mail, Send, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import logo from '@/public/logo.svg';

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

import BlobAnimation from './login/blob';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PeopleSection from '@/components/peopleSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="fixed left-0 top-7 hidden h-[96vh] w-1/2 bg-[#f1ebe8] bg-opacity-5 p-3 md:block">
          <BlobAnimation />
          <Motto />

          <div className="absolute left-7 top-9 flex items-center gap-2 text-xl font-medium text-slate-600">
            <Image
              src={logo}
              alt="Outono logo"
              className="h-8 w-8 opacity-85"
            />
          </div>
        </div>
        <main className="w-full md:ml-[50%] md:w-1/2">
          <div className="m-4 flex flex-col items-center pt-4 animate-in md:m-8 md:-mt-4 md:items-baseline">
            <div className="prose w-full items-center justify-between">
              <h2 className="mb-3 text-4xl font-bold tracking-tight">Outono</h2>
              <p className="mb-3 text-lg leading-7 text-slate-700 [&:not(:first-child)]:mt-6">
                O Outono simboliza transição e amadurecimento. Tal como a
                estação, também nós estamos a atravessar um periodo de mudança,
                transformação e ambiguidade.
              </p>

              <p className="mb-3 text-lg leading-7 text-slate-700 [&:not(:first-child)]:mt-6">
                Somos programadores, empreendedores e designers portugueses a
                viver e a trabalhar fora de Portugal. Vemos os altos níveis de
                emigração e o contexto de trabalho remoto como uma oportunidade
                para abrir portas e criar pontes que ajudem portugueses em todo
                o lado a crescer.
              </p>

              <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight">
                O que fazemos?
              </h2>
              <p className="mb-3 text-lg leading-7 text-slate-700 [&:not(:first-child)]:mt-6">
                Existimos para conectar e apoiar Portugueses que trabalham em
                tecnologia e que empreendem pelo mundo fora.
              </p>

              <p className="mb-3 text-lg leading-7 text-slate-700 [&:not(:first-child)]:mt-6">
                Organizamos jantares, meetups e partilhamos experiências e
                oportunidades de crescimento pessoal e profissional, com grupos
                e newsletters locais, aos quais todos os membros podem ter
                acesso.
              </p>

              <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight">
                Visão
              </h2>
              <p className="mb-3 text-lg leading-7 text-slate-700 [&:not(:first-child)]:mt-6">
                Tencionamos abrir hubs em cidades chave, para ajudar
                empreendedores a entrar em novos mercados e facilitar a
                transição e integração de profissionais que decidiram
                estabelecer-se fora de Portugal.
              </p>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="w-60">Fala Connosco</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Entra em contacto</DrawerTitle>
                    <DrawerDescription>
                      Costumamos responder dentro de 2 dias.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button variant="outline" asChild>
                      <Link href="mailto:malik@outono.org">
                        {' '}
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Link>
                    </Button>

                    <Button variant="outline" asChild>
                      <Link href="https://t.me/malikpiara/">
                        {' '}
                        <Send className="mr-2 h-4 w-4" />
                        Telegram
                      </Link>
                    </Button>

                    <Button variant="outline" asChild>
                      <Link href="https://wa.me/+351962119084/">
                        {' '}
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                      </Link>
                    </Button>

                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <h2
                id="berlin"
                className="mb-3 mt-8 text-2xl font-semibold tracking-tight"
              >
                Pessoas
              </h2>

              <p className="mb-3 text-lg leading-7 text-slate-700">
                Conhece alguns dos nossos membros em Berlim e em Londres.
              </p>
            </div>

            <PeopleSection />
          </div>
        </main>
      </div>
      {/* <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-4 md:max-w-4xl max-w-7xl m-auto">
        <div
          className="absolute inset-x-0 bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-10"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-tr from-[#ed4928] to-[#f17d09] opacity-40 sm:left-[calc(90%)] sm:w-[90rem]"
            style={{
              clipPath:
                'polygon(94.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 97.5% 76.7%, 0.1% 24.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-5"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[120deg] bg-gradient-to-tr from-[#eda528] to-[#f10909] opacity-40 sm:left-[calc(20%-10rem)] sm:w-[80rem]"
            style={{
              clipPath:
                'polygon(94.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 97.5% 76.7%, 0.1% 24.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="w-full items-center justify-between text-black animate-in">
          <h2 className="text-5xl font-bold mb-3 tracking-tight">Outono</h2>
          <p className="mb-3 text-lg leading-7 text-slate-800 [&:not(:first-child)]:mt-6">
            Outono simboliza maturação e crescimento. Assim como o Outono nos dá
            a conhecer a transição para uma nova etapa, acreditamos que o
            ecossistema tecnológico e empreendedor português está também a
            atravessar um novo período de inovação e competitividade.
          </p>

          <p className="mb-3 text-lg leading-7 text-slate-800 [&:not(:first-child)]:mt-6">
            A Outono é uma comunidade de programadores, empreendedores e
            designers portugueses a viver e a trabalhar fora de Portugal, com
            hubs em cidades diferentes, começando em Berlim.
          </p>

          <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">
            O que fazemos?
          </h2>
          <p className="mb-3 text-lg text-slate-800 leading-7 [&:not(:first-child)]:mt-6">
            Existimos para conectar e apoiar Portugueses que trabalham em
            tecnologia e que empreendem pelo mundo fora. Organizamos jantares,
            meetups e partilhamos experiências e oportunidades de crescimento
            pessoal e profissional.
          </p>

          <p className="mb-3 text-lg text-slate-800 leading-7 [&:not(:first-child)]:mt-6">
            Para promover coesão e um espirito de co-criação, o primeiro hub em
            Berlim tem um limite inicial de 15 membros e funciona por convite ou
            candidatura.
          </p>

          <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">
            A visão
          </h2>
          <p className="mb-3 text-lg text-slate-800 leading-7 [&:not(:first-child)]:mt-6">
            Tencionamos construir hubs em cidades chave para ajudar
            empreendedores a entrar em novos mercados e facilitar a transição e
            integração de profissionais que decidiram estabelecer-se fora de
            Portugal.
          </p>

          <p className="mt-10 text-lg text-slate-800">
            Para mais informação, &nbsp;
            <Drawer>
              <DrawerTrigger asChild>
                <button className="hover:bg-slate-200 border-b pb-2 transition-all delay-100">
                  entra em contacto.
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Entra em contacto</DrawerTitle>
                  <DrawerDescription>
                    Costumamos responder dentro de uma semana.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button variant="outline" asChild>
                    <Link href="mailto:malik@outono.org">
                      {' '}
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Link>
                  </Button>

                  <Button variant="outline" asChild>
                    <Link href="https://t.me/malikpiara/">
                      {' '}
                      <Send className="mr-2 h-4 w-4" />
                      Telegram
                    </Link>
                  </Button>

                  <Button variant="outline" asChild>
                    <Link href="https://wa.me/+351962119084/">
                      {' '}
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Link>
                  </Button>

                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </p>

          <h2
            id="berlin"
            className="text-2xl mb-3 mt-8 tracking-tight font-semibold"
          >
            Pessoas
          </h2>
          <p className="mb-3 text-lg text-slate-800 leading-7 [&:not(:first-child)]:mt-6">
            Conhece alguns dos elementos que já integram a nossa comunidade em
            Berlim.
          </p>
        </div>

        <PeopleSection />
      </main> */}
    </>
  );
}

export function Motto() {
  return (
    <p className="hover:text-tertiary fixed bottom-20 mx-3 rotate-180 cursor-default text-xs uppercase tracking-wider text-slate-500 transition-all duration-300 [writing-mode:vertical-lr] hover:animate-pulse max-sm:hidden">
      Only you know who you can be
    </p>
  );
}
