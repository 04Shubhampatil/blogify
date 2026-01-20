import React from "react";
import { useForm } from "react-hook-form";
import { User, AtSign, Mail, Lock, Image, ArrowRight } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./share/Navbar";
import Footer from "./share/Footer.jsx";
import { USER_API_END_POINT } from "../utils/index.js";

/**
 * SignUp Page
 * Refactored for theme consistency and modern UI.
 */
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }

      const res = await axios.post(`${USER_API_END_POINT}`, formData, {
        withCredentials: true,
      });
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Create an account
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Join our community of readers and writers
            </p>
          </div>

          <div className="bg-white border border-zinc-100 rounded-2xl shadow-xl shadow-zinc-200/20 p-8 dark:bg-zinc-900 dark:border-white/5 dark:shadow-none">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-800"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Username
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="johndoe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-800"
                    {...register("userName", { required: "Username is required" })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-800"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-800"
                    {...register("password", { required: "Password is required" })}
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Profile Image
                </label>
                <div className="flex items-center gap-3 w-full px-4 py-2 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-800">
                  <Image className="w-4 h-4 text-zinc-400" />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-xs text-zinc-600 dark:text-zinc-400 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 dark:file:bg-zinc-700 dark:file:text-zinc-300"
                    {...register("file")}
                  />
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl transition-all dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
                {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center dark:border-white/5">
              <p className="text-sm text-zinc-500">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
