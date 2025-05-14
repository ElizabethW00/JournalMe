"use server";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

export async function getUser(user_id: string) {
  try {
    connectToDB();
    const user = await User.findOne({ user_id });
    return user;
  } catch (error: any) {
    throw new Error(
      `Fail to get user with id: ${user_id} error: ${error.message}`
    );
  }
}

export async function createUser(user_id: string) {
  try {
    connectToDB();
    const user = await getUser(user_id);
    if (!user) {
      await User.create({ user_id, journal_ids: [] });
    }
  } catch (error: any) {
    throw new Error(
      `Fail to update user with id: ${user_id} error: ${error.message}`
    );
  }
}
