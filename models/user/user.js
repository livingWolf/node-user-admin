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
    let sql = `select ${userParams.join(',')} from sys_user L${
      conditions.length ? ' where ' + conditions : ''
    }`
    return sql
  }
  register(data) {
    let conditions = userParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `insert into sys_user set ${conditions}`
  }
}

export default new User()
