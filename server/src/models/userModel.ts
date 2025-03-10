import mongoose, { Document } from "mongoose";

interface UserI {
  username: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
}

const userSchema = new mongoose.Schema<UserI>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  refreshToken: { type: String, required: false },
});

export const User = mongoose.model<UserI>("Users", userSchema);
