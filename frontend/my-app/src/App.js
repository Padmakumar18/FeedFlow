import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import "./styles/App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const loaderRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchPosts = useCallback(
    async (pageNum, isRetry = false) => {
      if (loading && !isRetry) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/posts?page=${pageNum}&limit=12`,
          {
            signal: abortControllerRef.current.signal,
            timeout: 10000, // 10 second timeout
          }
        );

        const newPosts = response.data.content;

        setPosts((prev) => (pageNum === 0 ? newPosts : [...prev, ...newPosts]));
        setHasMore(!response.data.last);
        setPage(pageNum + 1);
        setRetryCount(0);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
          return;
        }

        console.error("Error fetching posts:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to load posts. Please check your connection.";
        setError(errorMessage);
        setRetryCount((prev) => prev + 1);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [loading]
  );

  const handleRetry = useCallback(() => {
    const currentPage = posts.length > 0 ? Math.floor(posts.length / 12) : 0;
    fetchPosts(currentPage, true);
  }, [posts.length, fetchPosts]);

  const handleRefresh = useCallback(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    setInitialLoading(true);
    fetchPosts(0);
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts(0);

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !error) {
          fetchPosts(page);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader && !initialLoading) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [page, hasMore, loading, fetchPosts, error, initialLoading]);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600 text-lg">Loading FeedFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onRefresh={handleRefresh} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No posts yet
              </h2>
              <p className="text-gray-500">
                Be the first to share something amazing!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard key={`${post.id}-${index}`} post={post} index={index} />
            ))}
          </div>

          {loading && posts.length > 0 && (
            <div className="text-center py-8">
              <LoadingSpinner />
              <p className="mt-2 text-gray-600">Loading more posts...</p>
            </div>
          )}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={handleRetry}
              retryCount={retryCount}
            />
          )}

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-gray-500 text-lg">You've reached the end!</p>
              <p className="text-gray-400 text-sm">No more posts to load</p>
            </div>
          )}

          {hasMore && !loading && !error && posts.length > 0 && (
            <div
              ref={loaderRef}
              className="h-20 flex items-center justify-center"
            >
              <div className="text-gray-400">Scroll for more...</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
