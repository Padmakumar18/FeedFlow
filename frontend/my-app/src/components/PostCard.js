import React, { useState } from "react";

const PostCard = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card h-100 shadow-sm border-0 post-card">
      <div className="position-relative overflow-hidden">
        {!imageLoaded && !imageError && (
          <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{ aspectRatio: "4/3" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {imageError && (
          <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{ aspectRatio: "4/3" }}
          >
            <div className="text-center">
              <div
                className="d-flex align-items-center justify-content-center bg-secondary rounded-circle mx-auto mb-2"
                style={{ width: "48px", height: "48px" }}
              >
                <svg
                  className="text-white"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="small text-muted fw-medium mb-0">
                Image not available
              </p>
            </div>
          </div>
        )}
        <img
          src={post.imageUrl}
          alt={post.caption}
          className={`card-img-top object-fit-cover transition-opacity ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ aspectRatio: "4/3", transition: "all 0.7s ease" }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1 mb-3">
          <p
            className="card-text text-dark fw-semibold lh-base"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.caption}
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center bg-primary rounded-circle"
              style={{ width: "24px", height: "24px" }}
            >
              <svg
                className="text-white"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="small text-muted fw-medium">FeedFlow User</span>
          </div>

          <div className="d-flex align-items-center gap-1 text-muted">
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="small fw-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
