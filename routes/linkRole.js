import express from 'express'
import Check from '../middlewares/check'
import LinkRole from '../controller/user/linkRole'
const router = express.Router()

router.post('/add', Check.checkLogin, Check.checkIsUser, LinkRole.add)
router.post('/update', Check.checkLogin, Check.checkIsUser, LinkRole.update)
router.delete('/delete', Check.checkLogin, Check.checkIsUser, LinkRole.delete)
router.post('/query', Check.checkLogin, Check.checkIsUser, LinkRole.query)

export default router
