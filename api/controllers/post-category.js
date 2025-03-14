import PostCategory from "../models/post-cateogry.model.js";

export const createCategory = async (req, res, next) => {
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

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await PostCategory.find().sort({ createdAt: -1 });
    res?.status(200).json(categories);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
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

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req?.params;
    await PostCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "دسته بندی با موفقیت حذف شد" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};
