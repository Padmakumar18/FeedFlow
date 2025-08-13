import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import DebugPanel from "./components/DebugPanel";
import "./styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Separate state for initial loading
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);
  const loadingRef = useRef(false);
  const currentRequestRef = useRef(null); // Track current request for cancellation
  const lastPageRef = useRef(-1); // Track last loaded page to prevent duplicates

  const fetchPosts = useCallback(async (pageNum, isInitialLoad = false) => {
    // Prevent duplicate requests for the same page
    if (loadingRef.current || lastPageRef.current === pageNum) {
      console.log(`Skipping duplicate request for page ${pageNum}`);
      return;
    }

    // Cancel previous request if still pending
    if (currentRequestRef.current) {
      currentRequestRef.current.cancel("New request initiated");
    }

    console.log(`Fetching page ${pageNum} - Initial load: ${isInitialLoad}`);
    loadingRef.current = true;

    // Set appropriate loading state
    if (isInitialLoad) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }

    setError(null);

    // Create cancellation token
    const cancelToken = axios.CancelToken.source();
    currentRequestRef.current = cancelToken;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/posts?page=${pageNum}&limit=10`,
        { cancelToken: cancelToken.token }
      );

      const newPosts = response.data.content;
      console.log(`Loaded ${newPosts.length} posts for page ${pageNum}`);

      // Handle data based on whether it's initial load or additional data
      if (isInitialLoad) {
        // Initial load: replace all posts
        setPosts(newPosts);
        console.log("Initial data loaded, posts replaced");
      } else {
        // Additional load: append to existing posts
        setPosts((prev) => [...prev, ...newPosts]);
        console.log("Additional data loaded, posts appended");
      }

      setHasMore(!response.data.last);
      setPage(pageNum + 1);
      lastPageRef.current = pageNum;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled:", error.message);
        return;
      }
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again.");
    } finally {
      // Clear appropriate loading state
      if (isInitialLoad) {
        setInitialLoading(false);
      } else {
        setLoading(false);
      }

      loadingRef.current = false;
      currentRequestRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Load initial posts only once
    console.log("Component mounted, starting initial data fetch");
    fetchPosts(0, true);

    // Cleanup function to cancel any pending requests
    return () => {
      if (currentRequestRef.current) {
        currentRequestRef.current.cancel("Component unmounting");
      }
    };
  }, [fetchPosts]);

  useEffect(() => {
    if (!hasMore || loadingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingRef.current) {
          console.log(`Intersection detected, loading additional page ${page}`);
          fetchPosts(page, false); // false indicates this is NOT initial load
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Load content 50px before reaching the loader
      }
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
  }, [page, hasMore, fetchPosts]);

  // Render loading state while fetching initial data
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading FeedFlow
          </h2>
          <p className="text-gray-600">Fetching your personalized content...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced sticky header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-lg z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FeedFlow
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2 font-medium">
            Discover amazing content
          </p>
        </div>
      </header>

      {/* Enhanced feed container with grid layout */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome message for empty state */}
        {posts.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to FeedFlow
            </h2>
            <p className="text-gray-600">
              Your personalized content feed is loading...
            </p>
          </div>
        )}

        {/* Posts grid with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Enhanced loading state for additional data */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 mb-1">
                  Loading more posts...
                </p>
                <p className="text-sm text-gray-500">
                  Please wait while we fetch amazing content
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced error state */}
        {error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => fetchPosts(page - 1, false)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Enhanced end of feed message */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                You've reached the end!
              </h3>
              <p className="text-gray-600">
                🎉 Congratulations! You've seen all the amazing content we have
                for you.
              </p>
            </div>
          </div>
        )}

        {/* Bottom loading indicator for infinite scroll */}
        {hasMore && (
          <div ref={loaderRef} className="py-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-gray-700">
                    Loading more posts...
                  </p>
                  <p className="text-sm text-gray-500">
                    Scroll to load more amazing content
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-500 font-medium">
                  Scroll down to load more
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* <DebugPanel
        posts={posts}
        page={page}
        loading={loading}
        hasMore={hasMore}
        error={error}
      /> */}
    </div>
  );
};

export default App;
