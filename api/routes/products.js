const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /products'
  })
})

router.post('/', (req, res, next) => {
  const product = req.body.name
  res.status(200).json({
    message: 'Handling POST requests to /products'
  })
})

router.get('/:id', (req, res, next)=>{
  const id = req.params.id;
  if(id === 'node') {
    res.status(200).json({
      message: 'You can learn node',
      id: id
    })
  } else{
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
})
router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Updated Product'
  })
})

router.delete('/:id', (req, res,next) => {
  res.status(200).json({
    message: 'Deleted product'
  })
})

module.exports = router