'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from 'lucide-react';
import { MenuItems } from "@/lib/data";
import { useAppContext } from "@/lib/AppContext";
const Sidebar = () => {
  const { uiState, toggleSidebar } = useAppContext();
  const pathname = usePathname()

  return (
    <aside className={`text-white bg-blue md:block absolute top-0 min-h-screen h-full md:relative transition-all duration-300 ${uiState.isSidebarOpen ? 'left-0 w-full md:min-w-[300px] max-w-[300px]' : '-left-full max-w-0'}`}>
      <X onClick={toggleSidebar} className="float-right mr-5 my-5 md:hidden text-2xl cursor-pointer" />
      <div className="flex items-center w-full bg-white pl-5 py-1">
        <Image priority src="https://instagram.fpew1-1.fna.fbcdn.net/v/t51.2885-19/87326094_1261732130697060_3845002487434051584_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fpew1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=zqjAL8uT-KoQ7kNvgFRpxGS&gid=deaf320b98a24cd7a4729c6b3ad7533e&edm=AFg4Q8wBAAAA&ccb=7-5&oh=00_AYBEO5vzVHTd-yBGD50QV-Zzryfkx1SYmsuFPyFKuoYrNg&oe=66B50CA1&_nc_sid=0b30b7" width="80" height="80" alt="Byte Basha Logo" />
        <h1 className="text-black font-bold text-2xl uppercase">Dreamist</h1>
      </div>
      <ul className="mt-10 px-5">
        {MenuItems.map((item) => (
          <Link onClick={() => window.innerWidth < 768 ? toggleSidebar() : null} key={item.text} href={item.href}>
            <li className={`flex items-center gap-3 rounded-md text-xl py-3 pl-5 mb-2 tracking-tighter ${pathname === item.href ? 'bg-white text-black font-bold' : ''}`}>
              {<item.icon className="text-2xl" />}
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar