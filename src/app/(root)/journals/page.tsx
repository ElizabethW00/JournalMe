import { IoAddOutline } from "react-icons/io5";
import Entry from "@/components/Entry/Entry";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getAllJournals } from "@/lib/actions/journal.actions";

const Journals = async () => {
  const user = await currentUser();
  const journals = await getAllJournals(user!.id);

  const handleToggleLock = (id: number) => {};

  const handleDelete = (id: number) => {};

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="bad-script text-4xl">My Journals</h1>
        <Link href="/write">
          <IoAddOutline size={42} color="black" />
        </Link>
      </div>
      <div className="mt-6">
        {journals.map((entry: any, index: number) => (
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
