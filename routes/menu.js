import express from 'express'
import Check from '../middlewares/check'
import Menu from '../controller/menu/menu'
const router = express.Router()

router.post('/add', Check.checkLogin, Check.checkIsUser, Menu.add)
// router.post('/update', Check.checkLogin, Check.checkIsUser, Permission.update)
// router.delete('/delete', Check.checkLogin, Check.checkIsUser, Permission.delete)
// router.post('/query', Check.checkLogin, Check.checkIsUser, LinkRole.query)

export default router
