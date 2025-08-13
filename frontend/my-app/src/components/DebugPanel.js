import React from "react";

const DebugPanel = ({ posts, page, loading, hasMore, error }) => {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div
      className="position-fixed bottom-0 end-0 m-3 bg-dark text-white p-3 rounded shadow"
      style={{ maxWidth: "18rem", fontSize: "0.875rem" }}
    >
      <h6 className="fw-bold mb-2">Debug Info</h6>
      <div>Posts loaded: {posts.length}</div>
      <div>Current page: {page}</div>
      <div>Loading: {loading ? "Yes" : "No"}</div>
      <div>Has more: {hasMore ? "Yes" : "No"}</div>
      <div>Error: {error ? "Yes" : "No"}</div>
    </div>
  );
};

export default DebugPanel;
