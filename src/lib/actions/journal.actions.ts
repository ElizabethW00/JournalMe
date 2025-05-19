"use server";
import { connectToDB } from "../mongoose";
import Journal from "../models/journal.model";
import { getUser } from "./user.actions";
import User from "../models/user.model";

export async function getJournalById(journalId: string) {
  try {
    connectToDB();
    const journal = await Journal.findById(journalId);
    if (!journal) {
      throw new Error(`Journal with id ${journalId} not found`);
    }
    return journal;
  } catch (error: any) {
    throw new Error(
      `Fail to get journal with id: ${journalId} error: ${error.message}`
    );
  }
}


type JournalType = {
  journalId: string;
  text: string;
  date: Date;
  locked: boolean;
  color: string;
};
export async function updateJournalById({
  journalId,
  text,
  date,
  locked,
  color,
}: JournalType) {
  try {
    connectToDB();
    const journal = await getJournalById(journalId);
    if (!journal)
      throw new Error(`Journal with id: ${journalId} does not exist`);
    journal.text = text;
    journal.last_edited = date;
    journal.locked = locked;
    journal.color = color;
    await journal.save();
  } catch (error: any) {
    throw new Error(
      `Fail to update journal with id: ${journalId} error: ${error.message}`
    );
  }
}

export async function deleteJournalById(journalId: string) {
  try {
    connectToDB();
    const journal = await getJournalById(journalId);

    if (journal) {
      const user = await getUser(journal.user_id);
      if (user) {
        const id_arr: string[] = user.journal_ids;
        const index = id_arr.indexOf(journalId);
        if (index > -1) {
          id_arr.splice(index, 1);
          await user.save();
        }
      }

      await Journal.findByIdAndDelete(journalId);
    }
  } catch (error: any) {
    throw new Error(
      `Fail to delete user with id: ${journalId} error: ${error.message}`
    );
  }
}

export async function getAllJournals(user_id: string) {
  try {
    connectToDB();
    const user = await User.findOne({ user_id }).populate("journal_ids");
    user.journal_ids.sort((a: any, b: any) => b.date_created - a.date_created);
    return user.journal_ids;
  } catch (error: any) {
    throw new Error(
      `Fail to get journals with  user_id: ${user_id} error: ${error.message}`
    );
  }
}

type JournalInitial = {
  date_created: Date;
  text: string;
  user_id: string;
  locked: boolean;
  color: string;
};
export async function createJournal({
  date_created,
  text,
  user_id,
  locked,
  color,
}: JournalInitial) {
  try {
    connectToDB();
    const journal = await Journal.create({
      date_created,
      text,
      user_id,
      locked,
      last_edited: date_created,
      color,
    });

    const user = await getUser(user_id);
    if (user) {
      user.journal_ids.push(journal._id);
      await user.save();
    }
  } catch (error: any) {
    throw new Error(`Fail to create journal error: ${error.message}`);
  }
}
