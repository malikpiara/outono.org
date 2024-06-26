import Image from "next/image";
import { Github, Linkedin} from "lucide-react"
import Link from "next/link";
import { sortedPeople } from "@/people/berlin";

export default function PeopleSection() {
    
    return (
    <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 mt-8">
        {sortedPeople.map((person) => {
            return (
                <div key={person.name}>
                 <div className="text-center text-gray-500">
            <Image className="mx-auto mb-4 w-28 h-28 rounded-full grayscale"
             width={100} height={100} src={person.photo} alt={person.name}/>
              
              <h3 className="mb-1 text-xl tracking-tight text-gray-900">
                  {person.name}
              </h3>
              <p>{person.headline}</p>
              <ul className="flex justify-center mt-4 space-x-4">
                {person.links.github && (
                  <li>
                      <Link href={`https://github.com/${person.links.github}`} className="hover:text-[#ed4928]">
                      <Github className="mr-2 h-6 w-6" />
                      </Link>
                  </li>
                )}
                  <li>
                  <a href={`https://linkedin.com/in/${person.links.linkedin}`} className=" hover:text-[#ed4928]">
                      <Linkedin className="mr-2 h-6 w-6" />
                      </a>
                  </li>
              </ul>
          </div>
                </div>
            )
        })}
      </div>
)}