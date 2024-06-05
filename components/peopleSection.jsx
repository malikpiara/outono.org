import Image from "next/image";
import { Github, Linkedin} from "lucide-react"
import Link from "next/link";

export default function PeopleSection() {
    return (
    <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 mt-8">
          <div className="text-center text-gray-500">
            <Image className="mx-auto mb-4 w-28 h-28 rounded-full"
             width={100} height={100} src={'/malik.jpeg'} alt="Malik Piara"/>
              
              <h3 className="mb-1 text-xl tracking-tight text-gray-900">
                  Malik Piara
              </h3>
              <p>Product Enablement at CarByte</p>
              <ul className="flex justify-center mt-4 space-x-4">
                  <li>
                      <Link href="https://github.com/malikpiara" className="hover:text-[#ed4928]">
                      <Github className="mr-2 h-6 w-6" />
                      </Link>
                  </li>
                  <li>
                  <a href="https://www.linkedin.com/in/malikpiara/" className=" hover:text-[#ed4928]">
                      <Linkedin className="mr-2 h-6 w-6" />
                      </a>
                  </li>
                  
              </ul>
          </div>
          <div className="text-center text-gray-500">
            <Image className="mx-auto mb-4 w-28 h-28 rounded-full grayscale" width={100} height={100} src={'/nuno.jpeg'} alt="Nuno Coelho Santos"/>
              
              <h3 className="mb-1 text-xl tracking-tight text-gray-900">
            Nuno Coelho Santos
              </h3>
              <p>Product Designer at WhatsApp</p>
              <ul className="flex justify-center mt-4 space-x-4">
                  <li>
                      <Link href="https://github.com/nunosans" className="hover:text-[#ed4928]">
                      <Github className="mr-2 h-6 w-6" />
                      </Link>
                  </li>
                  <li>
                  <Link href="https://www.linkedin.com/in/nunosans/" className="hover:text-[#ed4928]">
                      <Linkedin className="mr-2 h-6 w-6" />
                      </Link>
                  </li>
                  
              </ul>
          </div>
          <div className="text-center text-gray-500">
            <Image className="mx-auto mb-4 w-28 h-28 rounded-full grayscale" width={100} height={100} src={'/pauloTruta.jpeg'} alt="Paulo Truta"/>
              
              <h3 className="mb-1 text-xl tracking-tight text-gray-900">
                  Paulo Truta
              </h3>
              <p>Product Engineer at Kitchen Stories</p>
              <ul className="flex justify-center mt-4 space-x-4">
                  <li>
                      <Link href="https://github.com/paulotruta" className="hover:text-[#ed4928]">
                      <Github className="mr-2 h-6 w-6" />
                      </Link>
                  </li>
                  <li>
                  <Link href="https://www.linkedin.com/in/paulotruta/" className=" hover:text-[#ed4928]">
                      <Linkedin className="mr-2 h-6 w-6" />
                      </Link>
                  </li>
                  
              </ul>
          </div>
      
      </div>
)}