import React from "react";
import { IoAddOutline } from "react-icons/io5";

const Journals = () => {
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="bad-script text-4xl">My Journals</h1>
        <a href="/write">
          <IoAddOutline size={42} color="black" />
        </a>
      </div>
      <div></div>
    </div>
  );
};

export default Journals;
