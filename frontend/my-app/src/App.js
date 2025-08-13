import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Separate state for initial loading
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [approachingBottom, setApproachingBottom] = useState(false); // Track when user is near bottom
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

    // Primary intersection observer for precise detection
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingRef.current) {
          console.log(`Intersection detected, loading additional page ${page}`);
          fetchPosts(page, false); // false indicates this is NOT initial load
        }
      },
      {
        threshold: 0.01, // Reduced from 0.1 to 0.01 for faster detection
        rootMargin: "100px", // Increased from 50px to 100px for earlier triggering
      }
    );

    // Backup scroll event listener for immediate response
    const handleScroll = () => {
      if (loadingRef.current || !hasMore) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is approaching bottom (within 300px)
      const isApproaching = scrollTop + windowHeight >= documentHeight - 300;
      setApproachingBottom(isApproaching);

      // Trigger loading when user is within 200px of bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
        console.log(
          `Scroll detected near bottom, loading additional page ${page}`
        );
        fetchPosts(page, false);
      }
    };

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore, fetchPosts]);

  // Render loading state while fetching initial data
  if (initialLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="position-relative mb-4">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "5rem", height: "5rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h2 className="h2 fw-bold text-dark mb-2">Loading FeedFlow</h2>
          <p className="text-muted">Fetching your personalized content...</p>
          <div className="mt-3 d-flex justify-content-center gap-2">
            <div
              className="bg-primary rounded-circle pulse-dot"
              style={{ width: "8px", height: "8px" }}
            ></div>
            <div
              className="bg-primary rounded-circle pulse-dot"
              style={{ width: "8px", height: "8px", animationDelay: "0.2s" }}
            ></div>
            <div
              className="bg-primary rounded-circle pulse-dot"
              style={{ width: "8px", height: "8px", animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Enhanced sticky header */}
      <header className="sticky-top bg-white shadow-lg border-bottom">
        <div className="container-fluid py-4">
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center bg-primary rounded-3 shadow"
              style={{ width: "40px", height: "40px" }}
            >
              <svg
                className="text-white"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <h1 className="h1 fw-bold text-primary mb-0 gradient-text">
              FeedFlow
            </h1>
          </div>
          <p className="text-center text-muted mt-2 fw-medium mb-0">
            Discover amazing content
          </p>
        </div>
      </header>

      {/* Enhanced feed container with grid layout */}
      <main className="container-fluid py-4">
        {/* Welcome message for empty state */}
        {posts.length === 0 && !loading && !error && (
          <div className="text-center py-5">
            <div
              className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mx-auto mb-4"
              style={{ width: "96px", height: "96px" }}
            >
              <svg
                className="text-primary"
                width="48"
                height="48"
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
            <h2 className="h2 fw-bold text-dark mb-2">Welcome to FeedFlow</h2>
            <p className="text-muted">
              Your personalized content feed is loading...
            </p>
          </div>
        )}

        {/* Posts grid with responsive columns */}
        <div className="row g-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Enhanced loading state for additional data */}
        {loading && (
          <div className="text-center py-5">
            <div className="d-flex flex-column align-items-center gap-3">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="text-center">
                <p className="h5 fw-semibold text-dark mb-1">
                  Loading more posts...
                </p>
                <p className="text-muted small">
                  Please wait while we fetch amazing content
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced error state */}
        {error && (
          <div className="text-center py-5">
            <div className="mx-auto" style={{ maxWidth: "28rem" }}>
              <div
                className="d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle mx-auto mb-4"
                style={{ width: "80px", height: "80px" }}
              >
                <svg
                  className="text-danger"
                  width="40"
                  height="40"
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
              <h3 className="h4 fw-semibold text-dark mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-muted mb-4">{error}</p>
              <button
                onClick={() => fetchPosts(page - 1, false)}
                className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2 shadow"
              >
                <svg
                  width="20"
                  height="20"
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
          <div className="text-center py-5">
            <div className="mx-auto" style={{ maxWidth: "28rem" }}>
              <div
                className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mx-auto mb-4"
                style={{ width: "80px", height: "80px" }}
              >
                <svg
                  className="text-success"
                  width="40"
                  height="40"
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
              <h3 className="h4 fw-semibold text-dark mb-2">
                You've reached the end!
              </h3>
              <p className="text-muted">
                🎉 Congratulations! You've seen all the amazing content we have
                for you.
              </p>
            </div>
          </div>
        )}

        {/* Bottom loading indicator for infinite scroll */}
        {hasMore && (
          <div ref={loaderRef} className="py-5 bottom-loader-state">
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center gap-3 immediate-loading show">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="text-center">
                  <p className="fw-medium text-dark mb-1">
                    Loading more posts...
                  </p>
                  <p className="text-muted small">
                    Scroll to load more amazing content
                  </p>
                </div>
              </div>
            ) : approachingBottom ? (
              <div className="d-flex flex-column align-items-center justify-content-center gap-2 py-3 immediate-loading show">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="bg-primary rounded-circle approaching-pulse"
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                  <div
                    className="bg-primary rounded-circle approaching-pulse"
                    style={{
                      width: "12px",
                      height: "12px",
                      animationDelay: "0.2s",
                    }}
                  ></div>
                  <div
                    className="bg-primary rounded-circle approaching-pulse"
                    style={{
                      width: "12px",
                      height: "12px",
                      animationDelay: "0.4s",
                    }}
                  ></div>
                </div>
                <p className="text-primary fw-medium small mb-0">
                  Almost there! Keep scrolling...
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center gap-2 py-3 immediate-loading show">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="bg-primary bg-opacity-75 rounded-circle pulse-dot"
                    style={{ width: "8px", height: "8px" }}
                  ></div>
                  <div
                    className="bg-primary bg-opacity-75 rounded-circle pulse-dot"
                    style={{
                      width: "8px",
                      height: "8px",
                      animationDelay: "0.2s",
                    }}
                  ></div>
                  <div
                    className="bg-primary bg-opacity-75 rounded-circle pulse-dot"
                    style={{
                      width: "8px",
                      height: "8px",
                      animationDelay: "0.4s",
                    }}
                  ></div>
                </div>
                <p className="text-muted fw-medium small mb-0">
                  Scroll down to load more
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
