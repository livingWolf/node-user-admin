import express from 'express'
import User from '../models/user'
import Check from '../middlewares/check'
const router = express.Router()

router.get('/getUserList', User.getUserList)
router.get('/user/getUserList', Check.checkLogin, User.getUserList)
router.post('/register', User.register)
router.post('/login', User.login)

export default router
