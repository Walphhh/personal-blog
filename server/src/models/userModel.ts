import mongoose, { Document } from "mongoose";

interface UserI {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserI>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<UserI>("User", userSchema);
