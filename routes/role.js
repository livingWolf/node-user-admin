import express from 'express'
import Role from '../controller/role/role'
import Check from '../middlewares/check'

const router = express.Router()

router.post('/query', Check.checkLogin, Check.checkIsUser, Role.queryRoleLists)
router.post('/add', Check.checkLogin, Check.checkIsUser, Role.addRole)
router.delete('/delete', Check.checkLogin, Check.checkIsUser, Role.deleteRole)
router.post('/update', Check.checkLogin, Check.checkIsUser, Role.updateRole)

export default router
