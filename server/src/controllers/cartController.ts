import { Request, Response, NextFunction } from 'express';
import Cart from '../models/Cart';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createCart = asyncHandler(async (req: Request, res: Response) => {
    const { customer_id } = req.body;

    const newCart = await Cart.create({ customer_id });
    res.status(201).json(newCart);
});

export const getCartById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cart = await Cart.findByPk(id);
    if (!cart) {
        throw new NotFoundError('Cart not found');
    }

    res.status(200).json(cart);
});

export const getAllCarts = asyncHandler(async (_req: Request, res: Response) => {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
});

export const updateCart = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { customer_id } = req.body;

    const cart = await Cart.findByPk(id);
    if (!cart) {
        throw new NotFoundError('Cart not found');
    }

    cart.customer_id = customer_id || cart.customer_id;
    await cart.save();

    res.status(200).json(cart);
});

export const deleteCart = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cart = await Cart.findByPk(id);
    if (!cart) {
        throw new NotFoundError('Cart not found');
    }

    await cart.destroy();
    res.status(200).json({ message: 'Cart deleted successfully' });
});