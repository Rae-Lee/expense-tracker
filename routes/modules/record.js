const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
// 建立頁面
router.get('/new', (req, res) => {
  res.render('new'
  )
})
//編輯頁面
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const isSelected = {}
  return Record.findOne({userId, _id})
    .lean()
    .then(expense => {
      const category = expense.categoryId
      switch (category) {
        case 1:
          isSelected.dailyliving = 1
          break;
        case 2:
          isSelected.transportation = 1
          break;
        case 3:
          isSelected.entertainment = 1
          break;
        case 4:
          isSelected.food = 1
          break;
        case 5:
          isSelected.others = 1
          break
      }
      res.render('edit', { isSelected, expense })
    })
    .catch(err => console.log(err))
})
//新增支出
router.post('/new', (req, res) => {
  const { name, date, amount, categoryId } = req.body
  const userId = req.user._id
  return Record.create({name, date, amount, categoryId, userId})
   .then(() => res.redirect('/'))
   .catch(err => console.log(err))
})
//編輯支出
router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, categoryId } = req.body
  return Record.findOne({userId, _id})
    .then(expense => {
      expense.name = name
      expense.date = date
      expense.amount = amount
      expense.categoryId = categoryId
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
//刪除支出
router.delete('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({userId, _id})
    .then(expense => {
      expense.remove()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router