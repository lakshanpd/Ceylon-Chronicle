import React, { useState } from "react";
import { useAuth } from "../AuthContext";

function Post() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    tags: [],
    images: [],
  });

  const submit = (e) => {
    e.preventDefault();
    const { topic, tags, description, images } = formData;
    fetch("http://localhost:3001/api/post", {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        topic: topic,
        tags: tags,
        description: description,
        images: images,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          throw new Error("Network response was not okkkkk"); // Handle HTTP errors
        }
        return res.json(); // Parse the response JSON
      })
      .then((json) => console.log("Your post is posted successfully", json))
      .catch((e) => console.log(e));
  };

  // Predefined tags for selection
  const availableTags = [
    "Nature",
    "Adventure",
    "Culture",
    "Beach",
    "Mountain",
    "Wildlife",
    "City",
    "Food",
    "History",
    "Art",
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle tag selection using buttons
  const handleTagClick = (tag) => {
    setFormData((prevFormData) => {
      const tags = prevFormData.tags.includes(tag)
        ? prevFormData.tags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevFormData.tags, tag]; // Add tag if not selected
      return { ...prevFormData, tags };
    });
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setFormData({ ...formData, images: selectedImages });
  };

  // Handle post submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Submitted", formData);
    // Add logic to send formData to server or process it here
  };

  return (
    <div className="w-3/4 max-w-lg p-4 border rounded-lg bg-gray-100 shadow-md font-open-sans-condensed">
      <form onSubmit={submit}>
        {/* Topic Field */}
        <div className="mb-4">
          <label
            className="block mb-2 text-lg font-semibold opacity-90"
            htmlFor="topic"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            className="w-full p-2 border rounded-lg"
            value={formData.topic}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            className="block mb-2 text-lg font-semibold opacity-90"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border rounded-lg"
            rows="6"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Tags Field (Using buttons for tag selection) */}
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold opacity-90">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-3 py-1 border rounded-full transition-colors duration-300 ${
                  formData.tags.includes(tag)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload Field */}
        <div className="mb-4">
          <label
            className="block mb-2 text-lg font-semibold opacity-90"
            htmlFor="images"
          >
            Add Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="w-full p-2"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Post Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
