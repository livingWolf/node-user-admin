import express from 'express'
import User from '../controller/user/user'
import Check from '../middlewares/check'
const router = express.Router()

// router.get('/getUserList', Check.checkLogin, User.getUserList)
router.post('/queryUserLists', User.queryUserLists)
router.post('/register', User.register)

export default router
