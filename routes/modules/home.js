const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//篩選類別
router.get('/category/:category', (req, res) => {
  const name = req.params.category
  const userId = req.user._id
  return Category.findOne({name})
    .then(category => {
      Record.find({userId, categoryId: category.id})
        .lean()
        .then(expenses => {
          //計算總金額
          let totalAmount = 0
          for (let i = 0; i < expenses.length; i++) {
            totalAmount += expenses[i].amount
          }
          res.render('index', { expenses, totalAmount })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
//首頁頁面
router.get('/', (req, res) => {
  const userId = req.user._id
 return Record.find({userId})
  .lean()
  .then(expenses => {
    //計算總金額
    let totalAmount = 0
    for(let i = 0; i < expenses.length; i++){
      totalAmount += expenses[i].amount
    }
    res.render('index', {expenses, totalAmount})
  })
  .catch(err => console.log(err))
})

module.exports = router
