
import { Router } from "express";
import { createBlog, getBlogByUserId, deleteBlog, getBlogByid, getAllBlog, getSearch } from '../controllers/blogController.js'
import { upload } from '../utils/multer.js'
import { isAuthentication } from '../middlewares/Authentication.js'
const router = Router()

router.get('/', getAllBlog)
router.post('/', isAuthentication, upload.single('file'), createBlog)
router.get('/search', getSearch)
router.get('/:userId', isAuthentication, getBlogByUserId)
router.get('/single/:id', isAuthentication, getBlogByid)
router.delete('/delete/:id', isAuthentication, deleteBlog)
export default router;