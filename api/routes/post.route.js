import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

import multer from "multer";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/getposts", getPosts);

router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

// router.put("/updatepost/:postId/:userId", verifyToken, updatePost);

router.put(
  "/updatepost/:postId/:userId",
  verifyToken,
  upload.single("image"),
  updatePost
);

export default router;
