const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
// 建立頁面
router.get('/new', (req, res) => {
  res.render('new')
})
//編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const category = expense.category
  const isSelected = {}
  switch(category){
    case '1':
      isSelected.dailyliving = 1
      break;
    case '2':
      isSelected.transportation = 1
      break;
    case '3':
      isSelected.entertainment = 1
      break; 
    case '4':
      isSelected.food = 1
      break;
    case '5':
      isSelected.others = 1
      break       
  }
  res.render('edit', {isSelected})
})


module.exports = router