import asyncHandler from 'express-async-handler'
import Product from './../models/productModel.js'

// @desc Fetch all products
// route GET /api/v1/products
// access Public

const getAllProducts = asyncHandler(async (req, res, next) => {

  const queryObj = {...req.query}
  
  const allowedFields = ['sort', 'fields', 'page', 'limit'];
  allowedFields.forEach(el => delete queryObj[el]);

  let query =  Product.find(queryObj);

  //SORT
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query.sort(sortBy);
  }else{
    query.sort('createdAt');
  }

  //Fields Limiting
  if(req.query.fields){
    const fields = req.query.fields.split(',').join(' ');
    query.select(fields)
  }else{
    query.select('-__v')
  }

  //pagination
  if(req.query.page || req.query.limit){
    const page = +req.query.page || 1
    const perPage = +req.query.limit || 100
    const skip = (page - 1) * perPage
    query.skip(skip).limit(perPage);
  }

  const products = await query

  if(!products) return next(res.status(404).json({status: 'fail', message: 'Products Not Found'}));
  res.status(200).json({
    status: 'success',
    length: products.length,
    data: {
      products
    }
  })
})

// @desc Fetch single product
// route GET /api/v1/products/:id
// access Public

const getProduct = asyncHandler( async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if(!product) {
    res.status(404)
    throw new Error('Product Not Found')
  }
  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  })
})

// @desc Create Product
// route POST /api/v1/products
// access Private/Admin

const createProduct = asyncHandler(async(req, res, next) => {
  
    const product = new Product({
      name: 'sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'sample. brand',
      category: 'sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'sample description'
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct)
})

// @desc Update Product
// route PUT /api/v1/products/:id
// access Private/Admin

const updateProduct = asyncHandler(async(req, res, next) => {
  
  const { name, price, image, brand, category, countInStock, description} = req.body
  const product = await Product.findById(req.params.id);
  if(!product){
    res.status(404)
    throw new Error('Product Not Found')
  }
  product.name = name
  product.price = price
  product.image = image
  product.brand = brand
  product.category = category
  product.countInStock = countInStock
  product.description = description

  const updatedProduct = await product.save()

  res.status(200).json(updatedProduct)
})

// @desc Delete a product
// route DELETE /api/v1/products/:id
// access Private/Admin

const deleteProduct = asyncHandler(async(req, res, next) => {
  
    const product = await Product.findById(req.params.id);
    if(!product){
      res.status(404)
      throw new Error('Product not found')
    }else{
      await product.remove()
      res.json({
        status: 'success',
        message: 'product deleted'
      })
    }
    
})

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct}