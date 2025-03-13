import PostCategory from "../models/post-cateogry.model.js";

export const createCategory = async (req, res, next) => {
  console.log(req.body, "req");
  try {
    const { title } = req?.body;
    const newCategory = new PostCategory({ title });
    await newCategory.save();
    res?.status(201).json(newCategory);
  } catch (error) {
    // res.status(500).json({ message: error?.message });
    next(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await PostCategory.find();
    res?.status(200).json(categories);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateCategory = await PostCategory.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res?.status(200).json(updateCategory);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    await PostCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
