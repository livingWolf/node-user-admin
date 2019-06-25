import connect from '../config/mysql'
import jwt from '../utils/jwt'

class User {
  async getUserList(req, res, next) {
    let request = req.body
    let conditions = [
      'username',
      'password',
      'email',
      'age',
      'sex',
      'tel',
      'addr',
      'card',
      'married',
      'salary'
    ]
    let condition = Object.keys(request)
      .filter(ele => conditions.includes(ele))
      .map(item => {
        return item === 'addr'
          ? `${item} like '%${request[item]}%'`
          : `${item} = '${request[item]}'`
      })
      .join(' and ')
    let sql = `select * from node_user${condition.length ? ' where ' + condition : ''}`
    connect.querySQL(sql, function(err, rows, fields) {
      if (err) throw err
      else {
        res.send({
          code: 1,
          data: rows
        })
      }
    })
  }

  async register(req, res, next) {
    let request = req.body
    let conditions = [
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
    let params = Object.keys(request).filter(ele => conditions.includes(ele))
    let params_keys = params.map(item => `\`${item}\``).join(',')
    let params_values = params.map(item => `'${request[item]}'`).join(',')
    let sql = `insert into sys_user(${params_keys}) values (${params_values})`
    connect.querySQL(sql, function(err, rows, fields) {
      if (err) throw err
      else {
        res.send({
          code: 1,
          data: '注册成功'
        })
      }
    })
  }

  async login(req, res, nect) {
    let { username, password } = req.body
    let sql = `select id from sys_user where username='${username}' and password='${password}'`
    connect.querySQL(sql, function(err, rows, fields) {
      if (err) throw err
      else {
        if (rows && rows.length > 0) {
          let val = rows[0]
          let uid = val['id']
          let token = jwt.generateToken({ uid })
          res.send({
            code: 1,
            data: { token }
          })
        } else {
          res.send({
            code: 1,
            data: {
              tip: '未找到该用户'
            }
          })
        }
      }
    })
  }
}

export default new User()
