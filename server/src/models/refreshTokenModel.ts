import mongoose, { Document } from "mongoose";

interface refreshTokenI extends Document {
  token: string;
  expiresIn: Date;
}

const refreshTokenSchema = new mongoose.Schema<refreshTokenI>({
  token: { type: String, required: true },
  expiresIn: { type: Date, required: true },
});

export const refreshTokenModel = mongoose.model<refreshTokenI>(
  "tokens",
  refreshTokenSchema
);
