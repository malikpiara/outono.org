import * as React from 'react';
import { Button, Font, Head, Html, Container, Section, Tailwind, Text } from "@react-email/components";

/* interface EmailTemplateProps {
  firstName: string;
} */

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

export const EmailTemplate = ({
  firstName, posts
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
                is looking for
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
                  <strong>{post.profiles.full_name}</strong>{" "} is looking for
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
      href='https://outono.org/news'
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
