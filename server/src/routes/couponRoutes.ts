import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createCoupon, 
    getCouponById, 
    getAllCoupons, 
    updateCoupon, 
    deleteCoupon 
} from '../controllers/couponController';

const router = express.Router();

/**
 * @route POST /api/coupons
 * @desc Create a new coupon
 * @access Public
 */
router.post('/', 
    body('product_id').isInt().withMessage('Product ID must be an integer'),
    body('amount').isInt().withMessage('Amount must be an integer'),
    body('type').trim().notEmpty().withMessage('Type is required'),
    body('start_date').isISO8601().withMessage('Start date must be a valid date'),
    body('end_date').isISO8601().withMessage('End date must be a valid date'),
    validateRequest,
    createCoupon
);

/**
 * @route GET /api/coupons
 * @desc Get all coupons
 * @access Public
 */
router.get('/', getAllCoupons);

/**
 * @route GET /api/coupons/:id
 * @desc Get a coupon by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid coupon ID'),
    validateRequest,
    getCouponById
);

/**
 * @route PUT /api/coupons/:id
 * @desc Update a coupon's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid coupon ID'),
    body('product_id').optional().isInt().withMessage('Product ID must be an integer'),
    body('amount').optional().isInt().withMessage('Amount must be an integer'),
    body('type').optional().trim().notEmpty().withMessage('Type cannot be empty'),
    body('start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
    body('end_date').optional().isISO8601().withMessage('End date must be a valid date'),
    validateRequest,
    updateCoupon
);

/**
 * @route DELETE /api/coupons/:id
 * @desc Delete a coupon
 * @access Public
 */
router.delete(
    '/:id', 
    param('id').isInt().withMessage('Invalid coupon ID'),
    validateRequest,
    deleteCoupon
);

export default router;