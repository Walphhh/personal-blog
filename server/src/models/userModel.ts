import mongoose, { Document } from "mongoose";

interface UserI {
  username: string;
  password: string;
  refreshToken: string;
}

const userSchema = new mongoose.Schema<UserI>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
});

export const User = mongoose.model<UserI>("User", userSchema);
