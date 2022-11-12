const express = require('express')
const app = express()
if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv').config()
}
const exphbs = require('express-handlebars')
const router = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
require('./config/mongoose')

const port = process.env.PORT
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(router)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.listen(port, () => {console.log(`It is listening on http://localhost:${port}/`)})
