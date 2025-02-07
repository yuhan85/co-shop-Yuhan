import { Request, Response, NextFunction } from 'express';
import Payment from '../models/Payment';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createPayment = asyncHandler(async (req: Request, res: Response) => {
    const { order_id, stripe_charge_id, payment_status } = req.body;

    const newPayment = await Payment.create({ order_id, stripe_charge_id, payment_status });
    res.status(201).json(newPayment);
});

export const getPaymentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await Payment.findByPk(id);
    if (!payment) {
        throw new NotFoundError('Payment not found');
    }

    res.status(200).json(payment);
});

export const getAllPayments = asyncHandler(async (_req: Request, res: Response) => {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
});

export const updatePayment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { order_id, stripe_charge_id, payment_status } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
        throw new NotFoundError('Payment not found');
    }

    payment.order_id = order_id || payment.order_id;
    payment.stripe_charge_id = stripe_charge_id || payment.stripe_charge_id;
    payment.payment_status = payment_status || payment.payment_status;
    await payment.save();

    res.status(200).json(payment);
});

export const deletePayment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await Payment.findByPk(id);
    if (!payment) {
        throw new NotFoundError('Payment not found');
    }

    await payment.destroy();
    res.status(200).json({ message: 'Payment deleted successfully' });
});