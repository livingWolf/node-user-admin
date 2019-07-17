import connect from '../../config/mysql'
import roleModel from '../../models/role/role'
class role {
  constructor() {
    this.addRole = this.addRole.bind(this)
    this.deleteRole = this.deleteRole.bind(this)
    this.updateRole = this.updateRole.bind(this)
  }
  /**
   * 查询角色
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async queryRole(data) {
    try {
      let sql = roleModel.queryRoleDetail(data)
      let result = await connect.querySQL(sql)
      return result
    } catch (error) {
      return false
    }
  }
  /**
   * 查询角色列表
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async queryRoleLists(req, res, next) {
    let request = req.body
    let sql = roleModel.queryRoleDetail(request)
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
  async addRole(req, res, next) {
    let request = req.body
    let { roleName, roleDesc, role } = request
    if (!roleName) {
      res.status(500).send({
        code: 1,
        message: '请输入角色名'
      })
      return
    }
    if (!role) {
      res.status(500).send({
        code: 1,
        message: '请输入角色编号'
      })
      return
    }
    try {
      let list = await this.queryRole({ role })
      if (list && list.length > 0) {
        res.status(500).send({
          code: 1,
          message: '已有该角色'
        })
        return
      }
      let sql = roleModel.addRole(request)
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
   * 删除role
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async deleteRole(req, res, next) {
    let request = req.body
    let { roleId } = request
    if (!roleId) {
      res.status(500).send({
        code: '1',
        message: '缺失roleId'
      })
    }
    try {
      let list = await this.queryRole({ roleId })
      if (list && list.length > 0) {
        let sql = roleModel.deleteRole({ roleId })
        let result = await connect.querySQL(sql)
        res.status(200).send({
          code: 0,
          message: '删除成功'
        })
      } else {
        res.status(500).send({
          code: 0,
          message: '无此角色'
        })
      }
    } catch (error) {
      res.status(500).send({ error })
    }
  }
  /**
   * 修改role
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async updateRole(req, res, next) {
    let request = req.body
    let { roleId, role, roleName } = request
    if (!roleId) {
      res.status(500).send({
        code: '1',
        message: '缺失roleId'
      })
      return
    }
    if (!roleName) {
      res.status(500).send({
        code: '1',
        message: '缺失roleName'
      })
      return
    }
    try {
      let list = await this.queryRole({ roleId })
      if (list && list.length > 0) {
        let _role = list[0].role
        if (_role !== role) {
          res.status(500).send({
            code: 0,
            message: '不能修编role角色代号'
          })
          return
        }
        let sql = roleModel.updateRole({ ...request })
        let result = await connect.querySQL(sql)
        res.status(200).send({
          code: 0,
          message: '修改成功'
        })
      } else {
        res.status(500).send({
          code: 0,
          message: '无此角色'
        })
      }
    } catch (error) {
      res.status(500).send({ error })
    }
  }
}

export default new role()
