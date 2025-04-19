"use client";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Entry from "@/components/Entry/Entry";
import Link from "next/link";

const Journals = () => {
  const [entries, setEntries] = useState([
    {
      date: "April 19, 2025",
      excerpt: "Today, I attended the Figma workshop...",
      category: "Work",
      locked: false,
    },
    {
      date: "April 19, 2025",
      excerpt: "I don't know what to cook today...",
      category: "Cooking",
      locked: false,
    },
    {
      date: "April 19, 2025",
      excerpt: "I hate meetings...",
      category: "Meeting",
      locked: false,
    },
    {
      date: "Feburary 25, 2025",
      category: "Math HW",
      locked: true,
    },
    {
      date: "December 29, 2024",
      excerpt: "I met with Wei today and...",
      category: "Meeting",
      locked: false,
    },
    {
      date: "September 13, 2024",
      excerpt: "Tiramisu is suprisingly hard...",
      category: "Cooking",
      locked: false,
    },
  ]);

  const handleToggleLock = (id: number) => {
    setEntries((prev) =>
      prev.map((entry, index) =>
        index === id ? { ...entry, locked: !entry.locked } : entry
      )
    );
  };

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((entry, index) => index !== id));
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="bad-script text-4xl">My Journals</h1>
        <Link href="/write">
          <IoAddOutline size={42} color="black" />
        </Link>
      </div>
      <div className="mt-6">
        {entries.map((entry, index) => (
          <Entry
            key={"JOURNAL ENTRY " + index}
            id={index}
            {...entry}
            onDelete={handleDelete}
            onToggleLock={handleToggleLock}
          />
        ))}
      </div>
    </div>
  );
};

export default Journals;
