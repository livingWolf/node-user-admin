const userParams = [
  'username',
  'password',
  'phone',
  'sex',
  'email',
  'mark',
  'rank',
  'lastLogin',
  'loginIp',
  'imageUrl',
  'regTime',
  'locked',
  'rights'
]
class User {
  queryUserLists(data) {
    let conditions = userParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select id,${userParams.join(',')} from sys_user where delete_flag=0 ${
      conditions.length ? 'and ' + conditions : ''
    }`
    return sql
  }
  queryUserById(data) {
    let sql = `select id,${userParams.join(',')} from sys_user where delete_flag=0 and id=${data}`
    return sql
  }
  register(data) {
    let conditions = userParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `insert into sys_user set ${conditions}`
    return sql
  }
  update(data) {
    let conditions = userParams
      .filter(item1 => data[item1] !== undefined && item1 != 'username')
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `update sys_user set ${conditions} where id = '${data.id}'`
    return sql
  }
  delete(data) {
    let sql = `update sys_user set delete_flag=1 where id = '${data.id}'`
    return sql
  }
}

export default new User()
