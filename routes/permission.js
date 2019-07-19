import express from 'express'
import Check from '../middlewares/check'
import Permission from '../controller/permisson/permission'
const router = express.Router()

router.post('/add', Check.checkLogin, Check.checkIsUser, Permission.add)
router.post('/update', Check.checkLogin, Check.checkIsUser, Permission.update)
router.delete('/delete', Check.checkLogin, Check.checkIsUser, Permission.delete)
router.post('/query', Check.checkLogin, Check.checkIsUser, Permission.query)


export default router
