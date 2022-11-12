const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//篩選類別
router.get('/category/:category', (req, res) => {
  const name = req.params.category
  Category.findOne({name})
    .then(category => {
      category.id
    })
  


})
//首頁頁面
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({userId})
  res.render('index')
})

module.exports = router
