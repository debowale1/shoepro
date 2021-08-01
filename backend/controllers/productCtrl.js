import Product from './../models/productModel'

const getAllProducts = async (res, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      length: products.length,
      data: {
        products
      }
    })
  } catch (error) {
    next(error)
  }
}

const createProduct = async(req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      status: 'success',
      length: products.length,
      data: {
        product
      }
    })
  } catch (error) {
    next(error)
  }
}

export {getAllProducts, createProduct}