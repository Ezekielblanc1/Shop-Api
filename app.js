const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop-api', {useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.error('Could not connect to database')); 
            

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//Handling CORS

app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next();
})


app.use('/products', productRoutes)

app.use('/orders', orderRoutes) 

//Handling Errors

app.use((req, res, next)=>{
  const error = new Error('Not found');
  error.status = 404
  next(error);
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500).json({
    error:{
      message: error.message
    }
  })
})


module.exports = app