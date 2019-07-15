const roleParams = ['roleName', 'roleDesc', 'role']
class Role {
  addRole(data) {
    let conditions = roleParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `insert into sys_role set ${conditions}`
    return sql
  }
  queryRoleDetail(data) {
    let conditions = roleParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select ${roleParams.join(',')} from sys_role ${
      conditions.length ? ' where ' + conditions : ''
    }`
    return sql
  }
  updateRole(data) {
    let conditions = roleParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `update sys_role set ${conditions}`
    return sql
  }
}
export default new Role()
