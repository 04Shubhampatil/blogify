import Comment from "../models/commentModel.js";

const createComment = async (req, res) => {
    try {
        const { comment: commentText } = req.body;
        let comment = await Comment.create({
            comment: commentText,
            blogId: req.params.blogId,
            createdBy: req.user._id
        });

        // Populate createdBy to include user details (name, profilePic) for the frontend
        comment = await comment.populate("createdBy", "name profilePic");

        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            comment
        });

    } catch (error) {
        console.error("Create comment error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export { createComment }