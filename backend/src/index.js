import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import database from './config/DB.js';
import userRouter from './routes/userRouter.js'
import blogRouter from './routes/blogRouter.js'
import commentRouter from './routes/commentRoute.js'


const app = express();
const port = process.env.PORT || 3000;



//middelware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())


//routes
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)





app.listen(port, () => {
    database();
});
