"use client";
import { useState, SetStateAction, useEffect } from "react";
import Link from "next/link";
import Scribble from "@/components/Scribble";
import "./NavBar.css";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

type NavTabProps = {
  name: string;
  path: string;
  className?: string;
  onClick?: () => void;
};

export const NavTab = ({ name, path, className, onClick }: NavTabProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={clsx(
        "hyperlink flex items-center justify-center text-center mt-1",
        className,
        { "font-bold": isActive }
      )}
      onClick={onClick}
    >
      <p>{name}</p>
      <Scribble
        regular
        className="text-[16px] w-full h-full"
        innerClassName="top-14"
        text={name}
        animate={!isActive}
      />
    </Link>
  );
};

export const DesktopNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [curr, setCurr] = useState("");

  useEffect(() => {
    setCurr(pathname);
  }, [pathname]);

  console.log(curr);

  const handleExit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurr("Journals");
    router.push("/journals");
  };

  return (
    <>
      {curr === "/write" ? (
        <div
          className="bg-[#F3FFF9] rounded-lg py-4 px-8 shadow-button absolute z-10 right-[132px] cursor-pointer hover:scale-105 transition duration-300"
          onClick={handleExit}
        >
          Save & Exit
        </div>
      ) : (
        <>
          <NavTab
            name="Write"
            path="/write"
            className="w-[41px]"
            onClick={() => setCurr("write")}
          />
          <NavTab
            name="Journals"
            path="/journals"
            className="w-[66px]"
            onClick={() => setCurr("journals")}
          />
          <NavTab
            name="Calendar"
            path="/calendar"
            className="w-[69px]"
            onClick={() => setCurr("calender")}
          />
        </>
      )}
    </>
  );
};

export const Hamburger = () => {
  const [active, setActive] = useState(false);

  return (
    <div
      className="flex flex-col cursor-pointer"
      id="hamburger"
      onClick={() => setActive(!active)}
    >
      <div id="line1" className={`line ${active ? "hamburger-1" : "x-1"}`} />
      <div id="line2" className={`line ${active ? "hamburger-2" : "x-2"}`} />
      <div id="line3" className={`line ${active ? "hamburger-3" : "x-3"}`} />
    </div>
  );
};
