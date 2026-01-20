import { getUser } from "../config/auth.js";


async function isAuthentication(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User token not found"
            });
        }
        const user = getUser(token)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export { isAuthentication }