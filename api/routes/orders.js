const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order')
const Product = require('../models/product')


router.get('/', (req, res, next) => {
  Order.find()
      .populate('product', 'name')
      .exec()
      .then((docs) => {
        console.log(docs)
        res.status(201).json(docs)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
})

router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if(!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Order stored',
        createdOrder: {
          _id : result._id,
          prdouct: result.productId,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: 'http://localhost:8080/orders/' + result._id
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.get('/:id',(req, res, next)=>{
  const id = req.params.id
  Order.findById(id)
    .populate('product', 'name')
    .exec()
    .then((order)=> {
      if(!order){
        return res.status(404).json({
          message: 'Order not found'
        })
      }
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http://localhost:8080/orders'
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:id', (req, res, next) => {
 const id = req.params.id
 Order.findByIdAndRemove(id)
  .exec()
  .then((result)=> {
    res.status(200).json({
      message: 'Order deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:8080/orders',
        body: { productId: 'ID', quantity: 'Number'}
      }
    })
  })
  .catch(err => {
    res.status(500).json({error: err})
  })
})

module.exports = router