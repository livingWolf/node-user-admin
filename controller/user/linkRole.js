import user from './user'
import role from '../role/role'
import linkRoleModel from '../../models/user/linkRole'
import connect from '../../config/mysql'
/**
 * 分配角色
 */
class LinkRole {
  constructor() {
    this.add = this.add.bind(this)
    this.query = this.query.bind(this)
    this.update = this.update.bind(this)
  }
  /**
   * TODO: 怎么将error显示出来
   * @param {*} data
   */
  async queryIsRole(data) {
    try {
      let sql = linkRoleModel.query(data)
      let result = await connect.querySQL(sql)
      return result
    } catch (error) {
      console.error(error)
      return false
    }
  }
  /**
   * 根据用户查询角色信息
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async query(req, res, next) {
    let request = req.body
    let { userId } = request
    if (!userId) {
      res.status(500).send({
        code: 1,
        message: '缺失userId'
      })
      return
    }
    try {
      let _role = await this.queryIsRole(userId)
      if (_role && _role.length) {
        let { roleId } = _role[0]
        let result = await role.queryRole({ roleId })
        if (result && result.length) {
          res.status(200).send({
            code: 0,
            date: result
          })
        }
      } else {
        res.status(500).send({
          code: 1,
          message: '此用户未绑定角色'
        })
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  /**
   * 新增用户关联角色
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async add(req, res, next) {
    let request = req.body
    let { userId, roleId } = request
    if (!userId) {
      res.status(500).send({
        code: 1,
        message: '缺失userId'
      })
      return
    }
    if (!roleId) {
      res.status(500).send({
        code: 1,
        message: '缺失roleId'
      })
      return
    }
    try {
      let _user = await user.queryUser(userId)
      if (!_user) {
        res.status(500).send({
          code: 1,
          message: '无此用户'
        })
        return
      }
      let _role = await this.queryIsRole(userId)
      console.log(_role)
      if (_role && !_role.length) {
        let sql = linkRoleModel.add({ userId, roleId })
        let result = await connect.querySQL(sql)
        res.status(200).send({
          code: 0,
          message: '新增成功'
        })
      } else {
        res.status(500).send({
          code: 1,
          message: '该用户已绑定角色'
        })
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  /**
   * 删除用户关联角色
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async delete(req, res, next) {
    let request = req.body
    let { userId, roleId } = request
    if (!userId) {
      res.status(500).send({
        code: 1,
        message: '缺失userId'
      })
      return
    }
    try {
      let _user = await user.queryUser(userId)
      if (!_user) {
        res.status(500).send({
          code: 1,
          message: '无此用户'
        })
        return
      }
      let sql = linkRoleModel.delete({ userId })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '删除成功'
      })
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  /**
   * 修改用户关联角色
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async update(req, res, next) {
    let request = req.body
    let { userId, roleId } = request
    if (!userId) {
      res.status(500).send({
        code: 1,
        message: '缺失userId'
      })
      return
    }
    if (!roleId) {
      res.status(500).send({
        code: 1,
        message: '缺失roleId'
      })
      return
    }
    try {
      let _user = await user.queryUser(userId)
      if (!_user) {
        res.status(500).send({
          code: 1,
          message: '无此用户'
        })
        return
      }
      let _role = await this.queryIsRole(userId)
      if (_role && _role.length) {
        if (_role[0].roleId != roleId) {
          let sql = linkRoleModel.update({ userId, roleId })
          let result = await connect.querySQL(sql)
        }
        res.status(200).send({
          code: 0,
          message: '修改成功'
        })
      }
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
}
export default new LinkRole()
