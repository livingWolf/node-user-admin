const permissionParams = ['id', 'pdesc', 'name', 'menuId']
class PermissionModal {
  add() {
    let conditions = roleParams
      .filter(item1 => data[item1] !== undefined && item1 !== 'roleId')
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `insert into sys_role set ${conditions}`
    return sql
  }
}
export default new PermissionModal()
