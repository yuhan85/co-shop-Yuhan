import { Request, Response, NextFunction } from 'express';
import Review from '../models/Review';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createReview = asyncHandler(async (req: Request, res: Response) => {
    const { customer_id, ordered_product_id, rating_score, comment } = req.body;

    const newReview = await Review.create({ customer_id, ordered_product_id, rating_score, comment });
    res.status(201).json(newReview);
});

export const getReviewById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
        throw new NotFoundError('Review not found');
    }

    res.status(200).json(review);
});

export const getAllReviews = asyncHandler(async (_req: Request, res: Response) => {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
});

export const updateReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { customer_id, ordered_product_id, rating_score, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
        throw new NotFoundError('Review not found');
    }

    review.customer_id = customer_id || review.customer_id;
    review.ordered_product_id = ordered_product_id || review.ordered_product_id;
    review.rating_score = rating_score || review.rating_score;
    review.comment = comment || review.comment;
    await review.save();

    res.status(200).json(review);
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
        throw new NotFoundError('Review not found');
    }

    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
});