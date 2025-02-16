import { body, validationResult } from "express-validator";
import Post from "../models/post.model.js";
import { isValidObjectId } from "../utils/helpers.js";
import errorHandler from "../utils/errorHandler.js";
import xss from 'xss';

export const newPost = [
  // Validation des données
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('imageUrl').optional().isURL().withMessage('Invalid URL format for imageUrl'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { title, content, imageUrl, author } = req.body;

    // Assainir les données d'entrée
    title = xss(title);
    content = xss(content);

    try {
      const newPost = await Post.create({ title, content, imageUrl, author });
      res.status(201).json({ newPost, message: "Post created successfully" });
    } catch (error) {
      next(errorHandler(error.status || 500, error.message || "Erreur serveur."));
    }
  }
];

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    // Vérifier si des posts existent
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({ posts, message: "All posts fetched successfully" });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur."));
  }
};

export const getPost = async (req, res, next) => {
  const { id } = req.params;

  // Vérification de la validité de l'ID
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(id);

    // Si le post n'est pas trouvé
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post, message: "Post fetched successfully" });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur."));
  }
};
