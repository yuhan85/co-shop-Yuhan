import { Request, Response, NextFunction } from 'express';
import OrderItem from '../models/OrderItem';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createOrderItem = asyncHandler(async (req: Request, res: Response) => {
    const { order_id, product_id, qty, unit_price } = req.body;

    const newOrderItem = await OrderItem.create({ order_id, product_id, qty, unit_price });
    res.status(201).json(newOrderItem);
});

export const getOrderItemById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
        throw new NotFoundError('Order item not found');
    }

    res.status(200).json(orderItem);
});

export const getAllOrderItems = asyncHandler(async (_req: Request, res: Response) => {
    const orderItems = await OrderItem.findAll();
    res.status(200).json(orderItems);
});

export const updateOrderItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { order_id, product_id, qty, unit_price } = req.body;

    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
        throw new NotFoundError('Order item not found');
    }

    orderItem.order_id = order_id || orderItem.order_id;
    orderItem.product_id = product_id || orderItem.product_id;
    orderItem.qty = qty || orderItem.qty;
    orderItem.unit_price = unit_price || orderItem.unit_price;
    await orderItem.save();

    res.status(200).json(orderItem);
});

export const deleteOrderItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
        throw new NotFoundError('Order item not found');
    }

    await orderItem.destroy();
    res.status(200).json({ message: 'Order item deleted successfully' });
});