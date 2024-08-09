import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { sortedPeople } from '@/people/berlin';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PeopleSection() {
  return (
    <>
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 mt-4'>
        {sortedPeople.map((person) => {
          return (
            <div key={person.name}>
              <Card className='rounded-xl transition-all text-center w-72 h-80 group hover:border-slate-400'>
                <CardContent className='pb-0 pt-6'>
                  <Image
                    className='mx-auto mb-4 w-28 h-28 rounded-full grayscale group-hover:grayscale-0'
                    width={100}
                    height={100}
                    src={person.photo}
                    alt={person.name}
                  />
                </CardContent>
                <CardHeader className='h-28 mt-0 pt-0'>
                  <CardTitle className='font-medium'>{person.name}</CardTitle>
                  <CardDescription className='text-base text-balance'>
                    {person.headline}
                  </CardDescription>
                </CardHeader>

                <CardFooter className='justify-center opacity-0 group-hover:opacity-100 transition-all'>
                  <ul className='flex'>
                    {person.links.github && (
                      <li>
                        <Link
                          href={`https://github.com/${person.links.github}`}
                          className='hover:text-[#ed4928]'
                        >
                          <Github className='mr-2 h-6 w-6' />
                        </Link>
                      </li>
                    )}
                    <li>
                      <a
                        href={`https://linkedin.com/in/${person.links.linkedin}`}
                        className=' hover:text-[#ed4928]'
                      >
                        <Linkedin className='mr-2 h-6 w-6' />
                      </a>
                    </li>
                  </ul>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
