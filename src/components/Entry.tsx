"use client";
import {
  deleteJournalById,
  updateJournalById,
} from "@/lib/actions/journal.actions";
import { useState } from "react";
import {
  IoLockClosed,
  IoLockOpen,
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type EntryProps = {
  _id: string;
  date_created: string;
  text: string;
  user_id: string;
  locked: boolean;
  last_edited: string;
  color: string;
};
const Entry = ({
  _id,
  date_created,
  text,
  locked,
  last_edited,
  color,
}: EntryProps) => {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(locked);
  const [isDeleted, setIsDeleted] = useState(false);

  const toggleLock = async (e: MouseEvent) => {
    await updateJournalById({
      journalId: _id,
      text: text,
      date: new Date(),
      locked: !isLocked,
      color: color,
    });

    setIsLocked(!isLocked);
  };

  const handleDelete = async (e: MouseEvent) => {
    await deleteJournalById(_id);
    setIsDeleted(true);
    toast.success("Successfully deleted journal!");
  };

  const handleEdit = async (e: MouseEvent) => {
    if (!isLocked) router.push(`/write/${_id}`);
  };

  return (
    <div
      className={`relative flex justify-between items-center border border-gray-100 p-4 rounded-lg mb-4 transition-all duration-300 ${
        isLocked ? "bg-gray-200" : "bg-white"
      } hover:shadow-md hover:translate-y-1 ${isDeleted && `hidden`}`}
    >
      <div
        className={`flex flex-row gap-12 items-center justify-center ${
          !isLocked && "cursor-pointer"
        }`}
        onClick={handleEdit}
      >
        <div>
          <h1 className="font-semibold text-lg">{date_created}</h1>
          <h3 className="font-light text-sm">Last edited: {last_edited}</h3>
        </div>

        <p>{!isLocked ? text.substring(0, 10) + "..." : null}</p>
      </div>

      <div className="flex items-center gap-4">
        {!isLocked && (
          <IoCreateOutline
            size={22}
            onClick={handleEdit}
            className="cursor-pointer"
          />
        )}

        {isLocked ? (
          <IoLockClosed
            size={22}
            onClick={toggleLock}
            className="cursor-pointer"
          />
        ) : (
          <IoLockOpen
            size={22}
            onClick={toggleLock}
            className="cursor-pointer"
          />
        )}

        {!isLocked && (
          <IoTrashOutline
            size={22}
            onClick={handleDelete}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Entry;
