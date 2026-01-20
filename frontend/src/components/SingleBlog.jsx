import React, { useState, useEffect } from "react";
import Navbar from "../auth/share/Navbar";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MessageSquare, Calendar, User, Loader2 } from "lucide-react";
import { COMMENT_API_END_POINT, BLOG_API_END_POINT } from "../utils/index.js";
import Footer from "../auth/share/Footer";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const getBlog = async () => {
    try {
      const res = await axios.get(`${BLOG_API_END_POINT}/single/${id}`, {
        withCredentials: true,
      });
      setBlog(res.data.blog);
      // Filter out any invalid comments that might exist in the database
      setComments((res.data.comments || []).filter(c => c && c.createdBy));
    } catch (error) {
      console.error("Failed to load blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${COMMENT_API_END_POINT}/${id}`, data, {
        withCredentials: true,
      });
      alert("Comment added");
      if (res.data.comment) {
        setComments((prev) => [res.data.comment, ...prev]);
      }
      reset();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add comment");
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Blog not found</h2>
          <button onClick={() => window.history.back()} className="mt-4 text-indigo-600 dark:text-indigo-400">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const author = blog.createdBy;

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article>
          {/* Category */}
          <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {blog.category || "Article"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-b border-t py-6 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <User size={20} className="text-zinc-500" />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">{author?.name || "Author"}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <Calendar size={18} />
              <span className="text-sm font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Banner Image */}
          <div className="my-12 overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl dark:bg-zinc-900">
            {blog.avatarImage ? (
              <img src={blog.avatarImage} alt={blog.title} className="w-full object-cover" />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-zinc-50 dark:bg-white/5">
                <Loader2 size={40} className="text-zinc-200" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-zinc mx-auto max-w-none dark:prose-invert lg:prose-xl">
            <div className="whitespace-pre-line leading-relaxed text-zinc-700 dark:text-zinc-300">
              {blog.body}
            </div>
          </div>

          {/* Comments Section */}
          <section className="mt-20 border-t pt-12 dark:border-white/10">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-white">
              <MessageSquare size={24} className="text-indigo-600" />
              Discussion ({comments?.length || 0})
            </h2>

            {/* Comment Form */}
            <div className="mt-8 rounded-3xl border bg-zinc-50 p-6 dark:border-white/5 dark:bg-white/5">
              <textarea
                placeholder="What are your thoughts?"
                className="min-h-[120px] w-full resize-none bg-transparent text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white"
                {...register("comment", { required: true })}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="mt-12 space-y-8">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  comment && (
                    <div key={comment._id} className="flex gap-4">
                      <img
                        src={comment.createdBy?.profilePic || "/default-avatar.png"}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {comment.createdBy?.name || "Member"}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleDateString()
                              : "Just now"}
                          </span>
                        </div>
                        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  )
                ))
              ) : (
                <p className="text-center text-zinc-500 py-10">No comments yet. Be the first to start the conversation!</p>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default SingleBlog;
