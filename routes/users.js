import express from 'express'
import User from '../controller/user/user'
import Check from '../middlewares/check'
const router = express.Router()

router.post('/login', User.login)
router.post('/queryUserLists', Check.checkLogin, User.queryUserLists)
router.post('/register', User.register)

export default router
