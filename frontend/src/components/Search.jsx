import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BLOG_API_END_POINT } from "../utils";

const NavbarSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const { register, watch, setValue } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const query = watch("query");

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    setShowResults(true);

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${BLOG_API_END_POINT}/search?q=${query}`,
          { withCredentials: true }
        );
        setResults(res.data.blogs || []);
      } catch (err) {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (id) => {
    navigate(`/singleblogs/${id}`);
    setShowResults(false);
    setValue("query", ""); // Clear search after navigation
  };

  return (
    <div className="relative w-full z-50">
      {/* Icon */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search blogs..."
        {...register("query")}
        autoComplete="off"
        className="
          w-full rounded-full
          bg-white/5 backdrop-blur-md
          border border-white/10
          py-2 pl-10 pr-4
          text-sm text-white placeholder:text-zinc-400
          outline-none
          focus:border-indigo-400/60
          focus:ring-2 focus:ring-indigo-500/30
          transition-all
        "
      />

      {/* Results Dropdown */}
      {showResults && query && (
        <div className="absolute top-full mt-2 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto">
          {loading ? (
            <p className="p-4 text-center text-zinc-500 text-sm">Searching...</p>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => handleResultClick(blog._id)}
                  className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800 last:border-none transition"
                >
                  {blog.avatarImage && (
                    <img
                      src={blog.avatarImage}
                      alt={blog.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">
                      {blog.title}
                    </h4>
                    <p className="text-zinc-500 text-xs truncate">
                      by {blog.createdBy?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-center text-zinc-500 text-sm">
              No results found for "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
