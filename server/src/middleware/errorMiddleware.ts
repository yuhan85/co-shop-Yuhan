import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/customErrors';
import { ValidationError } from 'express-validator';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    console.error(`[ERROR] ${err.name}: ${err.message}`);

    // Handle validation errors from express-validator
    if ('errors' in err && Array.isArray((err as any).errors)) {
        return res.status(400).json({
            success: false,
            errors: (err as any).errors.map((error: ValidationError) => ({
                field: (error as any).path || (error as any).param || 'unknown',
                success: false,
                message: error.msg
            }))
        });
    }
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Default server error
    res.status(500).json({
        success: false,
        message: 'Unexpected server error'
    });
};