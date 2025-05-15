"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Scribble from "@/components/Scribble";
import "./NavBar.css";
import { usePathname } from "next/navigation";
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
      className={clsx("hyperlink mt-1", className, { "font-bold": isActive })}
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

export const DesktopNav = ({ hasUser }: { hasUser: boolean }) => {
  const pathname = usePathname();
  const [curr, setCurr] = useState("");

  useEffect(() => {
    setCurr(pathname);
  }, [pathname]);

  if (!hasUser)
    return (
      <NavTab
        name="About"
        path="/about"
        className="w-[46px]"
        onClick={() => setCurr("about")}
      />
    );

  return (
    <>
      {!curr.includes("/write") && (
        <>
          <NavTab
            name="Write"
            path="/write/"
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
          <NavTab
            name="About"
            path="/about"
            className="w-[46px]"
            onClick={() => setCurr("about")}
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
