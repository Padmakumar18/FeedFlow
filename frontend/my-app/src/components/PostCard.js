import React, { useState } from "react";

const PostCard = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-200">
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        {imageError && (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Failed to load image</p>
          </div>
        )}
        <img
          src={post.imageUrl}
          alt={post.caption}
          className={`w-full h-96 object-cover ${
            imageLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-4">
        <p className="text-gray-800">{post.caption}</p>
        <p className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
