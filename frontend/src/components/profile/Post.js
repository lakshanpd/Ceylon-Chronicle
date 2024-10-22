import React, { useState } from "react";

function Post() {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    tags: [],
    images: [],
  });

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
      <form onSubmit={handleSubmit}>
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
