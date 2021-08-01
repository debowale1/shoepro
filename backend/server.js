const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products');

dotenv.config()
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
const PORT = process.env.PORT || 2000
app.listen(PORT, '127.0.0.1', () => {
  console.log(`app running on port ${PORT}`);
})