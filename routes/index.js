import user from './users'

export default router => {
  router.use('/auth', user)
}
