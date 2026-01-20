
import { Router } from "express";
import { createComment } from '../controllers/commentController.js'

import { isAuthentication } from '../middlewares/Authentication.js'
const router = Router()

router.post('/:blogId', isAuthentication, createComment)

export default router