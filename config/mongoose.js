const mongoose = require('mongoose')
if(process.env.NODE_ENV !== 'production'){
  const dotenv =require('dotenv').config()
}
mongoose.connect(process.env.MONGOOSE_URI)
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error') })
db.once('open', () => {console.log('mongodb connected')})

