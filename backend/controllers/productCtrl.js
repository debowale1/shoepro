import asyncHandler from 'express-async-handler'
import Product from './../models/productModel.js'

// @desc Fetch all products
// route GET /api/v1/products
// access Public

const getAllProducts = asyncHandler(async (req, res, next) => {

  const queryObj = {...req.query}
  
  const allowedFields = ['sort', 'fields', 'page', 'limit'];
  allowedFields.forEach(el => delete queryObj[el]);
  
  // console.log(req.query)
  // console.log(queryObj)

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
// access Public

const createProduct = asyncHandler(async(req, res, next) => {
  
    const product = await Product.create(req.body);
    if(!product) return next(res.status(500).json({status: 'error', message: 'Error creating product'}));
    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    })
})

export {getAllProducts, getProduct, createProduct}