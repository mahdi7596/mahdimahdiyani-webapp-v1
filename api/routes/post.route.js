import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import upload from "../middleware/multerConfig.js"; // Import Multer configuration

const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/getposts", getPosts);

router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

// router.put("/updatepost/:postId/:userId", verifyToken, updatePost);

router.put(
  "/updatepost/:postId/:userId",
  verifyToken,
  upload.single("image"), // Apply Multer middleware
  updatePost
);

export default router;
