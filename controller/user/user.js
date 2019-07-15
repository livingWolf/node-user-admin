import userModel from '../../models/user/user'
import connect from '../../config/mysql'
import jwt from '../../utils/jwt'

class User {
  constructor() {
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }
  /**
   * 查询用户
   * @param {*} req
   */
  async queryUser(req) {
    let sql = userModel.queryUserLists(req)
    let result = await connect.querySQL(sql)
    return result
  }
  /**
   * 查询用户列表
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async queryUserLists(req, res, next) {
    let request = req.body
    let sql = userModel.queryUserLists(request)
    try {
      let data = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        data: data
      })
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  async login(req, res, next) {
    let request = req.body
    let { username, password } = request
    if (!username) {
      res.status(500).send({
        message: '请填写用户名'
      })
    }
    if (!password) {
      res.status(500).send({
        message: '请填写密码'
      })
    }
    try {
      let lists = await this.queryUser({ username })
      if (lists.length === 0) {
        res.status(500).send({
          code: 1,
          message: '该用户不存在'
        })
      } else {
        if (password.toString() != lists[0].password) {
          res.status(500).send({
            code: 0,
            message: '用户密码输入错误'
          })
        } else {
          let token = await jwt.generateToken({ uid: lists[0].id })
          res.status(200).send({
            code: 0,
            data: {
              token: token
            }
          })
        }
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  /**
   * 注册
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async register(req, res, next) {
    let request = req.body
    let { username, password } = request
    if (!username) {
      res.status(500).send({
        message: '请填写用户名'
      })
    }
    if (!password) {
      res.status(500).send({
        message: '请填写密码'
      })
    }
    try {
      let lists = await this.queryUser({ username })
      if (lists.length > 0) {
        res.status(500).send({
          code: 1,
          message: '该用户已存在'
        })
      } else {
        let sql = userModel.register(request)
        let data = await connect.querySQL(sql)
        res.status(200).send({
          code: 0,
          data: data
        })
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  /**
   * 修改客户信息
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async updateUser(req, res, next) {
    let request = req.body
    let { id, username, password } = request
    if (!id) {
      res.status(500).send({
        message: '缺失id'
      })
      return
    }
    if (!password) {
      res.status(500).send({
        message: '请填写密码'
      })
      return
    }
    let initData = await this.queryUser({ id })
    if (username != initData.username) {
      res.status(500).send({
        message: '用户名不可修改'
      })
      return
    }
    try {
      let sql = await userModel.update(request)
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        data: {
          message: '修改用户信息成功'
        }
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
  /**
   * 删除客户
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async deleteUser(req, res, next) {
    let request = req.body
    let { id } = request
    if (!id) {
      res.status(500).send({
        message: '缺失id'
      })
      return
    }
    try {
      let sql = userModel.delete({ id })
      let result = connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '删除用户成功'
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
}
export default new User()
