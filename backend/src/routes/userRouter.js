
import { Router } from "express";
import { registerUser, logInUser, logourtUser } from '../controllers/userController.js'
import { upload } from '../utils/multer.js'
import { isAuthentication } from "../middlewares/Authentication.js";
const router = Router()

// router.get('/:id',isAuthentication,getById)
router.post('/', upload.single('file'), registerUser)
router.post('/login', logInUser)
router.delete('/logout', logourtUser)

export default router;