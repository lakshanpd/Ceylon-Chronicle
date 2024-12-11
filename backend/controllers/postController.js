const Post = require("../models/postModel");
const User = require("../models/userModel");

exports.createPost = async (req, res) => {
  try {
    const { userId, topic, tags, description, images } = req.body;

    const postData = {
      userId: userId,
      topic: topic,
      tags: tags,
      description: description,
      images: images,
    };

    const newPost = new Post(postData);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error saving post", error });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { _id } = req.body; // Get the user ID from the request body

    // Fetch posts where the userId matches the provided user ID
    const posts = await Post.find({ userId: _id });
    console.log(posts);

    // Respond with the found posts
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error finding posts", err });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // Step 1: Fetch all posts
    const posts = await Post.find();

    // Step 2: Map over posts and fetch the user name for each post's userId
    const postsWithUser = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.userId); // Fetch user's name
        return {
          postId: post._id,
          userId: post.userId,
          userName: user.username, // Handle case if user is not found
          firstName: user.firstName,
          lastName: user.lastName,
          topic: post.topic,
          images: post.images,
          description: post.description,
          tags: post.tags,
        };
      })
    );

    // Step 3: Send the response with posts and their corresponding user names
    res.status(200).json(postsWithUser);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params; // Get the post ID from the request parameters

    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
