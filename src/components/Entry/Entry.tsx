import clsx from "clsx";
import {
  IoLockClosed,
  IoLockOpen,
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";

const ColorMap: {
  [key: string]: string;
} = {
  "Math HW": "text-[#4F6C94] border-[#4F6C94]",
  Cooking: "text-[#4B7465] border-[#4B7465]",
  Work: "text-[#904F94] border-[#904F94]",
  Meeting: "text-[#AA142D] border-[#AA142D]",
};

const CategoryIcon = ({
  category,
  className,
}: {
  category?: string;
  className: string;
}) => {
  if (!category) return;

  return (
    <div
      className={clsx(
        className,
        ColorMap[category],
        "flex border-2 w-fit p-2 rounded-full items-center justify-center min-w-[100px]"
      )}
    >
      {category}
    </div>
  );
};

type EntryProps = {
  id: number;
  date?: string;
  excerpt?: string;
  category?: string;
  locked?: boolean;
  onDelete?: (id: number) => void;
  onToggleLock?: (id: number) => void;
};
const Entry = ({
  id,
  date,
  excerpt,
  category,
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
    e.stopPropagation();
    onDelete?.(id);
  };

  return (
    <div
      onClick={handleEntryClick}
      className={`relative flex justify-between items-center border border-gray-100 p-4 rounded-lg mb-4 cursor-pointer transition-all duration-300 ${
        locked ? "bg-gray-200" : "bg-white"
      } hover:shadow-md hover:translate-y-1`}
    >
      <div className="flex gap-6">
        <p className="font-semibold text-lg">{date}</p>
        <p className="text-md">{excerpt}</p>
      </div>

      <CategoryIcon
        className="flex items-center absolute right-1/6 gap-2"
        category={category}
      />

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
