import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { authenticateJWT } from '../middleware/authMiddleware';
import {
    createUser,
    loginUser,
    logoutUser,
    // getUserbyEmail,
    // getAllUsers,
    getUserbyID,
    updateUser,
    deleteUser
} from '../controllers/userController';

const router = express.Router();

/** 
 * @route POST /api/users/register
 * @desc Create a new user
 * @access Public
 */
router.post('/register', 
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
        body('phone_number').isMobilePhone('any').withMessage('Valid phone number is required')
    ],
    validateRequest,
    createUser
)

/** 
 * @route POST /api/users/login
 * @desc Login a user
 * @access Public
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest, // Middleware to check validation errors
    loginUser
);

router.use(authenticateJWT); 

/** 
 * @route POST /api/users/logout
 * @desc Logout a user
 * @access Protected
 */
router.post(
    '/logout',
    logoutUser
);

/** 
 * @route GET /api/users/profile
 * @desc get a user profile
 * @access Protected
 */
router.get(
    '/profile',
    getUserbyID
);

/** 
 * @route PUT /api/users/profile
 * @desc Update a user profile
 * @access Protected
 */
router.put(
    '/profile',
    updateUser
);

/** 
 * @route DELETE /api/users/account
 * @desc Delete a user
 * @access Protected
 */
router.delete(
    '/account',
    deleteUser
);

export default router;



