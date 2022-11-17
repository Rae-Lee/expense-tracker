const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//1. 篩選類別
router.get('/category/:category', (req, res) => {
  const name = req.params.category
  const userId = req.user._id
  const startMonth = new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0))
  const endMonth = new Date(new Date(new Date().setDate(31)).setHours(23, 59, 59, 0))
  const month = new Date().getMonth() + 1
  return Category.findOne({name})
    .then(category => {
      Record.find({userId, categoryId: category.id, date: {$gte: startMonth, $lte: endMonth}})
        .sort({ date: 1 })  
        .lean()
        .then(expenses => {
          //計算該類別總金額
          let totalAmount = 0
          let monthAmount = 0
          for (let i = 0; i < expenses.length; i++) {
            monthAmount += expenses[i].amount
          }
          //計算當月總花費
          Record.find({ userId, date: { $gte: startMonth, $lte: endMonth }})
            .then(records => {
              for(let i = 0; i < records.length; i++){
                totalAmount += records[i].amount
              }
            })
            .then(() => {
              return res.render('index', { expenses, totalAmount, monthAmount, name, month })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
//2. 當日模式
router.post('/', (req, res) => {
  const mode = req.body.options
  const userId = req.user._id
  const today = {start: new Date(new Date().setHours(0, 0, 0, 0)), end: new Date(new Date().setHours(23, 59, 59, 0))}
  const yesterday = {start: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)), end: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 0))}
  const tomorrow = {start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)), end: new Date( new Date(new Date().setDate(new Date().getDate() + 1)).setHours(23, 59, 59, 0))}
  const selectedDate = [today, tomorrow, yesterday]
  const record = []
  const totalAmount = []
  // 分別篩選今日、明日、昨日的支出
  return Promise.all(
    selectedDate.map((date, index) => {
      return Record.find({ userId, 'date': { $gte: date.start, $lte: date.end }}).lean()
    })    
  ).then(results => {
    results.map((expenses, index) => {
      //計算當日總金額
      let amount = 0
      for (let i = 0; i < expenses.length; i++) {
        amount += expenses[i].amount
      }
      totalAmount[index] = amount//將當日總金額加入陣列中
      record[index] = expenses//將當日支出加入陣列中
    })
  })      
  .then(() => {
     res.render('index', {record, totalAmount, today, tomorrow, yesterday, mode})
  })
  .catch(err => console.log(err))
})
//3. 當月模式
router.get('/', (req, res) => {
  const userId = req.user._id
  const startMonth = new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0))
  const endMonth = new Date(new Date(new Date().setDate(31)).setHours(23, 59, 59, 0))
  const month = new Date().getMonth() + 1
  return Record.find({ userId, date: { $gte: startMonth, $lte: endMonth } })
    .sort({date: 1})
    .lean()
    .then(expenses => {
      //計算總金額
      let totalAmount = 0
      for (let i = 0; i < expenses.length; i++) {
        totalAmount += expenses[i].amount
      }
      res.render('index', { expenses, totalAmount, month })
    })
    .catch(err => console.log(err))
})
module.exports = router
