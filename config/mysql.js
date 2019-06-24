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

exports.querySQL = function(sql, callback) {
  pool.getConnection(function(err, conn) {
    conn.query(sql, function(err, rows, fields) {
      callback(err, rows, fields)
      conn.release()
    })
  })
}
