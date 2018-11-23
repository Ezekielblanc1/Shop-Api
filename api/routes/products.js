const express = require('express');
const router = express.Router();

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then((allProducts) => {
      const response = {
        count: allProducts.length,
        products: allProducts.map((product)=> {
          return {
            name: product.name,
            price: product.price,
            _id: product._id,
            request: {
              type: 'GET',
              url: 'http://localhost:8080/products/' + product._id 
            }
          }
        })
      }
      res.status(200).json(response)
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
        message: 'Created Successfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:8080/products/' + result._id
          }
        }
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
  .select('name price _id')
  .exec()
  .then((foundData) => {
    if(foundData){
      console.log(foundData)
      res.status(200).json({
      docs: foundData,
      request: {
        type: 'GET',
        description: 'Get all Products',
        url: 'http://localhost:8080/products'
      }
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
        message: 'Updated Successfully',
        request:{
          type: 'GET',
          url: 'http://local:8080/products/' + result._id
        }
      })
    })
})

router.delete('/:id', (req, res,next) => {
  const id = req.params.id
 Product.remove({ _id : id})
  .exec()
  .then((result) =>{
    res.status(200).json({
      message: 'Deleted Successfully',
      request: {
        type: 'POST',
        url: 'http://localhost:8080/products',
        data: {
          name: 'String',
          price: 'Number'
        }
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  });
})

module.exports = router