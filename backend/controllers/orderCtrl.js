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

export { createOrderItem }