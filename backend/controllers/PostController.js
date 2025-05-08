const { deleteImage } = require("../services/cloudinary.service");
const db = require("../db");

exports.getPosts = async (req, res) => {
  try {
    const [posts] = await db.execute(`
      SELECT posts.*, users.first_name, users.last_name, users.profilePic, users.isOnline
      FROM posts
      JOIN users ON posts.user_id = users.id
    `);
    // const [posts] = await db.execute("SELECT * FROM posts");
    // console.log("Posts fetched successfully:", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const [posts] = await db.execute(`
//   SELECT posts.*, users.first_name, users.last_name
//   FROM posts
//   JOIN users ON posts.user_id = users.id
// `);

exports.getPostByIdPost = async (req, res) => {
  // console.log("Request Params:", req.params);
  const postId = req.params.id;
  try {
    const [post] = await db.execute(`SELECT posts.*, users.first_name, users.last_name, users.profilePic, users.isOnline
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.id = ?`, [
      postId,
    ]);

    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post fetched successfully:", post[0]);
    res.status(200).json(post[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getPostByIdUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [posts] = await db.execute(`SELECT posts.*, users.first_name, users.last_name, users.profilePic, users.isOnline
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.user_id = ?`, [
      userId,
    ]);

    if (posts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }
    console.log("Posts fetched successfully:", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.createPost = async (req, res) => {
// console.log("Request Body:", req.body);
  const { user_id, content } = req.body;
  const image = req.body.image || " ";
  // console.log("Image:", image);
  // if (!user_id || !content) {
  //     return res.status(400).json({ message: "user_id and content are required" });
  // }
  try {
    // console.log("test2");
    
    const [result] = await db.execute(
      "INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)",
      [user_id, content, image]
    );
    console.log("Post created successfully:", result.insertId);
    res
      .status(201)
      .json({ message: "Post created successfully", postId: result.insertId });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  } // Assuming you're using multer for file uploads
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const image = req.body.image || " ";
  try {
    const [oldImage] = await db.execute("SELECT image FROM posts WHERE id = ?", [
      postId,
    ])
    if(oldImage[0].image !== image){
      const resImage= await deleteImage(oldImage[0].image);
      console.log(resImage);
    }

    const [result] = await db.execute(
      "UPDATE posts SET content = ?, image = ? WHERE id = ?",
      [content, image, postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post updated successfully:", result.affectedRows);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    
    const [image] = await db.execute("SELECT image FROM posts WHERE id = ?", [
      postId,
    ])
    const resImage= await deleteImage(image[0].image);

    console.log(resImage);
    const [result] = await db.execute("DELETE FROM posts WHERE id = ?", [
      postId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post deleted successfully:", result.affectedRows);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.likePost = async (req, res) => {
    const postId = req.params.id;
  
    try {
      
      const [result] = await db.execute(
        "UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?",
        [postId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      console.log("Post liked successfully:", postId);
      res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  exports.unlikePost = async (req, res) => {
    const postId = req.params.id;
  
    try {
      const [result] = await db.execute(
        "UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = ?",
        [postId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      console.log("Post unliked successfully:", postId);
      res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
      console.error("Error unliking post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
