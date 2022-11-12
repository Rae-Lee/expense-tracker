const express = require('express')
const app = express()
if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv').config()
}
const exphbs = require('express-handlebars')
const router = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const methodOverride = require('method-override')
require('./config/mongoose')

const port = process.env.PORT
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main', 
  helpers: {
    //格式化時間
    dateTransform(date){
      let formatted_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      return formatted_date
    },
     //顯示類別的icon
    getIcon(categoryId){
      switch(categoryId){
        case 1:
          return 'fa-house'
          break;
        case 2:
          return 'fa-van-shuttle'
          break;
        case 3:
          return 'fa-face-grin-beam'
          break;
        case 4:
          return 'fa-utensils'
          break;
        case 5:
          return 'fa-pen'
          break;  
      }
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated  
  res.locals.user = req.user
  next()
})
app.use(flash(), (req, res, next) => {
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('error')
  next()
})
app.use(methodOverride('_method'))
app.use(router)
app.listen(port, () => {console.log(`It is listening on http://localhost:${port}/`)})
