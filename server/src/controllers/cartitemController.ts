import { Request, Response, NextFunction } from 'express';
import CartItem from '../models/CartItem';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createCartItem = asyncHandler(async (req: Request, res: Response) => {
    const { cart_id, product_id, qty } = req.body;

    const newCartItem = await CartItem.create({ cart_id, product_id, qty });
    res.status(201).json(newCartItem);
});

export const getCartItemById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
        throw new NotFoundError('Cart item not found');
    }

    res.status(200).json(cartItem);
});

export const getAllCartItems = asyncHandler(async (_req: Request, res: Response) => {
    const cartItems = await CartItem.findAll();
    res.status(200).json(cartItems);
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cart_id, product_id, qty } = req.body;

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
        throw new NotFoundError('Cart item not found');
    }

    cartItem.cart_id = cart_id || cartItem.cart_id;
    cartItem.product_id = product_id || cartItem.product_id;
    cartItem.qty = qty || cartItem.qty;
    await cartItem.save();

    res.status(200).json(cartItem);
});

export const deleteCartItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
        throw new NotFoundError('Cart item not found');
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Cart item deleted successfully' });
});
