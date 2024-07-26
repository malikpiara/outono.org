
import { Button } from "@/components/ui/button"
import { Mail, Send, MessageCircle} from "lucide-react"
import Link from "next/link"

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
import PeopleSection from "@/components/peopleSection"

export default function Home() {
  return (
    <>
    <Motto/>
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-4 md:max-w-4xl max-w-7xl m-auto">
      <div
            className='absolute inset-x-0 bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-10'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-tr from-[#ed4928] to-[#f17d09] opacity-40 sm:left-[calc(90%)] sm:w-[90rem]'
              style={{
                clipPath:
                  'polygon(94.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 97.5% 76.7%, 0.1% 24.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div
            className='absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-5'
            aria-hidden='true'
          >
          <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[120deg] bg-gradient-to-tr from-[#eda528] to-[#f10909] opacity-40 sm:left-[calc(20%-10rem)] sm:w-[80rem]'
              style={{
                clipPath:
                  'polygon(94.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 97.5% 76.7%, 0.1% 24.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            /></div>
      <div className="w-full items-center justify-between text-black animate-in">
      <h2 className="text-5xl font-bold mb-3 tracking-tight">Outono</h2>
      <p className="mb-3 text-lg leading-7 text-gray-800 [&:not(:first-child)]:mt-6">Outono simboliza maturação e crescimento. Assim como o Outono nos dá a conhecer a transição para uma nova etapa, acreditamos que o ecossistema tecnológico e empreendedor português está também a atravessar um novo período de inovação e competitividade.</p> 
      
      <p className="mb-3 text-lg leading-7 text-gray-800 [&:not(:first-child)]:mt-6">A Outono é uma comunidade de programadores, empreendedores e designers portugueses a viver e a trabalhar fora de Portugal, com hubs em cidades diferentes, começando em Berlim.</p>

      <h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">O que fazemos?</h2>
      <p className="mb-3 text-lg text-gray-800 leading-7 [&:not(:first-child)]:mt-6">Existimos para conectar e apoiar Portugueses que trabalham em tecnologia e que empreendem pelo mundo fora. Organizamos jantares, meetups e partilhamos experiências e oportunidades de crescimento pessoal e profissional.</p>

      <p className="mb-3 text-lg text-gray-800 leading-7 [&:not(:first-child)]:mt-6">Para promover coesão e um espirito de co-criação, o primeiro hub em Berlim tem um limite inicial de 15 membros e funciona por convite ou candidatura.</p>

<h2 className="text-2xl mb-3 mt-8 tracking-tight font-semibold">A visão</h2>
      <p className="mb-3 text-lg text-gray-800 leading-7 [&:not(:first-child)]:mt-6">Tencionamos construir hubs em cidades chave para ajudar empreendedores a entrar em novos mercados e facilitar a transição e integração de profissionais que decidiram estabelecer-se fora de Portugal.</p>

      <p className="mt-10 text-lg text-gray-800">Para mais informação, &nbsp;

<Drawer>
  <DrawerTrigger asChild>
 
  <button className="hover:bg-gray-200 border-b pb-2 transition-all delay-100">
    entra em contacto.</button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Entra em contacto</DrawerTitle>
      <DrawerDescription>Costumamos responder dentro de uma semana.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button variant="outline" asChild>
        <Link href="mailto:malik@outono.org"> <Mail className="mr-2 h-4 w-4" />Email</Link>
       </Button>

       <Button variant="outline" asChild>
        <Link href="https://t.me/malikpiara/"> <Send className="mr-2 h-4 w-4" />Telegram</Link>
       </Button>

       <Button variant="outline" asChild>
        <Link href="https://wa.me/+351962119084/"> <MessageCircle className="mr-2 h-4 w-4" />WhatsApp</Link>
       </Button>
      
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
</p>

<h2 id="berlin" className="text-2xl mb-3 mt-8 tracking-tight font-semibold">Pessoas</h2>
      <p className="mb-3 text-lg text-gray-800 leading-7 [&:not(:first-child)]:mt-6">Conhece alguns dos elementos que já integram a nossa comunidade em Berlim.</p>
      </div>

      <PeopleSection/>

    </main>
    </>
    
  );
}

export function Motto() {
  return (
    <p className='uppercase text-xs [writing-mode:vertical-lr] rotate-180 fixed bottom-20 tracking-wider mx-3 hover:text-tertiary max-sm:hidden transition-all duration-300 cursor-default text-slate-500'>
      Only you know who you can be
    </p>
  );
}