module.exports = {
  name: 'zz',
  port: parseInt(process.env.PORT, 10) || 8001,
  mysql: {
    host: 'localhost',
    user: 'dev',
    password: '123456',
    database: 'nodeDB',
    port: 3306
  },
  debug: true
}
