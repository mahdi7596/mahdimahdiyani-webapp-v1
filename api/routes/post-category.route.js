import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/post-category.js";

const router = express.Router();

router.post("/createCategory", verifyToken, createCategory);
router.get("/getAllCategories", getAllCategories);
router.put("/updateCategory/:id", verifyToken, updateCategory);
router.delete("/deleteCategory/:id", verifyToken, deleteCategory);

export default router;
