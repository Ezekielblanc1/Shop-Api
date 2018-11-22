const express = require('express');
const router = express.Router();

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then((allProducts) => {
      console.log(allProducts)
      res.status(200).json(allProducts)
    })
    .catch(err => {
      res.status(404).json({
        error: err.message
      })
    })
})

router.post('/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
  .save()
  .then((result) => {
    if(result){
      res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: result
      })
    } else{
      res.status(404).json({message: 'No resource was found with the given ID'})
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
})

router.get('/:id', (req, res, next)=>{
  const id = req.params.id;
  Product.findById(id)
  .exec()
  .then((foundData) => {
    if(foundData){
      console.log(foundData)
      res.status(200).json({
      docs: foundData
    })
    } else{
      res.status(404).json({message: 'No resource available with the given ID'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  let {name , price} = req.body;
  Product.findByIdAndUpdate(id,{ name , price },{new:true})
    .exec()
    .then((result) => {
      res.status(200).json({
        result
      })
    })
})

router.delete('/:id', (req, res,next) => {
  const id = req.params.id
 Product.remove({ _id : id})
  .exec()
  .then((result) =>{
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
})

module.exports = router