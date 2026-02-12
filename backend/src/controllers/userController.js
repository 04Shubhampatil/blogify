import { setuser } from "../config/auth.js";
import User from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from 'bcrypt'

// const getById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const user = await User.findById({ _id: id }).select("-password")
//         if (!user) {
//             return res.status(400).
//                 json({
//                     success: false,
//                     message: "user not found"
//                 });
//         }
//         return res.status(200).
//             json({
//                 success: true,
//                 message: "user fetch successfully",
//                 user
//             });


//     } catch (error) {
//         return res.status(500).
//             json({
//                 success: false,
//                 message: "Server error"
//             });
//     }
// }


const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;


        if (!name || !username || !email || !password) {
            return res.status(400)
                .json({
                    success: false,
                    message: "All field required"
                });
        }

        const existUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existUser) {
            return res.status(400)
                .json({
                    success: false,
                    message: "user alredy register"
                });
        }

        const hsahPassword = await bcrypt.hash(password, 10)


        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image",

        });
        const pic = result.secure_url;



        const user = await User.create({
            name,
            userName: username,
            email,
            password: hsahPassword,
            profilePic: pic
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: user._id
        });
    } catch (error) {
        console.error("Register user error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during registration",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).
                json({
                    success: false,
                    message: "email and password must be required"
                });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).
                json({
                    success: false,
                    message: "user not user not register"
                });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).
                json({
                    success: false,
                    message: "incrroct password"
                });
        }

        const token = await setuser(user);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Use 'lax' for local development
            secure: process.env.NODE_ENV === 'production', // Only 'true' in production
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })



        return res.status(200).json({
            success: true,
            message: `wellcome back ${user.name}`,
            user,

        })


    } catch (error) {
        console.error("Login user error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during login",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const logourtUser = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return res.status(200).json({
            success: true,
            message: "user delete successfully!"
        })


    } catch (error) {
        console.error("Operation failed:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export {
    registerUser, logInUser, logourtUser,
    // getById
};
