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

// @desc Update order to paid
// route POST /api/v1/orders/id/pay
// access Private/Admin

const updateOrderToPaid = asyncHandler( async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findById(id)

  if(order){
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  }
  
  res.status(500)
  throw new Error('There was a problem updating the order')
  return
})
// @desc Update order to delivered
// route POST /api/v1/orders/:id/deliver
// access Private/Admin

const updateOrderToDelivered = asyncHandler( async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findById(id)

  if(order){
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  }
  
  res.status(500)
  throw new Error('There was a problem updating the order')
  return
})

// @desc Get logged in user orders
// route GET api/v1/orders/myorders
// access Private

const getMyOrders = asyncHandler( async (req, res, next) => {

  const orders = await Order.find({user: req.user._id})
  res.json(orders)
})
// @desc Get all orders
// route GET api/v1/orders
// access Private/Admin

const getOrders = asyncHandler( async (req, res, next) => {

  const orders = await Order.find()
  res.json(orders)
})
export { createOrderItem, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }