/**
 * 建立数据库
 */
import mysql from 'mysql'
import config from './default'

/**
 * 建立连接池
 */
const pool = mysql.createPool({
  connectTimeout: 5000,
  connectionLimit: 10, //连接数量
  ...config.mysql
})

exports.querySQL = sql => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      conn.query(sql, (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
        conn.release()
      })
    })
  })
}
