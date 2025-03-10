import mongoose, { Document, Schema } from "mongoose";

// Definittion for the Blog interface
export interface BlogI extends Document {
  title: string;
  description: string;
  body: string;
  authorUserID: mongoose.Schema.Types.ObjectId; // Primary key, refers to the userID of the author
  createdAt: Date;
  updatedAt: Date;
}

// Schema Definition
const blogSchema = new mongoose.Schema<BlogI>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    authorUserID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);

// Export the models
export const Blog = mongoose.model<BlogI>("Blogs", blogSchema);
