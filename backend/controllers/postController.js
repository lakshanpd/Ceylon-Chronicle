const Post = require("../models/postModel");

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
