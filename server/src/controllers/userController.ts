import {Request, Response, NextFunction} from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

import {
    BadRequestError,
    NotFoundError
}  from '../errors/customErrors';

const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);


export const createUser = asyncHandler(async (req: Request, res: Response) => {    
    const { name, email, password, role, phone_number, isValid } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new BadRequestError('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword,  role: role ?? 'customer', phone_number, isValid: isValid ?? true, });    
    res.status(201).json({ newUser, message: 'User created successfully' });
});   

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new BadRequestError('Invalid email or password');
    }

    // Verify password (assuming bcrypt is used)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestError('Invalid email or password');
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
});

export const logoutUser = asyncHandler(async (req: AuthenticatedRequest , res: Response) => {
    // You don’t need to do anything on the server side for logout in JWT-based auth
    // The client will just remove the token from localStorage or cookies
    
    res.status(200).json({
        message: 'Logout successful',
    });
});

// export const getUserbyEmail = asyncHandler(async (req: Request, res: Response) => {
//     const { email } = req.params;
//     const user = await User.findOne({ where: { email }});
//     if(!user) {
//         throw new NotFoundError(`User with email '${ email }' not found`);
//     }
//     res.status(200).json(user);
// });

// export const getAllUsers = asyncHandler( async (req: Request, res: Response) => {
//     const users = await User.findAll({});
//     res.status(200).json(users);
// });

export const getUserbyID = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const id  = req.userId;
    const user = await User.findByPk(id);
    if(!user) {
        throw new NotFoundError(`User with id '${ id }' not found`);
    }
    res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const id  = req.userId;             
    const { name, email, password, role, phone_number, isValid } = req.body;  // Extract updated user data from the body

    const user = await User.findByPk(id);  // Find the user by their ID
    if (!user) {
        throw new NotFoundError(`User with id '${id}' not found`);  // Throw error if user not found
    }

    // Update the user's attributes with new data
    user.name = name || user.name;           // If new name is provided, update it
    user.email = email || user.email;        // Similarly for email, password, etc.
    user.password = password || user.password;
    user.role = role || user.role;
    user.phone_number = phone_number || user.phone_number;
    user.isValid = isValid || user.isValid;

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