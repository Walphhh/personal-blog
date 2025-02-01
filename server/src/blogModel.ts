import mongoose, { Document } from "mongoose";

// Definittion for the Blog interface
export interface BlogI extends Document {
  title: string;
  description: string;
  body: string;
}

// Schema Definition
const blogSchema = new mongoose.Schema<BlogI>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
});

// Export the model
export const Blog = mongoose.model<BlogI>("Blog", blogSchema);
