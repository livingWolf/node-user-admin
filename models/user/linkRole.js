class LinkRoleModel {
  add(data) {
    let sql = `insert into sys_user_role (userId,roleId) values (${data.userId},${data.roleId})`
    return sql
  }
  delete(data) {
    let sql = `delete from sys_user_role where userId=${data.userId}`
    return sql
  }
  query(data) {
    let sql = `select roleId from sys_user_role where userId=${data}`
    return sql
  }
  update(data) {
    let sql = `update sys_user_role set roleId=${data.roleId} where userId=${data.userId}`
    return sql
  }
}
export default new LinkRoleModel()
