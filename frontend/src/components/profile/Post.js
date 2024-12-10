import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { storage } from "../firebase"; // Import storage from firebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions

function Post() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    tags: [],
    images: [],
    imagePreviews: [], // Store image previews
  });

  const [uploading, setUploading] = useState(false); // For upload status
  const maxImageCount = 10; // Max number of images

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

  // Function to upload images to Firebase Storage
  const uploadImages = async (files) => {
    setUploading(true);
    const uploadPromises = files.map(async (file) => {
      const imageRef = ref(storage, `posts/${user._id}/${file.name}`);
      await uploadBytes(imageRef, file); // Upload each file
      const url = await getDownloadURL(imageRef); // Get the file's URL after upload
      return url;
    });

    const uploadedImages = await Promise.all(uploadPromises); // Get all image URLs
    setUploading(false);
    return uploadedImages;
  };

  const submit = async (e) => {
    e.preventDefault();
    const { topic, tags, description, images } = formData;

    try {
      // First, upload the images to Firebase Storage and get the URLs
      const uploadedImagesUrls = await uploadImages(images);

      // Then, submit the post with the image URLs
      const response = await fetch("http://localhost:3001/api/post", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          topic: topic,
          tags: tags,
          description: description,
          images: uploadedImagesUrls, // Send image URLs instead of raw files
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log(response.status);
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("Your post is posted successfully", json);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle tag selection
  const handleTagClick = (tag) => {
    setFormData((prevFormData) => {
      const tags = prevFormData.tags.includes(tag)
        ? prevFormData.tags.filter((t) => t !== tag)
        : [...prevFormData.tags, tag];
      return { ...prevFormData, tags };
    });
  };

  // Handle image uploads and preview
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length + formData.images.length > maxImageCount) {
      alert(`You can upload a maximum of ${maxImageCount} images.`);
      return;
    }

    const imagePreviews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setFormData({
      ...formData,
      images: [...formData.images, ...selectedImages], // Add new images
      imagePreviews: [...formData.imagePreviews, ...imagePreviews], // Add new previews
    });
  };

  // Handle image preview removal
  const removeImage = (index) => {
    setFormData((prevFormData) => {
      const updatedImages = [...prevFormData.images];
      const updatedPreviews = [...prevFormData.imagePreviews];
      updatedImages.splice(index, 1); // Remove selected image
      updatedPreviews.splice(index, 1); // Remove selected preview
      return {
        ...prevFormData,
        images: updatedImages,
        imagePreviews: updatedPreviews,
      };
    });
  };

  return (
    <div className="w-3/4 max-w-lg p-4 border rounded-lg bg-gray-100 shadow-md font-open-sans-condensed">
      <form onSubmit={submit}>
        {/* Topic Field */}
        <div className="mb-4">
          <label
            className="block mb-2 sw-480:text-lg font-semibold opacity-90"
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
            className="block mb-2 sw-480:text-lg font-semibold opacity-90"
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

        {/* Tags Field */}
        <div className="mb-4">
          <label className="block mb-2 sw-480:text-lg font-semibold opacity-90">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-3 py-1 border sw-480:text-md text-sm rounded-full transition-colors duration-300 ${
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
            className="block mb-2 sw-480:text-lg font-semibold opacity-90"
            htmlFor="images"
          >
            Add Images (Max {maxImageCount})
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="w-full p-2 sw-480:text-md text-sm"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          {/* Display image previews */}
          <div className="flex flex-wrap gap-2 mt-4">
            {formData.imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                {/* Remove button */}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Post Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 sw-480:text-md text-sm"
            disabled={uploading} // Disable button while uploading
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
