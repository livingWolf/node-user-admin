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
  async query(req, res, next) {
    let request = req.body
    try {
      
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
  async delete(req, res, next) {}
  /**
   * 修改菜单
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async update(req, res, next) {}
}
export default new Menu()
