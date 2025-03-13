import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const PostCategory = mongoose.model("categories", postCategorySchema);

export default PostCategory;
