export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-6 md:max-w-4xl max-w-7xl m-auto">
      <div
            className='absolute inset-x-0 bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-10'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-tr from-[#ed4928] to-[#f14e09] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
              style={{
                clipPath:
                  'polygon(94.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 97.5% 76.7%, 0.1% 24.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
      <div className="w-full items-center justify-between text-black animate-in">
      <h2 className="text-5xl font-bold mb-3">Outono</h2>
      <p className="mb-3 text-lg">Outono simboliza maturação e crescimento. Somos uma comunidade de programadores, empreendedores e designers Portugueses com raizes Berlim.</p>

      <h2 className="text-3xl font-bold mb-3 mt-8">O que fazemos?</h2>
      <p className="mb-3 text-lg text-gray-800">A Outono existe para conectar e apoiar Portugueses que fazem parte ou que se querem estabelecer no ecossistema tecnológico de Berlim. Organizamos jantares, meetups e partilhamos experiências e oportunidades de crescimento pessoal e profissional.</p>

      <p className="mb-3 text-lg text-gray-800">Para mais informação, podes contactar <span className="hover:bg-gray-300 underline transition-all delay-100">malik@outono.org</span></p>
      </div>
    </main>
  );
}
