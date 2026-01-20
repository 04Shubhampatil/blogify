import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  X,
  Home,
  Info,
  BookOpen,
  LogOut,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";
import { UserContext } from "../../components/UserContext";
import { useTheme } from "../../components/ThemeContext";
import Search from "../../components/Search";
import { USER_API_END_POINT } from "../../utils/index.js";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.delete(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      setUser(null);
      setOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
  ];

  if (user) {
    navLinks.splice(1, 0, { name: "Your Blogs", path: "/yourblogs", icon: <BookOpen size={18} /> });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md transition-colors duration-300 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl"
        >
          Blog<span className="text-indigo-600 dark:text-indigo-400">ify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="w-48 lg:w-64">
            <Search />
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${location.pathname === link.path
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-600 dark:text-zinc-400"
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l pl-4 dark:border-white/10 lg:gap-6 lg:pl-6">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={user.profilePic || "https://github.com/identicons/shubh.png"}
                    alt={user.userName}
                    className="h-8 w-8 rounded-full border bg-zinc-100 object-cover dark:border-white/10 dark:bg-zinc-800"
                  />
                  <span className="hidden text-sm font-semibold text-zinc-900 dark:text-white lg:block">
                    {user.userName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-600 transition-colors dark:text-zinc-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-x-0 top-[57px] z-40 h-screen w-full transform bg-white transition-transform duration-300 ease-in-out dark:bg-zinc-950 md:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="mb-4">
            <Search />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 text-lg font-medium transition-colors ${location.pathname === link.path
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-zinc-600 dark:text-zinc-400"
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <div className="mt-4 border-t pt-6 dark:border-white/10">
            {user ? (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePic || "https://github.com/identicons/shubh.png"}
                    alt={user.userName}
                    className="h-10 w-10 rounded-full border object-cover dark:border-white/10"
                  />
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">
                      {user.userName}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-xl border py-3 font-semibold text-zinc-900 dark:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
