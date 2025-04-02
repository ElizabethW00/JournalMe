import React from "react";
import { ArrowRight } from "lucide-react";
import Scribble from "@/components/Scribble";
import "./home.css";

const Home = () => {
  return (
    <section className="flex flex-col w-screen min-h-screen items-center justify-center text-center gap-[5rem] home">
      {/* center text */}
      <div className="flex flex-col justify-center items-center gap-10 title">
        <h1 className="font-semibold text-7xl lg:text-[100px] bad-script">
          Journal Me
        </h1>
        <Scribble
          regular
          className="text-5xl absolute pt-5 lg:text-7xl lg:pt-6 w-full"
          innerClassName="left-1/2 -translate-x-1/2 top-0"
        />

        <p className="description">A platform to express your thoughts in a secured way</p>
      </div>

      {/* begin button */}
      <button className="flex gap-2">
        Begin <ArrowRight />
      </button>
    </section>
  );
};

export default Home;
