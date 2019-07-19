import menu from '../menu/menu'
import linkPermissionModel from '../../models/role/linkPermission'
import connect from '../../config/mysql'
/**
 * 分配角色
 */
class LinkRole {
  constructor() {
    this.add = this.add.bind(this)
  }
  /**
   * 根据id查询权限信息
   * @param {*} data
   */
  async queryLists(req, res, next) {
    let request = req.body
    try {
      let sql = linkPermissionModel.queryPermissions({ ...request })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        data: result
      })
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
  /**
   * 查询绑定信息
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async query(req, res, next) {
    let request = req.body
    try {
      let sql = linkPermissionModel.query({ ...request })
      let result = await connect.querySQL(sql)
      if (result && result.length) {
        res.status(200).send({
          code: 0,
          date: result
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
    let { roleId, permissionId } = request
    if (!permissionId) {
      res.status(500).send({
        code: 1,
        message: '缺失permissionId'
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
      let sql = linkPermissionModel.add({ permissionId, roleId })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '新增成功'
      })
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
    let { rpId } = request
    if (!rpId) {
      res.status(500).send({
        code: 1,
        message: '缺失rpId'
      })
      return
    }
    try {
      let sql = linkPermissionModel.delete({ rpId })
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
    let { rpId, permissionId } = request
    if (!rpId) {
      res.status(500).send({
        code: 1,
        message: '缺失rpId'
      })
      return
    }
    if (!permissionId) {
      res.status(500).send({
        code: 1,
        message: '缺失permissionId'
      })
      return
    }
    try {
      let sql = linkPermissionModel.update({ rpId, permissionId })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 1,
        message: '修改成功'
      })
    } catch (error) {
      res.status(500).send({
        error
      })
    }
  }
}
export default new LinkRole()
