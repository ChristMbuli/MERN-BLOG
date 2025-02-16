import express from 'express';
import { getAllPosts, getPost, newPost } from '../controllers/post.controllers.js';

const router = express();

router.post("/new", newPost)
router.get("/", getAllPosts);
router.get("/:id", getPost);

export default router;