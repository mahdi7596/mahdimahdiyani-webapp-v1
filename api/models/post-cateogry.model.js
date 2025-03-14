import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PostCategory = mongoose.model("PostCategory", postCategorySchema);

export default PostCategory;
