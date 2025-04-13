import { Hamburger, NavTab } from "./NavElements";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./NavBar.css";

const NavBar = async () => {
  const user = await currentUser();

  return (
    <nav className="topNav" id="NavBar">
      <Link href={"/"} className="bad-script text-[32px] animate-bigger">
        JM
      </Link>

      {/* DESKTOP LINK TABS */}
      <div className="links hidden sm:flex">
        {user && (
          <>
            <NavTab name="Write" path="/write" className="w-[41px]" />
            <NavTab name="Journals" path="/journals" className="w-[66px]" />
            <NavTab name="Calender" path="/calender" className="w-[69px]" />
          </>
        )}
        <NavTab name="About" path="/about" className="w-[46px]" />
        {user ? (
          <UserButton />
        ) : (
          <Link
            href={"/sign-in"}
            className="signInButton shadow-button light-blue animate-bigger"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* MOBILE HAMBURGER */}
      <div className="sm:hidden">
        <Hamburger />
      </div>
    </nav>
  );
};

export default NavBar;
