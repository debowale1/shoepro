const express = require('express')
const products = require('./data/products');

const app = express();

app.get('/api/v1/products', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});

app.get('/api/v1/products/:id', (req, res) => {
  const {id} = req.params;
  const product = products.find(p => p._id === id)
  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  })
})

app.listen(2000, '127.0.0.1', () => {
  console.log('app running on port 2000');
})