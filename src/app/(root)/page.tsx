import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Scribble from "@/components/Scribble";
import { currentUser } from "@clerk/nextjs/server";
import "./home.css";

const Home = async () => {
  const user = await currentUser();

  return (
    <section className="flex flex-col w-screen h-[calc(100vh-113px)] items-center justify-center text-center gap-[5rem] home">
      <div className="backThree">
        <div className="blurBox bg-teal-50"></div>
        <div className="blurBox bg-pink-50"></div>
        <div className="blurBox bg-cyan-50"></div>
      </div>
      {/* center text */}
      <div className="flex flex-col justify-center items-center gap-10 title">
        <h1 className="font-semibold text-7xl lg:text-[100px] bad-script">
          {user ? "Hello, " + user.firstName : "Journal Me"}
        </h1>
        <Scribble
          regular
          className="text-5xl absolute pt-5 lg:text-7xl lg:pt-6 w-full"
          innerClassName="left-1/2 -translate-x-1/2 top-0"
          text="JournalMe"
        />

        {/* if there is user, say hi */}
        <p className="description">
          {user
            ? "How are we feeling today?"
            : "A platform to express your thoughts in a distraction-free environment"}
        </p>
      </div>

      {/* if there is user, start writing, else begin */}
      <Link
        href={user ? "/write" : "/sign-up"}
        className="flex gap-2 shadow-button light-blue begin-button animate-bigger text-xl hover:gap-4 transition-all duration-300"
      >
        {user ? "Let's write" : "Begin"}
        <ArrowRight />
      </Link>
    </section>
  );
};

export default Home;
