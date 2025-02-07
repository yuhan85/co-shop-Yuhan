import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createPayment, 
    getPaymentById, 
    getAllPayments, 
    updatePayment, 
    deletePayment 
} from '../controllers/paymentController';

const router = express.Router();

/**
 * @route POST /api/payments
 * @desc Create a new payment
 * @access Public
 */
router.post('/', 
    body('order_id').isInt().withMessage('Order ID is required'),
    body('stripe_charge_id').trim().notEmpty().withMessage('Stripe charge ID is required'),
    body('payment_status').trim().notEmpty().withMessage('Payment status is required'),
    validateRequest,
    createPayment
);

/**
 * @route GET /api/payments
 * @desc Get all payments
 * @access Public
 */
router.get('/', getAllPayments);

/**
 * @route GET /api/payments/:id
 * @desc Get a payment by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid payment ID'),
    validateRequest,
    getPaymentById
);

/**
 * @route PUT /api/payments/:id
 * @desc Update a payment's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid payment ID'),
    body('order_id').optional().isInt().withMessage('Order ID must be an integer'),
    body('stripe_charge_id').optional().trim().notEmpty().withMessage('Stripe charge ID cannot be empty'),
    body('payment_status').optional().trim().notEmpty().withMessage('Payment status cannot be empty'),
    validateRequest,
    updatePayment
);

/**
 * @route DELETE /api/payments/:id
 * @desc Delete a payment
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid payment ID'),
    validateRequest,
    deletePayment
);

export default router;

/**
 * @route POST /api/payments
 * @desc Create a new payment
 * @example
 * // Request body
 * {
 *   "order_id": 1,
 *   "stripe_charge_id": "ch_1GqIC8HYgolSBA35LyjYxE5P",
 *   "payment_status": "completed"
 * }
 * // Response
 * {
 *   "payment_id": 1,
 *   "order_id": 1,
 *   "stripe_charge_id": "ch_1GqIC8HYgolSBA35LyjYxE5P",
 *   "payment_status": "completed",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/payments
 * @desc Get all payments
 * @example
 * // Response
 * [
 *   {
 *     "payment_id": 1,
 *     "order_id": 1,
 *     "stripe_charge_id": "ch_1GqIC8HYgolSBA35LyjYxE5P",
 *     "payment_status": "completed",
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/payments/:id
 * @desc Get a payment by ID
 * @example
 * // Response
 * {
 *   "payment_id": 1,
 *   "order_id": 1,
 *   "stripe_charge_id": "ch_1GqIC8HYgolSBA35LyjYxE5P",
 *   "payment_status": "completed",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/payments/:id
 * @desc Update a payment's details
 * @example
 * // Request body
 * {
 *   "payment_status": "refunded"
 * }
 * // Response
 * {
 *   "payment_id": 1,
 *   "order_id": 1,
 *   "stripe_charge_id": "ch_1GqIC8HYgolSBA35LyjYxE5P",
 *   "payment_status": "refunded",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/payments/:id
 * @desc Delete a payment
 * @example
 * // Response
 * {
 *   "message": "Payment deleted successfully"
 * }
 */