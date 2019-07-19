import menuModel from '../../models/menu/menu'
import connect from '../../config/mysql'
class Menu {
  constructor() {}
  /**
   * 查询菜单
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async queryIsMenu(data) {
    try {
      let sql = menuModel.query(data)
      let result = await connect.querySQL(sql)
      return result
    } catch (error) {
      return false
    }
  }
  /**
   * 查询菜单
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async query(req, res, next) {
    let request = req.body
    try {
      let sql = menuModel.query({ ...request })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        data: result
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
  /**
   * 新增菜单
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async add(req, res, next) {
    let request = req.body
    let { menuName } = request
    if (!menuName) {
      res.status(500).send({
        code: 1,
        message: '缺失menuName'
      })
      return
    }
    try {
      let sql = menuModel.add({ ...request })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '新增成功'
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
  /**
   * 删除菜单
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async delete(req, res, next) {
    let request = req.body
    let { menuId } = request
    if (!menuId) {
      res.status(500).send({
        code: 1,
        message: '缺失menuId'
      })
      return
    }
    try {
      let sql = menuModel.delete({ menuId })
      let result = await connect.querySQL(sql)
      res.status(200).send({
        code: 0,
        message: '删除成功'
      })
    } catch (error) {
      res.status(500).send({ error })
    }
  }
  /**
   * 修改菜单
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async update(req, res, next) {
    let request = req.body
    let { menuId } = request
    if (!menuId) {
      res.status(500).send({
        code: 1,
        message: '缺失menuId'
      })
      return
    }
    try {
      let sql = menuModel.update({ ...request })
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
export default new Menu()
