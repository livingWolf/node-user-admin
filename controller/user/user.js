import userModel from '../../models/user/user'
import connect from '../../config/mysql'
class User {
  /**
   * 查询用户列表
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async queryUserLists(req, res, next) {
    let request = req.body
    let sql = userModel.queryUserLists(request)
    connect.querySQL(sql, function(err, rows) {
      if (err) {
        throw err
        res.status(500).send(err)
      } else {
        res.status(200).send({
          code: 0,
          data: rows
        })
      }
    })
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
    } catch (error) {}
  }
}
export default new User()
