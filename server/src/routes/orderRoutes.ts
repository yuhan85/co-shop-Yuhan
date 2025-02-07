import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createOrder, 
    getOrderById, 
    getAllOrders, 
    updateOrder, 
    deleteOrder 
} from '../controllers/orderController';

const router = express.Router();

/**
 * @route POST /api/orders
 * @desc Create a new order
 * @access Public
 */
router.post('/', 
    body('customer_id').isInt().withMessage('Customer ID is required'),
    body('shipping_address_id').isInt().withMessage('Shipping address ID is required'),
    body('stripe_payment_id').trim().notEmpty().withMessage('Stripe payment ID is required'),
    body('order_status').isIn(['pending', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid order status'),
    body('total_price').isDecimal().withMessage('Total price is required'),
    validateRequest,
    createOrder
);

/**
 * @route GET /api/orders
 * @desc Get all orders
 * @access Public
 */
router.get('/', getAllOrders);

/**
 * @route GET /api/orders/:id
 * @desc Get an order by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid order ID'),
    validateRequest,
    getOrderById
);

/**
 * @route PUT /api/orders/:id
 * @desc Update an order's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid order ID'),
    body('customer_id').optional().isInt().withMessage('Customer ID must be an integer'),
    body('shipping_address_id').optional().isInt().withMessage('Shipping address ID must be an integer'),
    body('stripe_payment_id').optional().trim().notEmpty().withMessage('Stripe payment ID cannot be empty'),
    body('order_status').optional().isIn(['pending', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid order status'),
    body('total_price').optional().isDecimal().withMessage('Total price must be a decimal'),
    validateRequest,
    updateOrder
);

/**
 * @route DELETE /api/orders/:id
 * @desc Delete an order
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid order ID'),
    validateRequest,
    deleteOrder
);

export default router;

/**
 * @route POST /api/orders
 * @desc Create a new order
 * @example
 * // Request body
 * {
 *   "customer_id": 1,
 *   "shipping_address_id": 2,
 *   "stripe_payment_id": "pi_1GqIC8HYgolSBA35LyjYxE5P",
 *   "order_status": "pending",
 *   "total_price": 99.99
 * }
 * // Response
 * {
 *   "order_id": 1,
 *   "customer_id": 1,
 *   "shipping_address_id": 2,
 *   "stripe_payment_id": "pi_1GqIC8HYgolSBA35LyjYxE5P",
 *   "order_status": "pending",
 *   "total_price": 99.99,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/orders
 * @desc Get all orders
 * @example
 * // Response
 * [
 *   {
 *     "order_id": 1,
 *     "customer_id": 1,
 *     "shipping_address_id": 2,
 *     "stripe_payment_id": "pi_1GqIC8HYgolSBA35LyjYxE5P",
 *     "order_status": "pending",
 *     "total_price": 99.99,
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/orders/:id
 * @desc Get an order by ID
 * @example
 * // Response
 * {
 *   "order_id": 1,
 *   "customer_id": 1,
 *   "shipping_address_id": 2,
 *   "stripe_payment_id": "pi_1GqIC8HYgolSBA35LyjYxE5P",
 *   "order_status": "pending",
 *   "total_price": 99.99,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/orders/:id
 * @desc Update an order's details
 * @example
 * // Request body
 * {
 *   "order_status": "shipped"
 * }
 * // Response
 * {
 *   "order_id": 1,
 *   "customer_id": 1,
 *   "shipping_address_id": 2,
 *   "stripe_payment_id": "pi_1GqIC8HYgolSBA35LyjYxE5P",
 *   "order_status": "shipped",
 *   "total_price": 99.99,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/orders/:id
 * @desc Delete an order
 * @example
 * // Response
 * {
 *   "message": "Order deleted successfully"
 * }
 */