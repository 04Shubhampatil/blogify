import React from "react";
import Navbar from "../auth/share/Navbar";
import Footer from "../auth/share/Footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Heading, AlignLeft, Image, Rocket, X } from "lucide-react";
import axios from "axios";
import { BLOG_API_END_POINT } from "../utils/index.js";

const CreateBlog = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const file = watch("file");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("body", data.body);
      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }

      const res = await axios.post(`${BLOG_API_END_POINT}`, formData, {
        withCredentials: true,
      });
      alert("Published successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-xl dark:border-white/5 dark:bg-zinc-900/50">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <Rocket size={24} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Create New Article
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Share your insights with the global developer community.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Article Title</label>
              <div className="flex items-center gap-3 rounded-2xl border bg-zinc-50 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:bg-zinc-800/50">
                <Heading className="h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. Mastering React Server Components"
                  className="w-full bg-transparent text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white"
                  {...register("title", { required: true })}
                />
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Article Content</label>
              <div className="flex items-start gap-3 rounded-2xl border bg-zinc-50 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:bg-zinc-800/50">
                <AlignLeft className="mt-1 h-5 w-5 text-zinc-400" />
                <textarea
                  rows={10}
                  placeholder="Write your brilliant content here..."
                  className="w-full resize-none bg-transparent text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-white"
                  {...register("body", { required: true })}
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Cover Image</label>
              <div className="relative group">
                <input
                  type="file"
                  id="cover-image"
                  accept="image/*"
                  className="hidden"
                  {...register("file")}
                />
                <label
                  htmlFor="cover-image"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-10 transition-all hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-zinc-700 text-zinc-400">
                    <Image size={24} />
                  </div>
                  <div className="text-center text-sm">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Click to upload</span>
                    <span className="text-zinc-500"> or drag and drop</span>
                    <p className="mt-1 text-xs text-zinc-400">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                  {file && file[0] && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                      <span>Selected: {file[0].name}</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-col gap-4 sm:flex-row">
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex-1 rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/20 disabled:opacity-50"
              >
                {isSubmitting ? "Scaling the heights..." : "Publish Article"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center justify-center rounded-2xl border border-zinc-200 px-8 py-4 text-base font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateBlog;
