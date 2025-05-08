const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { upload, uploadImage, deleteImage } = require("../services/cloudinary.service");

// Route to get all posts
router.get("/", PostController.getPosts);

// Route to get a specific post by ID
router.get("/:id", PostController.getPostByIdPost);

// Route to get all posts by a specific user
router.get("/user/:id", PostController.getPostByIdUser);

// Route to create a new post
router.post("/", PostController.createPost);

// Route to update a specific post
router.put("/:id", PostController.updatePost);

// Route to delete a specific post
router.delete("/:id", PostController.deletePost);

// Route to like a post
router.patch("/:id/like", PostController.likePost);

// Route to unlike a post
router.patch("/:id/unlike", PostController.unlikePost);

router.post("/image", upload.single("image"), uploadImage);

router.delete("/image/:id", deleteImage);

module.exports = router;