import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createCartItem, 
    getCartItemById, 
    getAllCartItems, 
    updateCartItem, 
    deleteCartItem 
} from '../controllers/cartitemController';

const router = express.Router();

/**
 * @route POST /api/cartitems
 * @desc Create a new cart item
 * @access Public
 */
router.post('/', 
    body('cart_id').isInt().withMessage('Cart ID is required'),
    body('product_id').isInt().withMessage('Product ID is required'),
    body('qty').isInt().withMessage('Quantity is required'),
    validateRequest,
    createCartItem
);

/**
 * @route GET /api/cartitems
 * @desc Get all cart items
 * @access Public
 */
router.get('/', getAllCartItems);

/**
 * @route GET /api/cartitems/:id
 * @desc Get a cart item by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid cart item ID'),
    validateRequest,
    getCartItemById
);

/**
 * @route PUT /api/cartitems/:id
 * @desc Update a cart item's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid cart item ID'),
    body('cart_id').optional().isInt().withMessage('Cart ID must be an integer'),
    body('product_id').optional().isInt().withMessage('Product ID must be an integer'),
    body('qty').optional().isInt().withMessage('Quantity must be an integer'),
    validateRequest,
    updateCartItem
);

/**
 * @route DELETE /api/cartitems/:id
 * @desc Delete a cart item
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid cart item ID'),
    validateRequest,
    deleteCartItem
);

export default router;

/**
 * @route POST /api/cartitems
 * @desc Create a new cart item
 * @example
 * // Request body
 * {
 *   "cart_id": 1,
 *   "product_id": 2,
 *   "qty": 3
 * }
 * // Response
 * {
 *   "cart_id": 1,
 *   "product_id": 2,
 *   "qty": 3
 * }
 */

/**
 * @route GET /api/cartitems
 * @desc Get all cart items
 * @example
 * // Response
 * [
 *   {
 *     "cart_id": 1,
 *     "product_id": 2,
 *     "qty": 3
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/cartitems/:id
 * @desc Get a cart item by ID
 * @example
 * // Response
 * {
 *   "cart_id": 1,
 *   "product_id": 2,
 *   "qty": 3
 * }
 */

/**
 * @route PUT /api/cartitems/:id
 * @desc Update a cart item's details
 * @example
 * // Request body
 * {
 *   "qty": 5
 * }
 * // Response
 * {
 *   "cart_id": 1,
 *   "product_id": 2,
 *   "qty": 5
 * }
 */

/**
 * @route DELETE /api/cartitems/:id
 * @desc Delete a cart item
 * @example
 * // Response
 * {
 *   "message": "Cart item deleted successfully"
 * }
 */