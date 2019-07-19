import user from './users'
import role from './role'
import linkRole from './linkRole'
import permission from './permission'
import menu from './menu'
import linkPermission from './linkPermission'

export default router => {
  router.use('/auth', user)
  router.use('/role', role)
  router.use('/userLinkRole', linkRole)
  router.use('/menu', menu)
  router.use('/permission', permission)
  router.use('/linkPermission', linkPermission)
}
