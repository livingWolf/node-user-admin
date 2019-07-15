import express from 'express'
import User from '../controller/user/user'
import Check from '../middlewares/check'
const router = express.Router()

router.post('/login', User.login)
router.post('/register', User.register)
router.post('/queryUserLists', Check.checkLogin, Check.checkIsUser, User.queryUserLists)
router.post('/updateUser', Check.checkLogin, Check.checkIsUser, User.updateUser)
router.post('/deleteUser', Check.checkLogin, Check.checkIsUser, User.deleteUser)

export default router
