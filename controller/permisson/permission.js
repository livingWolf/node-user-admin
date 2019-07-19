import connect from '../../config/mysql'
import permissionModel from '../../models/permission/permission'
import Menu from '../menu/menu'
class Permission {
  constructor() {}
  /**
   * 查询角色
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  // async queryRole(data) {
  //   try {
  //     let sql = permissionModel.queryRoleDetail(data)
  //     let result = await connect.querySQL(sql)
  //     return result
  //   } catch (error) {
  //     return false
  //   }
  // }
  /**
   * 查询角色列表
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async query(req, res, next) {
    let request = req.body
    let sql = permissionModel.query({ ...request })
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
  /**
   * 添加角色
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async add(req, res, next) {
    let request = req.body
    let { name, menuId } = request
    if (!menuId) {
      res.status(500).send({
        code: 1,
        message: '缺失menuId'
      })
      return
    }
    if (!name) {
      res.status(500).send({
        code: 1,
        message: '请输入权限名称'
      })
      return
    }
    try {
      let sql = permissionModel.add(request)
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '添加成功'
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
  /**
   * 删除权限
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async delete(req, res, next) {
    let request = req.body
    let { id } = request
    if (!id) {
      res.status(500).send({
        code: '1',
        message: '缺失id'
      })
    }
    try {
      let sql = permissionModel.delete({ id })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '删除成功'
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ error })
    }
  }
  /**
   * 修改role
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async update(req, res, next) {
    let request = req.body
    let { id, name } = request
    if (!id) {
      res.status(500).send({
        code: '1',
        message: '缺失id'
      })
      return
    }
    if (!name) {
      res.status(500).send({
        code: '1',
        message: '缺失name'
      })
      return
    }
    try {
      let sql = permissionModel.update({ ...request })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '修改成功'
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
}
export default new Permission()
