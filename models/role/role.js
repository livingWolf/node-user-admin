const roleParams = ['roleName', 'roleDesc', 'role', 'roleId']
class Role {
  addRole(data) {
    let conditions = roleParams
      .filter(item1 => data[item1] !== undefined && item1 !== 'roleId')
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
    let sql = `select ${roleParams.join(',')} from sys_role where delete_flag=0 ${
      conditions.length ? ' and ' + conditions : ''
    }`
    return sql
  }
  updateRole(data) {
    let conditions = roleParams
      .filter(item1 => data[item1] !== undefined && item1 !== 'roleId' && item1 !== 'role')
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `update sys_role set ${conditions} where roleId=${data.roleId}`
    return sql
  }
  deleteRole(data) {
    let sql = `update sys_role set delete_flag=1 where roleId = '${data.roleId}'`
    return sql
  }
}
export default new Role()
