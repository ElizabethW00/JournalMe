import {
  createJournal,
  getAllJournals,
  getJournalById,
  updateJournalById,
} from "@/lib/actions/journal.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: `No valid user at POST createJournal` },
        { status: 400 }
      );
    }

    const userDB = await getUser(user.id);
    if (!userDB) {
      return NextResponse.json(
        { error: `No valid user at POST createJournal` },
        { status: 400 }
      );
    }

    const { date, text, journalId, color } = await request.json();
    // has journal id -> either update or get journal
    if (journalId) {
      if (!date && !text) {
        // find + return journal
        const journal = await getJournalById(journalId);
        return NextResponse.json({ journal }, { status: 200 });
      } else {
        // update journal
        await updateJournalById({
          journalId,
          text,
          date,
          locked: false,
          color
        });
      }
    } else {
      // create journal
      await createJournal({
        date_created: date,
        text,
        user_id: user.id,
        locked: false,
        color,
      });
    }

    return NextResponse.json({ text: "Saved journal" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal error at POST createJournal` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: `No valid user at GET createJournal` },
        { status: 400 }
      );
    }

    const journals = await getAllJournals(user.id);
    return NextResponse.json({ journals }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal error at GET createJournal` },
      { status: 500 }
    );
  }
}
