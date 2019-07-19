import express from 'express'
import Check from '../middlewares/check'
import Menu from '../controller/menu/menu'
const router = express.Router()

router.post('/add', Check.checkLogin, Check.checkIsUser, Menu.add)
router.post('/update', Check.checkLogin, Check.checkIsUser, Menu.update)
router.delete('/delete', Check.checkLogin, Check.checkIsUser, Menu.delete)
router.post('/query', Check.checkLogin, Check.checkIsUser, Menu.query)

export default router
