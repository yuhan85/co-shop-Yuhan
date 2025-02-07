import { Request, Response, NextFunction } from 'express';
import Coupon from '../models/Coupon';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createCoupon = asyncHandler(async (req: Request, res: Response) => {
    const { product_id, amount, type, start_date, end_date } = req.body;

    const newCoupon = await Coupon.create({ product_id, amount, type, start_date, end_date });
    res.status(201).json(newCoupon);
});

export const getCouponById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
        throw new NotFoundError('Coupon not found');
    }

    res.status(200).json(coupon);
});

export const getAllCoupons = asyncHandler(async (_req: Request, res: Response) => {
    const coupons = await Coupon.findAll();
    res.status(200).json(coupons);
});

export const updateCoupon = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { product_id, amount, type, start_date, end_date } = req.body;

    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
        throw new NotFoundError('Coupon not found');
    }

    coupon.product_id = product_id || coupon.product_id;
    coupon.amount = amount || coupon.amount;
    coupon.type = type || coupon.type;
    coupon.start_date = start_date || coupon.start_date;
    coupon.end_date = end_date || coupon.end_date;
    await coupon.save();

    res.status(200).json(coupon);
});

export const deleteCoupon = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
        throw new NotFoundError('Coupon not found');
    }

    await coupon.destroy();
    res.status(200).json({ message: 'Coupon deleted successfully' });
});