const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//篩選類別
router.get('/category/:category', (req, res) => {
  const name = req.params.category
  const userId = req.user._id
  const startMonth = new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0))
  const endMonth = new Date(new Date(new Date().setDate(31)).setHours(23, 59, 59))
  const month = new Date().getMonth() + 1
  return Category.findOne({name})
    .then(category => {
      Record.find({userId, categoryId: category.id, date: {$gte: startMonth, $lte: endMonth}})
        .lean()
        .then(expenses => {
          //計算該類別總金額
          let totalAmount = 0
          let monthAmount = 0
          for (let i = 0; i < expenses.length; i++) {
            totalAmount += expenses[i].amount
          }
          //計算當月總花費
          Record.find({ userId, date: { $gte: startMonth, $lte: endMonth }})
            .then(records => {
              for(let i = 0; i < records.length; i++){
                monthAmount += records[i].amount
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
//首頁頁面
router.get('/', (req, res) => {
  const userId = req.user._id
  const today = {start: new Date(new Date().setHours(0, 0, 0)), end: new Date(new Date().setHours(23, 59, 59))}
  const yesterday = {start: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0)), end: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59))}
  const tomorrow = {start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0)), end: new Date( new Date(new Date().setDate(new Date().getDate() + 1)).setHours(23, 59, 59))}
  const selectedDate = [today, tomorrow, yesterday]
  const record = []
  const totalAmount = []
  // 分別篩選今日、明日、昨日的支出
  return Promise.all(
    selectedDate.map((date, index) => {
      return Record.find({userId, 'date': {$gte:date.start, $lte:date.end}})
        .lean()
        .then(expenses => {
          //計算當日總金額
          let amount = 0
          for (let i = 0; i < expenses.length; i++) {
            amount += expenses[i].amount
          }
          totalAmount[index] = amount//將當日總金額加入陣列中
          record[index] = expenses//將當日支出加入陣列中
        })
        .catch(err => console.log(err))
    })
  ).then(() => {
     res.render('index', {record, totalAmount, today, tomorrow, yesterday})
  })
  .catch(err => console.log(err))
})
module.exports = router
