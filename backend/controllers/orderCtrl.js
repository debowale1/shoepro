import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create New Order
// route POST /api/v1/orders/
// access Private

const createOrderItem = asyncHandler( async (req, res, next) => {
  const { 
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    shippingPrice, 
    totalPrice,
    taxPrice,
  } = req.body

  if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('Order item is empty')
    return
  }


  const order = new Order({
    orderItems, 
    user: req.user._id,
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    shippingPrice,
    taxPrice, 
    totalPrice
  })

  const createdOrder = await order.save()

  res.status(201).json(createdOrder)
})


// @desc Get order by Id
// route GET /api/v1/orders/id
// access Private

const getOrderById = asyncHandler( async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findById(id).populate('user')

  if(!order){
    res.status(400)
    throw new Error('Order Not Found')
    return
  }

  res.status(200).json(order)
})

export { createOrderItem, getOrderById }