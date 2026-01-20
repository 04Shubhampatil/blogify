import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../auth/share/Navbar";
import Footer from "../auth/share/Footer";
import { UserContext } from "../components/UserContext";
import { BLOG_API_END_POINT } from "../utils";
import { ArrowRight, BookOpen, PenTool } from "lucide-react";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(BLOG_API_END_POINT);
        setBlogs(res.data?.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative border-b border-zinc-100 dark:border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
                Share Ideas. <span className="text-indigo-600 dark:text-indigo-400">Build Projects.</span>
                <span className="block">Learn in Public.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg text-zinc-600 dark:text-zinc-400 lg:mx-0">
                A modern platform where developers write, build, and grow together through real projects and articles.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  onClick={() => navigate(user ? "/createblog" : "/signup")}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 sm:w-auto"
                >
                  <PenTool size={20} />
                  {user ? "Start Writing" : "Join Community"}
                </button>
                <a
                  href="#blogs"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 px-8 py-4 text-base font-semibold text-zinc-900 transition-all hover:bg-zinc-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5 sm:w-auto"
                >
                  <BookOpen size={20} />
                  Explore Blogs
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section id="blogs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
                Latest Articles
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Fresh insights and tutorials from our community.
              </p>
            </div>

            {blogs.length > 3 && (
              <Link
                to="/all-blogs"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                View all articles
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[400px] animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-900"
                />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-white/5 dark:bg-white/5">
              <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                No blogs published yet.
              </p>
              {user && (
                <Link
                  to="/createblog"
                  className="mt-4 text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Write the first one →
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
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
                        <BookOpen size={40} className="opacity-20" />
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900 backdrop-blur-sm dark:bg-black/50 dark:text-white">
                      {blog.category || "Article"}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <Link to={`/singleblogs/${blog._id}`} className="flex-1">
                      <h3 className="line-clamp-2 text-xl font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {blog.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {blog.body}
                      </p>
                    </Link>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.createdBy?.profilePic || "https://github.com/identicons/shubh.png"}
                          alt={blog.createdBy?.name || "Author"}
                          className="h-9 w-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {blog.createdBy?.name || "Author"}
                        </span>
                      </div>
                      <Link
                        to={`/singleblogs/${blog._id}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400"
                      >
                        Read
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
