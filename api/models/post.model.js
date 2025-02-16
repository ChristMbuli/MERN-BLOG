import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true
    }, 
  },
  {
    timestamps: true,
  }
);

// Middleware pour générer le slug avant de sauvegarder un post
postSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = `${this.title}`
      .toLowerCase()
      .replace(/\s+/g, "-");
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
