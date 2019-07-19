import express from 'express'
import Check from '../middlewares/check'
import LinkPermission from '../controller/role/linkPermission'
const router = express.Router()

router.post('/add', Check.checkLogin, Check.checkIsUser, LinkPermission.add)
router.post('/update', Check.checkLogin, Check.checkIsUser, LinkPermission.update)
router.delete('/delete', Check.checkLogin, Check.checkIsUser, LinkPermission.delete)
router.post('/query', Check.checkLogin, Check.checkIsUser, LinkPermission.query)
router.post('/queryLists', Check.checkLogin, Check.checkIsUser, LinkPermission.queryLists)

export default router