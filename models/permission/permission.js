const permissionParams = ['id', 'pdesc', 'name', 'menuId']
class PermissionModal {
  add(data) {
    let conditions = permissionParams
      .filter(item1 => data[item1] !== undefined && item1 !== 'id')
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `insert into sys_permission set ${conditions}`
    return sql
  }
  query(data) {
    let conditions = permissionParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select ${permissionParams.join(',')} from sys_permission where delete_flag=0 ${
      conditions.length ? ' and ' + conditions : ''
    }`
    return sql
  }
  update(data) {
    let conditions = permissionParams
      .filter(item1 => data[item1] !== undefined && item1 !== 'roleId' && item1 !== 'role')
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `update sys_permission set ${conditions} where id=${data.id}`
    return sql
  }
  delete(data) {
    let sql = `update sys_permission set delete_flag=1 where id = '${data.id}'`
    return sql
  }
}
export default new PermissionModal()
