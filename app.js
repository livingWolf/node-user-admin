import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import router from './routes/index'

const app = express()

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers
  const allowOrigin = origin || Origin || referer || Referer || '*'
  res.header('Access-Control-Allow-Origin', allowOrigin)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) //可以带cookies
  res.header('X-Powered-By', 'Express')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})
app.use(cookieParser())
app.use(bodyParser.json({ limit: 'lmb' }))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

router(app)

app.use(express.static(__dirname + './public'))

app.listen(3000, function() {
  console.log('listen 3000 ...')
})
