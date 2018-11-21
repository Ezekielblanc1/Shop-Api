const express = require('express');
const router = express.Router()

router.get('/', (req, res, next)=> {
  res.status(200).json({
    message: 'Orders were found'
  })
})

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'Order was created'
  })
})

router.get('/:id',(req, res, next)=>{
  const id = req.params.id
  res.status(200).json({
    message: 'Individual order was created',
    orderId: id
  })
})

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted order',
    orderId: req.params.id
  })
})

module.exports = router