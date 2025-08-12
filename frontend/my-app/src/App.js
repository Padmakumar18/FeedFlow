import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import "./styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);

  const fetchPosts = useCallback(
    async (pageNum) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/posts?page=${pageNum}&limit=10`
        );
        const newPosts = response.data.content;

        setPosts((prev) => (pageNum === 0 ? newPosts : [...prev, ...newPosts]));
        setHasMore(!response.data.last);
        setPage(pageNum + 1);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    // Load initial posts
    fetchPosts(0);
  }, [fetchPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts(page);
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [page, hasMore, loading, fetchPosts]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-6">FeedFlow</h1>
      <div className="w-full max-w-2xl space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading more posts...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-4 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => fetchPosts(page)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="text-center text-gray-500 py-4">
            No more posts to load
          </p>
        )}
        {hasMore && !loading && <div ref={loaderRef} className="h-10"></div>}
      </div>
    </div>
  );
};

export default App;
