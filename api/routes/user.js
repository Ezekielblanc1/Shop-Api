const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/signup', (req, res, next) => {
  User.findOne({email: req.body.email})
  .exec()
  .then(user => {
    if(user){
      res.status(409).json({
        message: 'Email exists already'
      })
    } else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          res.status(500).json({
            error: err
          })
        }else{
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(result => {
              console.log(result)
              res.status(201).json({
                message: 'User created'
              })
            })
            .catch(err => {
              res.status(500).json({
                error: err
              })
            })
        }
      })
    }
  })
})

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Deleted Successfully'
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})








module.exports = router