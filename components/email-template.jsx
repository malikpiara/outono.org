import * as React from 'react';
import { Button, Font, Head, Html, Container, Section, Tailwind, Text, Link } from "@react-email/components";

/* interface EmailTemplateProps {
  firstName: string;
} */


export const EmailTemplate = ({
  firstName, posts, link
}) => (
  <Html>
    <Head>
        <Font
          fontFamily="ui-sans-serif"
          fallbackFontFamily="system-ui"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <body>
        <Tailwind>
      <Container className='max-w-[600px]'>
        <Section className='mb-0'>
      <h1 className="text-2xl font-bold mb-3 tracking-tight">👋 Olá {firstName}, estes são os updates da semana</h1>
      <Text className='text-slate-600 leading-[24px]'>Esta newsletter com procuras, ofertas e partilhas é enviada todas as segundas-feiras a membros da Outono em Berlim. Para adicionar um post à edição da próxima semana, visita este <Link href={link} className='text-[#FF614B]'>link</Link>.</Text>
      </Section>
   
    <Section className='mt-0'>
    <h2
    className='text-2xl mb-3 mt-0 tracking-tight font-semibold'
    >Resumo</h2>
  
    <div>
      {posts.map((post, i) => { return (
        <>
            <Text className='leading-[24px]'>
       <span>{i+1}.{" "}</span>
                <span className='font-semibold'>{post.profiles.full_name}</span>
                {" "}
            {post.option == 'looking' && <span>is looking for</span>}
            {post.option == 'offering' && <span>is offering</span>}
            {post.option == 'sharing' && <span>is sharing</span>}
                {" "}
                <span className="text-[#FF614B]">
                {post.short_message}.
                </span>
            </Text>
       </>
    
      )
      })}
      </div>
      </Section>

      <Section>
    
    <h2 className='text-2xl mb-3 !mt-0 tracking-tight font-semibold'>Detalhes</h2>
    <div>
      {posts.map((post, i) => { return (
        <>
       <div
       key={i}
       >
          <div className="border border-solid border-[#eaeaea] rounded-md my-[20px] p-[20px] w-full">
            
                <Text className='leading-[0px]'>
                  <strong>{post.profiles.full_name}</strong>{" "}
                  {post.option == 'looking' && <span>is looking for</span>}
            {post.option == 'offering' && <span>is offering</span>}
            {post.option == 'sharing' && <span>is sharing</span>}
                </Text>
                <Text className="text-[#FF614B]">
                {post.short_message}.
                </Text>

                
                <div className='text-slate-600 leading-[24px]'>
                  
                  {post.long_message.split('\n').map((line, index) => (
    <Text key={index}>{line}</Text>
  ))}
                  
                <Section className='mt-[32px] mb-[22px]'>
                <Button
      href={`mailto:${post.profiles.email}?subject=Outono&body=Este email é para ${post.profiles.full_name.split(' ')[0]} e mais ninguém consegue ler o que escreveres aqui`}
      className='a:'
      style={{ background: "#000000", color: "#ffffff", padding: "10px 20px", borderRadius: "5px" }}
    >
      Reply to {post.profiles.full_name.split(' ')[0]}
    </Button>
    </Section>

                </div>
            </div>
          </div>
       </>
      )
      })}
      </div>
      </Section>
      <Section className='py-[20px]'>
      <Button
      className='text-center'
      href={link}
      style={{ background: "#FF614B", color: "#000000", padding: "10px 20px", borderRadius: "5px" }}
    >
      Adiciona um update à newsletter
    </Button>
      </Section>
      <Section className='my-[20px]'>
      <Link 
      className='text-slate-600 text-[12px]'
    href={`mailto:berlin@mail.outono.org?subject=Unsubscribe&body=Envia este email para deixar de receber emails da newsletter semanal. No futuro vais poder fazer gestão da frequência e das cidades através da plataforma.`}>Remover subscrição</Link>
      </Section>
        </Container>
      </Tailwind>
      </body>
  </Html>
);
