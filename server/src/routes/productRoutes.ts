import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createProduct, 
    getProductById, 
    getAllProducts, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController';

const router = express.Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Public
 */
router.post('/', 
    body('store_id').isInt().withMessage('Store ID is required'),
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('description').trim().notEmpty().withMessage('Product description is required'),
    body('price').isDecimal().withMessage('Product price is required'),
    body('category_id').isInt().withMessage('Category ID is required'),
    body('stock_quantity').isInt().withMessage('Stock quantity is required'),
    validateRequest,
    createProduct
);

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
router.get('/', getAllProducts);

/**
 * @route GET /api/products/:id
 * @desc Get a product by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid product ID'),
    validateRequest,
    getProductById
);

/**
 * @route PUT /api/products/:id
 * @desc Update a product's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid product ID'),
    body('store_id').optional().isInt().withMessage('Store ID must be an integer'),
    body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Product description cannot be empty'),
    body('price').optional().isDecimal().withMessage('Product price must be a decimal'),
    body('category_id').optional().isInt().withMessage('Category ID must be an integer'),
    body('stock_quantity').optional().isInt().withMessage('Stock quantity must be an integer'),
    validateRequest,
    updateProduct
);

/**
 * @route DELETE /api/products/:id
 * @desc Delete a product
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid product ID'),
    validateRequest,
    deleteProduct
);

export default router;

/**
 * @route POST /api/products
 * @desc Create a new product
 * @example
 * // Request body
 * {
 *   "store_id": 1,
 *   "name": "Laptop",
 *   "description": "A high-performance laptop",
 *   "price": 999.99,
 *   "category_id": 2,
 *   "stock_quantity": 50
 * }
 * // Response
 * {
 *   "product_id": 1,
 *   "store_id": 1,
 *   "name": "Laptop",
 *   "description": "A high-performance laptop",
 *   "price": 999.99,
 *   "category_id": 2,
 *   "stock_quantity": 50,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/products
 * @desc Get all products
 * @example
 * // Response
 * [
 *   {
 *     "product_id": 1,
 *     "store_id": 1,
 *     "name": "Laptop",
 *     "description": "A high-performance laptop",
 *     "price": 999.99,
 *     "category_id": 2,
 *     "stock_quantity": 50,
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/products/:id
 * @desc Get a product by ID
 * @example
 * // Response
 * {
 *   "product_id": 1,
 *   "store_id": 1,
 *   "name": "Laptop",
 *   "description": "A high-performance laptop",
 *   "price": 999.99,
 *   "category_id": 2,
 *   "stock_quantity": 50,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/products/:id
 * @desc Update a product's details
 * @example
 * // Request body
 * {
 *   "price": 899.99
 * }
 * // Response
 * {
 *   "product_id": 1,
 *   "store_id": 1,
 *   "name": "Laptop",
 *   "description": "A high-performance laptop",
 *   "price": 899.99,
 *   "category_id": 2,
 *   "stock_quantity": 50,
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/products/:id
 * @desc Delete a product
 * @example
 * // Response
 * {
 *   "message": "Product deleted successfully"
 * }
 */