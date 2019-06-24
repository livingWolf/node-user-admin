import jwt from '../utils/jwt'
class Check {
  checkLogin(req, res, next) {
    let { url = '' } = req
    console.log(url)
    if (url.includes('/user/')) {
      let { token } = req.header
      if (token) {
        let result = jwt.verifyToken(token)
        let { uid } = result
        if (uid) {
          next()
        } else {
          res.send({
            data: '未登录'
          })
        }
      } else {
        res.send({
          data: '未登录'
        })
      }
    } else {
      next()
    }
  }
}

export default new Check()
