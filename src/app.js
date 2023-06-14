const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )

const usersRouter = require('./routes/users.router.js' )
const petsRouter = require('./routes/pets.router.js' )
const adoptionsRouter = require('./routes/adoption.router.js' )
const sessionsRouter = require('./routes/sessions.router.js')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
// const { dirname } = require('path')
// const __dirname = './utils/index.js'

const app = express() 
const PORT = process.env.PORT||8080 
const connection = mongoose.connect(`mongodb://localhost:27017/adoptame`)

app.use(express.json())
app.use(cookieParser())

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title:'Documentación del poder y del saber',
            description: "Api pensada para la clase de Swagger"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
// console.log(`${__dirname}/docs/Users/Users.yaml`)

const specs = swaggerJsDoc(swaggerOptions)

app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

app.use('/api/users',usersRouter) 
app.use('/api/pets',petsRouter) 
app.use('/api/adoptions',adoptionsRouter) 
app.use('/api/sessions',sessionsRouter) 

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
