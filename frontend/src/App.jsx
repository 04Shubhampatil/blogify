import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./auth/SignUp.jsx";
import LogIn from "./auth/Login.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import YourBlogs from "./pages/YourBlogs.jsx";
import SingleBlog from './components/SingleBlog.jsx'
import About from "./components/About.jsx";
import { ThemeProvider } from "./components/ThemeContext";

const approut = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <LogIn />
  },
  {
    path: "/createblog",
    element: <CreateBlog />
  },
  {
    path: "/yourblogs",
    element: <YourBlogs />
  },
  {
    path: "/singleblogs/:id",
    element: <SingleBlog />
  },
  {
    path: "/about",
    element: <About />
  },



]);


const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={approut} />
    </ThemeProvider>
  );
};

export default App;
