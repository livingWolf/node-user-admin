import express from 'express'
import User from '../models/user'
const router = express.Router()

router.get('/getUserList', User.getUserList)
router.get('/user/getUserList', User.getUserList)
router.post('/register', User.register)
router.post('/login', User.login)

export default router
