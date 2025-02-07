import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const { customer_id, shipping_address_id, stripe_payment_id, order_status, total_price } = req.body;

    const newOrder = await Order.create({ customer_id, shipping_address_id, stripe_payment_id, order_status, total_price });
    res.status(201).json(newOrder);
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
        throw new NotFoundError('Order not found');
    }

    res.status(200).json(order);
});

export const getAllOrders = asyncHandler(async (_req: Request, res: Response) => {
    const orders = await Order.findAll();
    res.status(200).json(orders);
});

export const updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { customer_id, shipping_address_id, stripe_payment_id, order_status, total_price } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
        throw new NotFoundError('Order not found');
    }

    order.customer_id = customer_id || order.customer_id;
    order.shipping_address_id = shipping_address_id || order.shipping_address_id;
    order.stripe_payment_id = stripe_payment_id || order.stripe_payment_id;
    order.order_status = order_status || order.order_status;
    order.total_price = total_price || order.total_price;
    await order.save();

    res.status(200).json(order);
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
        throw new NotFoundError('Order not found');
    }

    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
});