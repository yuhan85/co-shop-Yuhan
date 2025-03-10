import {Request, Response, NextFunction} from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, authenticateJWT } from '../middleware/authMiddleware';
import cookieParser from 'cookie-parser';

import {
    BadRequestError,
    NotFoundError
}  from '../errors/customErrors';
import AuthMiddleware from '../middleware/auth.middleware';

const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const getUserbyID = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const id  = req.params.id;
    const authMiddleware = new AuthMiddleware();
    if (id === "me") {
        const token = req.cookies.authToken;
        let dummyUser = { 'user_id': 0, 'name': 'Guest'};
        if (!token) {   
            return res.json(dummyUser);
        }
        else {
            authMiddleware.verifyToken(req, res, async () => {
                // If user requests "me", return their own profile
                const user = await User.findByPk(req.userId, { attributes: { exclude: ['password', 'isValid', 'user_id', 'createdAt', 'updatedAt'] } });
                if (!user) return res.status(404).json({ error: "User not found" });
                return res.json(user);
            });
        }
    }
    else {  
        authMiddleware.verifyToken(req, res, async () => {
            const user = await User.findByPk(id);
            if(!user) {
                throw new NotFoundError(`User with id '${ id }' not found`);
            }
            res.status(200).json(user);
        });
    }
});

export const updateUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const id  = req.userId;             
    const { email, name, family_name, avatar } = req.body;  // Extract updated user data from the body

    const user = await User.findByPk(id);  // Find the user by their ID
    if (!user) {
        throw new NotFoundError(`User with id '${id}' not found`);  // Throw error if user not found
    }

    // Update the user's attributes with new data
    user.name = name || user.name;           // If new name is provided, update it
    user.email = email || user.email;        // Similarly for email, password, etc.
    user.family_name = family_name || user.family_name;
    user.avatar = avatar || user.avatar;

    // Save the updated user object
    await user.save();

    // Return the updated user data in the response
    res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const id  = req.userId; 

    const user = await User.findByPk(id);
    if (!user) {
        throw new NotFoundError(`User with id '${id}' not found`); 
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
});