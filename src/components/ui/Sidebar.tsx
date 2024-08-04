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
    <aside className={`text-white bg-black md:block absolute top-0 min-h-screen h-full md:relative transition-all duration-300 ${uiState.isSidebarOpen ? 'left-0 w-full md:min-w-[300px] max-w-[300px]' : '-left-full max-w-0'}`}>
      <X onClick={toggleSidebar} className="float-right mr-5 my-5 md:hidden text-2xl cursor-pointer" />
      <div className="flex items-center w-full bg-white">
        {/* <Image src="" width="80" height="80" alt="Byte Basha Logo" /> */}
        <h1 className="text-black font-bold text-2xl">Byte Basha</h1>
      </div>
      <ul className="mt-10 px-5">
        {MenuItems.map((item) => (
          <Link onClick={() => window.innerWidth < 768 ? toggleSidebar() : null} key={item.text} href={item.href}>
            <li className={`flex items-center gap-3 rounded-md text-xl py-3 pl-5 mb-2 ${pathname === item.href ? 'bg-white text-black font-bold' : ''}`}>
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