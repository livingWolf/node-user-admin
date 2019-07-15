import user from './users'
import role from './role'

export default router => {
  router.use('/auth', user)
  router.use('/role', role)
}
