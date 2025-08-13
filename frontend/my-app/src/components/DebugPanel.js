import React from "react";

const DebugPanel = ({ posts, page, loading, hasMore, error }) => {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-sm max-w-xs">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div>Posts loaded: {posts.length}</div>
      <div>Current page: {page}</div>
      <div>Loading: {loading ? "Yes" : "No"}</div>
      <div>Has more: {hasMore ? "Yes" : "No"}</div>
      <div>Error: {error ? "Yes" : "No"}</div>
    </div>
  );
};

export default DebugPanel;
