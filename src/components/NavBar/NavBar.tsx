import React from "react";
import "./NavBar.css";
import Image from "next/image";
import Scribble from "../Scribble";

const NavBar = () => {
  return (
    <nav className="absolute top-0 w-screen">
      <div className="topNav">
        <div className="logo">
          <div>JM</div>
        </div>
        <div className="links">
          <div className="hyperlink">
            <p>About</p>
            <Scribble
              regular
              className="text-[20px] w-full h-full"
              innerClassName="top-14"
              text={"about"}
              animate
            />
          </div>
          <div className="signInButton">Sign In</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
