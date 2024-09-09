"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { TbUser } from "react-icons/tb";
import { useRouter } from 'next/navigation';

function DashboardNavbar() {
  const [menu, setMenu] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession();
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const navRoutes = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Wallet",
      path: "/wallet",
    },
    {
      name: "Trending Bets",
      path: "/trendingbets",
    },
    {
      name: "New Challenge",
      path: "/new_challenges",
    },
  ];

  return (
    <header>
      <nav className="bg-[black] h-[15vh] text-[20px] flex p-5 justify-between  items-center ">
        <div className="cursor-pointer z-[1000]">
          <img src="/Logo.png" alt="" style={{ height: "10vh" }} />
        </div>

        <div className="hidden md:flex relative mb-8 items-center gap-3">
          {navRoutes.map((navRoute, i) => (
            <Link
              className={`text-white ${
                pathName.includes(navRoute.path) && "active"
              } nav-link `}
              key={i}
              href={navRoute.path}
            >
              {navRoute.name}
            </Link>
          ))}
        </div>
        <div className="md:flex items-center gap-2 hidden">
          <button className="flex bg-[#7879F1] py-1 px-5 rounded-xl text-white items-center gap-1">
            <span>
              <TbUser />
            </span>
            <span>{session?.user?.username}</span>
          </button>
          <button onClick={()=> signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/login`,
            })} className="flex bg-[#7879F1] py-1 px-5 rounded-xl text-white items-center gap-1">
            <span>Log out</span>
          </button>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <button className="flex bg-[#7879F1] py-1 px-5 rounded-xl text-white items-center gap-1">
            <span>
              <TbUser />
            </span>
            <span>{session?.user?.username}</span>
          </button>
          
          <button
            onClick={toggleMenu}
            className={` z-[500] ${menu ? "toggle open" : "toggle"}`}
          >
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
          </button>
        </div>
      </nav>
      <div className="w-full">
        <div
          className={`flex  z-[500]  w-[250px]  transition-[all,3s,ease-linear] ${
            menu ? "ml-0" : " ml-[-550px]"
          } flex-col px-5 bg-black md:hidden fixed top-0 left-0 bottom-0 items-start gap-4`}
        >
          <ul className=" flex flex-col pt-24 gap-8 items-start  ">
            {navRoutes.map((navRoute, i) => (
              <Link
                className={`text-white ${
                  pathName.includes(navRoute.path) && "text-[#7879F1]"
                } `}
                key={i}
                href={navRoute.path}
              >
                {navRoute.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
