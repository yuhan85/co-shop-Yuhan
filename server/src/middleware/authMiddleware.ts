import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/customErrors';  // A custom error class

export interface AuthenticatedRequest extends Request {
    userId?: string;
    role?: string;
}

// Middleware to verify JWT
export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract token from "Bearer <token>"

    if (!token) {
        return next(new UnauthorizedError('Authentication token is required'));
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };
        
        // Attach user info to the request object
        req.userId = decoded.userId;
        req.role = decoded.role;

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return next(new UnauthorizedError('Invalid or expired token'));
    }
};