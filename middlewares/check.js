import jwt from '../utils/jwt'
import userModel from '../models/user/user'
import connect from '../config/mysql'
class Check {
  async checkLogin(req, res, next) {
    let { token } = req.headers
    if (token) {
      let result = {}
      try {
        result = await jwt.verifyToken(token)
      } catch (error) {
        res.status(401).send({
          data: '登录已过期，请重新登录'
        })
        return
      }
      let { uid } = result
      if (uid) {
        req.id = uid
        next()
      } else {
        res.status(401).send({
          data: '登录已过期，请重新登录'
        })
      }
    } else {
      res.status(401).send({
        data: '未登录'
      })
    }
  }
  async checkIsUser(req, res, next) {
    let { id } = req
    if (!id) {
      req.send({
        code: 1,
        message: '无此用户'
      })
      return
    }
    try {
      let sql = userModel.queryUserById(id)
      let list = await connect.querySQL(sql)
      if (list && list.length) {
        next()
      } else {
        res.status(500).send({
          code: 1,
          message: '无此用户'
        })
      }
    } catch (error) {
      res.status(500).send({ error })
      throw error
    }
  }
}

export default new Check()
