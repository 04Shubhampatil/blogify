import React, { useContext, useState, useEffect } from "react";
import Navbar from "../auth/share/Navbar.jsx";
import Footer from "../auth/share/Footer.jsx";
import { UserContext } from "../components/UserContext.jsx";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Trash2, Eye, PenTool } from "lucide-react";
import { BLOG_API_END_POINT } from "../utils/index.js";

function YourBlogs() {
  const { user } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's blogs
  const handleGetBlogs = async () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${BLOG_API_END_POINT}/${user._id}`, {
        withCredentials: true,
      });

      setBlogs(res.data.blog || res.data.blogs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await axios.delete(`${BLOG_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });

      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    if (user) {
      handleGetBlogs();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Your Blogs
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Manage and edit your published articles.
            </p>
          </div>

          <button
            onClick={() => navigate("/createblog")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Plus size={18} />
            Create New Blog
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-white/5 dark:bg-white/5">
            <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
              <PenTool size={32} className="text-zinc-400" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">No blogs yet</h3>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">You haven't written any articles yet.</p>
            <button
              onClick={() => navigate("/createblog")}
              className="mt-6 text-sm font-bold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Write your first blog →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white transition-all duration-300 hover:border-transparent hover:shadow-xl dark:border-white/5 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {blog.avatarImage ? (
                    <img
                      src={blog.avatarImage}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-400">
                      <Eye size={40} className="opacity-20" />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="line-clamp-2 text-xl font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {blog.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {blog.body}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/singleblogs/${blog._id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-white/5 dark:text-emerald-400 dark:hover:bg-emerald-600"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white dark:bg-white/5 dark:text-red-400 dark:hover:bg-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default YourBlogs;
