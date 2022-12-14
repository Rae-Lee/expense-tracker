const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const bcrypt = require('bcryptjs')
const SEED_USER = [{
  name: '廣志',
  email: 'father@example.com',
  password: '12345678'
},
{
  name: '小新',
  email: 'child@example.com',
  password: '12345678910'
}]

const SEED_RECORD = [
  {
    name: '午餐',
    date: '2022-11-14',
    amount: 60,
    categoryId: 4
  },
  {
    name: '晚餐',
    date: '2022-11-14',
    amount: 60,
    categoryId: 4
  },
  {
    name: '捷運',
    date: '2022-11-13',
    amount: 120,
    categoryId: 2
  },
  {
    name: '租金',
    date: '2022-11-15',
    amount: 25000,
    categoryId: 1
  },
  {
    name: '電影:驚奇隊長',
    date: '2022-11-14',
    amount: 60,
    categoryId: 3
  }]
db.once('open', () => {
  Promise.all(
    SEED_USER.map( (user, index) => {
      //儲存至user collection
      const { name, email, password } = user
      return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({ name, email, password: hash}))
      //設定userId到SEED_RECORD物件中
      .then(user => {
        const records = []
        if(index === 0){
          for (let i = 0; i < (SEED_RECORD.length - 1); i++){
            SEED_RECORD[i].userId = user._id
            records.push(SEED_RECORD[i])
          }
        }else{
          const i = SEED_RECORD.length - 1
          SEED_RECORD[i].userId = user._id
          records.push(SEED_RECORD[i])
        }
        //儲存至record collection
        return Record.create(records)
      })
      .then(console.log('record collection have created'))
      .catch(err => console.log(err))
    })
  )  
  .then(() => {
    console.log('user collection have created')
    process.exit()
  })
  .catch(err => {
    console.log(err)
  })    
}) 