import express from 'express'
// import config from 'config-lite'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import router from './routes/index'
// import chalk from 'chalk'
// import swaggerUi from 'swagger-ui-express'
// import swaggerJSDoc from 'swagger-jsdoc'

const app = express()

const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Swagger 接口文档'
  },
  host: 'localhost:3000',
  basePath: '/'
}

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
}

// initialize swagger-jsdoc
// const swaggerSpec = swaggerJSDoc(options)

// serve swagger
// app.get('/swagger.json', function(req, res) {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(swaggerSpec)
// })

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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
    return next()
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

