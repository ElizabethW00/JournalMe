"use client";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Entry from "@/components/Entry/page";

const Journals = () => {
  const [entries, setEntries] = useState([
    { id: 1, name: "Journal 1", date: "September 5, 2025", locked: false },
    { id: 2, name: "Journal 2", date: "September 6, 2025", locked: true },
    { id: 3, name: "Journal 3", date: "September 5, 2025", locked: false },
    { id: 4, name: "Journal 4", date: "September 5, 2025", locked: false },
    { id: 5, name: "Journal 5", date: "September 5, 2025", locked: false },
    // add more entries here
  ]);

  const handleToggleLock = (id: number) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, locked: !entry.locked } : entry
      )
    );
  };

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="bad-script text-4xl">My Journals</h1>
        <a href="/write">
          <IoAddOutline size={42} color="black" />
        </a>
      </div>
      <div className="mt-6">
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            id={entry.id}
            name={entry.name}
            date={entry.date}
            locked={entry.locked}
            onDelete={handleDelete}
            onToggleLock={handleToggleLock}
          />
        ))}
      </div>
    </div>
  );
};

export default Journals;
