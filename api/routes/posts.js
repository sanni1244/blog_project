import express from "express";
import { getPost, getPosts, addPost, deletePosts, updatePost } from "../controllers/post.js";


const router = express.Router();

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePosts)
router.put("/:id", updatePost)



export default router;