"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Scribble from "@/components/Scribble";
import "./NavBar.css";

export const NavTab = ({
  name,
  path,
  className,
}: {
  name: string;
  path: string;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`hyperlink ${className} ${isActive ? "font-bold" : ""}`}
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

export const Hamburger = () => {
  const [turnToX, setTurnToX] = useState(true);

  useEffect(() => {
    const container = document.querySelector("#hamburger");
    const line1 = document.querySelector("#line1");
    const line2 = document.querySelector("#line2");
    const line3 = document.querySelector("#line3");

    const toggle = () => {
      if (turnToX) {
        line1?.classList.add("hamburger-1");
        line2?.classList.add("hamburger-2");
        line3?.classList.add("hamburger-3");

        line1?.classList.remove("x-1");
        line2?.classList.remove("x-2");
        line3?.classList.remove("x-3");
      } else {
        line1?.classList.add("x-1");
        line2?.classList.add("x-2");
        line3?.classList.add("x-3");

        line1?.classList.remove("hamburger-1");
        line2?.classList.remove("hamburger-2");
        line3?.classList.remove("hamburger-3");
      }
      setTurnToX(!turnToX);
    };

    container?.addEventListener("click", toggle);
    return () => container?.removeEventListener("click", toggle);
  }, [turnToX]);

  return (
    <div className="flex flex-col cursor-pointer" id="hamburger">
      <div id="line1" className="line" />
      <div id="line2" className="line" />
      <div id="line3" className="line" />
    </div>
  );
};
