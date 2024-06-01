
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-6 md:max-w-4xl max-w-7xl m-auto">
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
      <p className="mb-3 text-lg leading-7 [&:not(:first-child)]:mt-6">Outono simboliza transição, maturação e crescimento. Somos uma comunidade de programadores, empreendedores e designers Portugueses com raizes em Berlim.</p>

      <h2 className="text-3xl font-bold mb-3 mt-8 tracking-tight">O que fazemos?</h2>
      <p className="mb-3 text-lg text-gray-800 leading-7 [&:not(:first-child)]:mt-6">A Outono existe para conectar e apoiar Portugueses que fazem parte ou que se querem estabelecer no ecossistema tecnológico de Berlim. Organizamos jantares, meetups e partilhamos experiências e oportunidades de crescimento pessoal e profissional.</p>

      <p className="mb-3 text-lg text-gray-800">Para mais informação, envia um email para <span className="hover:bg-gray-200 border-b pb-2 transition-all delay-100"><HoverCard>
  <HoverCardTrigger>malik@outono.org</HoverCardTrigger>
  <HoverCardContent className="w-80">
  <div className="flex justify-between space-x-4">
  <Avatar>
            <AvatarImage src="https://media.licdn.com/dms/image/D4E03AQEOLaIfFwqJOQ/profile-displayphoto-shrink_800_800/0/1700920157587?e=1722470400&v=beta&t=6kuXPp-PBEDI_nZh8TsaZY9Gh5S8as3dfPTyZf9LDJM" />
            <AvatarFallback>M</AvatarFallback>
  </Avatar>
  <div className="space-y-1">
            <h4 className="font-semibold">Malik Piara</h4>
            <p className="text-sm">
            Product Manager e Embaixador da Outono em Berlim.
            </p>
            <div className="flex items-center pt-2">
              
              <span className="text-xs text-muted-foreground">
                Desde Junho 2024
              </span>
            </div></div>
    </div>
  </HoverCardContent>
</HoverCard></span></p>
      </div>
      

    </main>
  );
}
