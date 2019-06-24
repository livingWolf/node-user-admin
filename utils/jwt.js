import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

class Jwt {
  /**
   * 生成token
   * @param {*} data
   */
  generateToken(data) {
    let created = Math.floor(Date.now() / 1000)
    let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_private_key.pem'))
    return jwt.sign(
      {
        data,
        exp: created + 3600 * 24
      },
      cert,
      { algorithm: 'RS256' }
    )
  }

  /**
   * 校验token
   * @param {*} token
   */
  verifyToken(token) {
    let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_public_key.pem'))
    try {
      let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (error) {
      throw error
    }
    return res
  }
}

export default new Jwt()
