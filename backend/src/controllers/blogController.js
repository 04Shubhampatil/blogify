
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import cloudinary from "../utils/cloudinary.js";


const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('createdBy', "-password")
        if (!blogs || blogs.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No blogs found",
                blogs: []
            });
        }
        return res.status(200).json({
            success: true,
            blogs,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const createBlog = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Cover image is required"
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image"
        })
        let avatar = result.secure_url;
        const userId = req.user._id;
        const blog = await Blog.create({
            title,
            body,
            avatarImage: avatar,
            createdBy: userId
        })
        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getBlogByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const blog = await Blog.find({ createdBy: userId })

        // Return 200 even if empty, strictly speaking
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blog,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getBlogByid = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id).populate("createdBy", "-password")
        const comments = await Comment.find({ blogId: id })
            .populate("createdBy", "-password")
            .sort({ createdAt: -1 });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog,
            comments
        });

    } catch (error) {
        console.error("Get blog by ID error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error fetching blog details",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getSearch = async (req, res) => {
    try {
        const q = req.query.q?.trim();
        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const blogs = await Blog.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { body: { $regex: q, $options: "i" } },
            ],
        }).populate("createdBy", "name profilePic").sort({ createdAt: -1 });

        return res.status(200).json({ blogs });
    } catch (error) {
        console.error("Search query error:", error);
        return res.status(500).json({ message: "Server error during search" });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Security check: Ensure the user owns the blog
        if (blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog"
            });
        }

        await Blog.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("Delete blog error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error deleting blog",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}



export {
    createBlog,
    getBlogByUserId,
    getBlogByid,
    deleteBlog,
    getAllBlog,
    getSearch
}