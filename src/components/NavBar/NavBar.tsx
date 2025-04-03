import Scribble from "@/components/Scribble";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./NavBar.css";

const NavElement = ({ name, path }: { name: string; path: string }) => {
  return (
    <Link href={path} className="hyperlink">
      <p>{name}</p>
      <Scribble
        regular
        className="text-[16px] w-full h-full"
        innerClassName="top-14"
        text={name}
        animate
      />
    </Link>
  );
};

const NavBar = async () => {
  // gets the current user from clerk
  const user = await currentUser();

  return (
    <nav className="topNav">
      <Link href={"/"} className="bad-script text-[32px] animate-bigger">
        JM
      </Link>

      <div className="links">
        {/* only if there is a user, show the links to journal + calender */}
        {user && (
          <>
            <NavElement name={"Journals"} path={"/journals"} />
            <NavElement name={"Calender"} path={"/calender"} />
          </>
        )}

        <NavElement name={"About"} path={"/about"} />

        {/* if there is a user, show their profile, else show sign-in button */}
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
    </nav>
  );
};

export default NavBar;
