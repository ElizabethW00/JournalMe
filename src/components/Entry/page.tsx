import {
  IoLockClosed,
  IoLockOpen,
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { FaFont } from "react-icons/fa6";

type EntryProps = {
  id: number;
  name?: string;
  num?: number;
  date?: string;
  locked?: boolean;
  onDelete?: (id: number) => void;
  onToggleLock?: (id: number) => void;
};

const Entry = ({
  id,
  name,
  num,
  date,
  locked = false,
  onDelete,
  onToggleLock,
}: EntryProps) => {
  const handleEntryClick = () => {
    if (!locked) {
      console.log("Go to journal detail page");
    }
  };

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLock?.(id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent entry click
    onDelete?.(id);
  };

  return (
    <div
      onClick={handleEntryClick}
      className={`
        flex justify-between items-center border border-gray-100
        p-4 rounded-lg mb-4 cursor-pointer 
        transition-all duration-300 
        ${locked ? "bg-gray-200" : "bg-white"} 
        hover:shadow-md hover:translate-y-1
      `}
    >
      <p className="font-semibold text-lg">{name ?? `Journal ${num}`}</p>
      <p className="text-md">{date}</p>

      <div className="flex items-center gap-4">
        {!locked && <IoCreateOutline size={22} />}
        <button onClick={toggleLock}>
          {locked ? <IoLockClosed size={22} /> : <IoLockOpen size={22} />}
        </button>
        {/* <IoCreateOutline size={22} /> */}
        <button onClick={handleDeleteClick}>
          <IoTrashOutline size={22} />
        </button>
      </div>
    </div>
  );
};

export default Entry;
