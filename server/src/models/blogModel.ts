import mongoose, { Document } from "mongoose";

// Definittion for the Blog interface
export interface BlogI extends Document {
  title: string;
  description: string;
  body: string;
  authorID: string;
}

// Schema Definition
const blogSchema = new mongoose.Schema<BlogI>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    authorID: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the models
export const Blog = mongoose.model<BlogI>("Blog", blogSchema);
