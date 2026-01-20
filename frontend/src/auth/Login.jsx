import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./share/Navbar";
import Footer from './share/Footer.jsx'
import axios from "axios";
import { UserContext } from '../components/UserContext.jsx'
import { USER_API_END_POINT } from "../utils/index.js"

/**
 * LogIn Page
 * Refactored for theme consistency and modern UI.
 */
const LogIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
        withCredentials: true
      });

      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Sign in to your account to continue
            </p>
          </div>

          <div className="bg-white border border-zinc-100 rounded-2xl shadow-xl shadow-zinc-200/20 p-8 dark:bg-zinc-900 dark:border-white/5 dark:shadow-none">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Password
                  </label>
                </div>
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

              <button
                disabled={isSubmitting}
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl transition-all dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
                {!isSubmitting && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-center dark:border-white/5">
              <p className="text-sm text-zinc-500">
                Don't have an account?{" "}
                <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Create one now
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

export default LogIn;
