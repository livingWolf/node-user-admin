import express from 'express'
import Role from '../controller/role/role'
import Check from '../middlewares/check'

const router = express.Router()

router.post('/queryRole', Check.checkLogin, Check.checkIsUser, Role.queryRoleLists)
router.post('/addRole', Check.checkLogin, Check.checkIsUser, Role.addRole)
router.post('/deleteRole', Check.checkLogin, Check.checkIsUser, Role.deleteRole)

export default router
