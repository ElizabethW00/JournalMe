import { IoAddOutline } from "react-icons/io5";
import Entry from "@/components/Entry";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getAllJournals } from "@/lib/actions/journal.actions";

const Journals = async () => {
  const user = await currentUser();
  const journals = await getAllJournals(user!.id);

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="bad-script text-4xl">My Journals</h1>
        <Link href="/write">
          <IoAddOutline size={42} color="black" />
        </Link>
      </div>
      <div className="mt-6">
        {journals.map((entry: any, index: number) => {
          return (
            <Entry
              key={"JOURNAL ENTRY " + index}
              _id={entry._id.toString()}
              date_created={entry.date_created.toDateString()}
              text={entry.text}
              user_id={entry.user_id}
              locked={entry.locked}
              last_edited={entry.last_edited.toDateString()}
              color={entry.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Journals;
