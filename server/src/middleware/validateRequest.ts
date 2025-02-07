import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors';

/**
 * Middleware to validate request data.
 * If there are validation errors, forward them to errorHandler.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    next();
};