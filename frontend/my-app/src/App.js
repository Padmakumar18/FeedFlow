import React, {
  useState,
  useEffect,
  useRef,
} from "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.2/+esm";
import PostCard from "./components/PostCard";
import "./styles/App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/posts?page=${pageNum}&limit=10`
      );
      const newPosts = response.data.content;
      setPosts((prev) => (pageNum === 0 ? newPosts : [...prev, ...newPosts]));
      setHasMore(!response.data.last);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load first 20 posts (2 pages)
    Promise.all([fetchPosts(0), fetchPosts(1)]).then(() => setPage(2));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts(page);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page, hasMore, loading]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-6">FeedFlow</h1>
      <div className="w-full max-w-2xl space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {loading && <p className="text-center">Loading...</p>}
        {hasMore && <div ref={loaderRef} className="h-10"></div>}
      </div>
    </div>
  );
};

export default App;
