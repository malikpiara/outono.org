import * as React from 'react';
import { Button, Font, Head, Html, Container, Section, Tailwind, Text } from "@react-email/components";

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
      <h1 className="text-2xl font-bold mb-3 tracking-tight">👋 Olá {firstName}, estes são os updates da semana</h1>
   
    <Section>
    <h2 className='text-2xl mb-3 mt-8 tracking-tight font-semibold'>Resumo</h2>
  
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
                <span className="text-orange-600">
                {post.short_message}.
                </span>
            </Text>
       </>
    
      )
      })}
      </div>
      </Section>

      <Section>
    
    <h2 className='text-2xl mb-3 mt-4 tracking-tight font-semibold'>Detalhes</h2>
    <div>
      {posts.map((post, i) => { return (
        <>
       <div
       key={i}
       >
          <div className="border border-solid border-[#eaeaea] rounded my-[20px] p-[20px]">
            
                <Text className='leading-[0px]'>
                  <strong>{post.profiles.full_name}</strong>{" "}
                  {post.option == 'looking' && <span>is looking for</span>}
            {post.option == 'offering' && <span>is offering</span>}
            {post.option == 'sharing' && <span>is sharing</span>}
                </Text>
                <Text className="text-orange-600">
                {post.short_message}.
                </Text>

                
                <div className='text-slate-600 leading-[24px]'>
                  <Text> {post.long_message} </Text>

                <Section className='mt-[32px] mb-[32px'>
                <Button
      href={`mailto:${post.profiles.email}?subject=Outono&body=Este email é para ${post.profiles.full_name.split(' ')[0]} e mais ninguém consegue ler o que escreveres aqui`}
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
      <Section>
      <Button
      href={link}
      style={{ background: "#000000", color: "#ffffff", padding: "10px 20px", borderRadius: "5px" }}
    >
      Faz a tua partilha
    </Button>
      </Section>
        </Container>
      </Tailwind>
      </body>
  </Html>
);
