import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";
import fs from "fs"; // Add this line

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../images"); // Correct path
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

export const create = [
  upload.single("image"), // Middleware for handling a single image file
  async (req, res, next) => {
    // console.log("Request Body:", req.body); // Debugging: check other form data

    // console.log("Uploaded file path:", req.file.path);
    // console.log("Uploaded file:", req.file); // Debugging line

    if (!req.user.isAdmin) {
      return next(errorHandler(403, "شما مجاز به ایجاد پست نیستید."));
    }

    if (!req.body.title || !req.body.content) {
      return next(
        errorHandler(400, "لطفاً تمام فیلدهای مورد نیاز را ارائه دهید.")
      );
    }

    // Remove ZWNJ characters
    let title = req.body.title.replace(/\u200C/g, "");
    const slug = title.split(" ").join("-");
    // let encodedUrl = encodeURIComponent(url);

    // ! todo این رو نوشته بودم برای اینکه فقط متن انگلیسی باشه ولی باید یک فیلد برای نامک اضافه کنم
    // .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
      // image: req .file ? `/images/${req.file.filename}` : undefined, // Save file path
      image: req.file ? `/images/${req.file.filename}` : undefined, // Ensure file path is stored
    });
    // console.log(newPost);

    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  },
];

export const getPosts = async (req, res, next) => {
  try {
    // Restore pagination and sorting parameters
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Build filter query
    const filteredQuery = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    // Query posts
    const posts = await Post.find(filteredQuery)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate("category", "title")
      .select("-userId -__v -createdAt -updatedAt") // <-- exclude fields here
      .lean();

    // Count only matching documents
    const totalPosts = await Post.countDocuments(filteredQuery);

    // Count posts from the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Return response
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما مجاز به حذف این پست نیستید."));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("پست حذف شده است.");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  // console.log("Uploaded file:", req.file); // Debugging: Check if the file is received
  // console.log("Request body:", req.body); // Debugging: Check other form data

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما مجاز به به‌روزرسانی این پست نیستید."));
  }

  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "پست مورد نظر یافت نشد."));
    }

    let updatedImage = post.image; // Keep existing image if no new one is uploaded

    if (req.file) {
      // Delete the old image file if it exists
      if (post.image) {
        const oldImagePath = path.join(
          __dirname,
          "../images",
          path.basename(post.image)
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image
        }
      }

      updatedImage = `/images/${req.file.filename}`; // Save the new image path
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: updatedImage,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
