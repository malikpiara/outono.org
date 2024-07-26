import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Outono",
  description: "A Outono existe para conectar e apoiar Portugueses que fazem parte ou que se querem estabelecer no ecossistema tecnológico de Berlim. Organizamos jantares, meetups e partilhamos experiências e oportunidades de crescimento pessoal e profissional.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`!bg-transparent ${inter.className}`}>
        <Menubar>
  <MenubarMenu>
    <MenubarTrigger className={'font-semibold'} >Outono</MenubarTrigger>
    <MenubarContent>
      <MenubarItem><Link href='https://www.instagram.com/outono.community/' target="_blank">Instagram</Link></MenubarItem>
      <MenubarItem><Link href='https://www.linkedin.com/company/outono-org/' target="_blank">LinkedIn</Link></MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
  <MenubarTrigger>Pessoas</MenubarTrigger>
  <MenubarContent>
      <MenubarItem><Link href='/#berlin'>Berlim</Link></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>

        {children}
        </body>
    </html>
  );
}