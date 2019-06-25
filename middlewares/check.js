import jwt from '../utils/jwt'
class Check {
  async checkLogin(req, res, next) {
    let { token } = req.headers
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
  }
}

export default new Check()
