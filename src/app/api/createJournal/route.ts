import { createJournal } from "@/lib/actions/journal.actions";
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

    const { date, text } = await request.json();
    await createJournal({
      date_created: date,
      text,
      user_id: user.id,
      locked: false,
    });

    return NextResponse.json({ text: "Saved journal" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal error at POST createJournal` },
      { status: 500 }
    );
  }
}
