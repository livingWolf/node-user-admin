class LinkPermission {
  add(data) {
    let sql = `insert into sys_role_permission (roleId,permissionId) values (${data.roleId},${
      data.permissionId
    })`
    return sql
  }
  delete(data) {
    let sql = `delete from sys_role_permission where rpId=${data.rpId}`
    return sql
  }
  query(data) {
    const _params = ['rpId', 'roleId', 'permissionId']
    let conditions = _params
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select ${_params.join(',')} from sys_role_permission ${
      conditions.length ? ' where ' + conditions : ''
    }`
    return sql
  }
  queryPermissions(data) {
    const _params = ['rpId', 'roleId', 'permissionId']
    let conditions = _params
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select id,pdesc,name,menuId from sys_permission where id in ( select permissionId
     from sys_role_permission ${conditions.length ? ' where ' + conditions : ''})`
    return sql
  }
  update(data) {
    let sql = `update sys_role_permission set permissionId=${data.permissionId} where rpId=${data.rpId}`
    return sql
  }
}
export default new LinkPermission()
