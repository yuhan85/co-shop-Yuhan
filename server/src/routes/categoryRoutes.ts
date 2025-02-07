import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createCategory, 
    getCategoryById, 
    getAllCategories, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController';

const router = express.Router();

/**
 * @route POST /api/categories
 * @desc Create a new category
 * @access Public
 */
router.post('/', 
    body('category_name').trim().notEmpty().withMessage('Category name is required'),
    validateRequest,
    createCategory
);

/**
 * @route GET /api/categories
 * @desc Get all categories
 * @access Public
 */
router.get('/', getAllCategories);

/**
 * @route GET /api/categories/:id
 * @desc Get a category by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid category ID'),
    validateRequest,
    getCategoryById
);

/**
 * @route PUT /api/categories/:id
 * @desc Update a category's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid category ID'),
    body('category_name').optional().trim().notEmpty().withMessage('Category name cannot be empty'),
    validateRequest,
    updateCategory
);

/**
 * @route DELETE /api/categories/:id
 * @desc Delete a category
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid category ID'),
    validateRequest,
    deleteCategory
);

export default router;

/**
 * @route POST /api/categories
 * @desc Create a new category
 * @example
 * // Request body
 * {
 *   "category_name": "Electronics"
 * }
 * // Response
 * {
 *   "category_id": 1,
 *   "category_name": "Electronics",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/categories
 * @desc Get all categories
 * @example
 * // Response
 * [
 *   {
 *     "category_id": 1,
 *     "category_name": "Electronics",
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/categories/:id
 * @desc Get a category by ID
 * @example
 * // Response
 * {
 *   "category_id": 1,
 *   "category_name": "Electronics",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/categories/:id
 * @desc Update a category's details
 * @example
 * // Request body
 * {
 *   "category_name": "Home Appliances"
 * }
 * // Response
 * {
 *   "category_id": 1,
 *   "category_name": "Home Appliances",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/categories/:id
 * @desc Delete a category
 * @example
 * // Response
 * {
 *   "message": "Category deleted successfully"
 * }
 */