import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    signUp,
    signIn,
    verify,
    handlePreflight
} from '../controllers/auth.controller';

const router = express.Router();

router.options('*', handlePreflight);

router.post('/signUp',         
    body('username').notEmpty().normalizeEmail().isEmail(),
    body('password').isString().isLength({ min: 8 }),
    body('name').notEmpty().isString(),
    body('family_name').notEmpty().isString(), 
    validateRequest, signUp);

router.post('/signIn', 
    body('username').notEmpty().normalizeEmail().isEmail(),
    body('password').isString().isLength({ min: 8 }),
    validateRequest, signIn);

router.post('/verify', 
    body('username').notEmpty().normalizeEmail().isEmail(),
    body('code').isString().isLength({ min: 6, max: 6 }),
    validateRequest, verify);

export default router;