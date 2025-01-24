import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/customErrors';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Default server error
    res.status(500).json({
        message: 'Unexpected server error'
    });
};