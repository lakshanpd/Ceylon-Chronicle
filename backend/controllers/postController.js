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
