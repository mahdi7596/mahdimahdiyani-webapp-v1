import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/post-category.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategories", getAllCategories);
router.put("updateCategory/:id", updateCategory);
router.delete("deleteCategory/:id", deleteCategory);

export default router;
