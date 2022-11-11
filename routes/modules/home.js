const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//篩選類別
router.get('/category/:category', (req, res) => {
  const category = req.params.category



})
//首頁頁面
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
