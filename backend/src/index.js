import 'dotenv/config'
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import database, { isDbConnected } from './config/DB.js';
import userRouter from './routes/userRouter.js'
import blogRouter from './routes/blogRouter.js'
import commentRouter from './routes/commentRoute.js'


const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1); // Trust first proxy (Render)

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}



//middelware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://blogifyi.netlify.app",
    "https://blogifyi.vercel.app"
  ],
  credentials: true
}));app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())


//routes
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
        dbStatus: isDbConnected() ? "connected" : "disconnected",
        env: process.env.NODE_ENV || 'development'
    });
});





app.listen(port, () => {
    database();
});
