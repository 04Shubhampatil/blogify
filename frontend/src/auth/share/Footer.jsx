import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-zinc-500 dark:text-zinc-400">

        {/* Left */}
        <Link
          to="/"
          className="font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Blogify
        </Link>

        {/* Right */}
        <p>
          © {new Date().getFullYear()} Blogify. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
