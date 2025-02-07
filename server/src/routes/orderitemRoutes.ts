import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createOrderItem, 
    getOrderItemById, 
    getAllOrderItems, 
    updateOrderItem, 
    deleteOrderItem 
} from '../controllers/orderitemController';

const router = express.Router();

/**
 * @route POST /api/orderitems
 * @desc Create a new order item
 * @access Public
 */
router.post('/', 
    body('order_id').isInt().withMessage('Order ID is required'),
    body('product_id').isInt().withMessage('Product ID is required'),
    body('qty').isInt().withMessage('Quantity is required'),
    body('unit_price').isDecimal().withMessage('Unit price is required'),
    validateRequest,
    createOrderItem
);

/**
 * @route GET /api/orderitems
 * @desc Get all order items
 * @access Public
 */
router.get('/', getAllOrderItems);

/**
 * @route GET /api/orderitems/:id
 * @desc Get an order item by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid order item ID'),
    validateRequest,
    getOrderItemById
);

/**
 * @route PUT /api/orderitems/:id
 * @desc Update an order item's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid order item ID'),
    body('order_id').optional().isInt().withMessage('Order ID must be an integer'),
    body('product_id').optional().isInt().withMessage('Product ID must be an integer'),
    body('qty').optional().isInt().withMessage('Quantity must be an integer'),
    body('unit_price').optional().isDecimal().withMessage('Unit price must be a decimal'),
    validateRequest,
    updateOrderItem
);

/**
 * @route DELETE /api/orderitems/:id
 * @desc Delete an order item
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid order item ID'),
    validateRequest,
    deleteOrderItem
);

export default router;

/**
 * @route POST /api/orderitems
 * @desc Create a new order item
 * @example
 * // Request body
 * {
 *   "order_id": 1,
 *   "product_id": 2,
 *   "qty": 3,
 *   "unit_price": 19.99
 * }
 * // Response
 * {
 *   "order_id": 1,
 *   "product_id": 2,
 *   "qty": 3,
 *   "unit_price": 19.99
 * }
 */

/**
 * @route GET /api/orderitems
 * @desc Get all order items
 * @example
 * // Response
 * [
 *   {
 *     "order_id": 1,
 *     "product_id": 2,
 *     "qty": 3,
 *     "unit_price": 19.99
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/orderitems/:id
 * @desc Get an order item by ID
 * @example
 * // Response
 * {
 *   "order_id": 1,
 *   "product_id": 2,
 *   "qty": 3,
 *   "unit_price": 19.99
 * }
 */

/**
 * @route PUT /api/orderitems/:id
 * @desc Update an order item's details
 * @example
 * // Request body
 * {
 *   "qty": 5
 * }
 * // Response
 * {
 *   "order_id": 1,
 *   "product_id": 2,
 *   "qty": 5,
 *   "unit_price": 19.99
 * }
 */

/**
 * @route DELETE /api/orderitems/:id
 * @desc Delete an order item
 * @example
 * // Response
 * {
 *   "message": "Order item deleted successfully"
 * }
 */