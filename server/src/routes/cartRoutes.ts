import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createCart, 
    getCartById, 
    getAllCarts, 
    updateCart, 
    deleteCart 
} from '../controllers/cartController';

const router = express.Router();

/**
 * @route POST /api/carts
 * @desc Create a new cart
 * @access Public
 */
router.post('/', 
    body('customer_id').isInt().withMessage('Customer ID is required'),
    validateRequest,
    createCart
);

/**
 * @route GET /api/carts
 * @desc Get all carts
 * @access Public
 */
router.get('/', getAllCarts);

/**
 * @route GET /api/carts/:id
 * @desc Get a cart by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid cart ID'),
    validateRequest,
    getCartById
);

/**
 * @route PUT /api/carts/:id
 * @desc Update a cart's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid cart ID'),
    body('customer_id').optional().isInt().withMessage('Customer ID must be an integer'),
    validateRequest,
    updateCart
);

/**
 * @route DELETE /api/carts/:id
 * @desc Delete a cart
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid cart ID'),
    validateRequest,
    deleteCart
);

export default router;

/**
 * @route POST /api/carts
 * @desc Create a new cart
 * @example
 * // Request body
 * {
 *   "customer_id": 1
 * }
 * // Response
 * {
 *   "cart_id": 1,
 *   "customer_id": 1,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/carts
 * @desc Get all carts
 * @example
 * // Response
 * [
 *   {
 *     "cart_id": 1,
 *     "customer_id": 1,
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/carts/:id
 * @desc Get a cart by ID
 * @example
 * // Response
 * {
 *   "cart_id": 1,
 *   "customer_id": 1,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/carts/:id
 * @desc Update a cart's details
 * @example
 * // Request body
 * {
 *   "customer_id": 2
 * }
 * // Response
 * {
 *   "cart_id": 1,
 *   "customer_id": 2,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/carts/:id
 * @desc Delete a cart
 * @example
 * // Response
 * {
 *   "message": "Cart deleted successfully"
 * }
 */