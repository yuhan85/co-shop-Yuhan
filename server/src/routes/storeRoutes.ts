import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createStore, 
    getStoreById, 
    getAllStores, 
    updateStore, 
    deleteStore 
} from '../controllers/storeController';

const router = express.Router();

/**
 * @route POST /api/stores
 * @desc Create a new store
 * @access Public
 */
router.post('/', 
    body('vendor_id').isInt().withMessage('Vendor ID is required'),
    body('store_name').trim().notEmpty().withMessage('Store name is required'),
    body('store_url').trim().notEmpty().withMessage('Store URL is required'),
    body('store_description').trim().notEmpty().withMessage('Store description is required'),
    validateRequest,
    createStore
);

/**
 * @route GET /api/stores
 * @desc Get all stores
 * @access Public
 */
router.get('/', getAllStores);

/**
 * @route GET /api/stores/:id
 * @desc Get a store by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid store ID'),
    validateRequest,
    getStoreById
);

/**
 * @route PUT /api/stores/:id
 * @desc Update a store's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid store ID'),
    body('vendor_id').optional().isInt().withMessage('Vendor ID must be an integer'),
    body('store_name').optional().trim().notEmpty().withMessage('Store name cannot be empty'),
    body('store_url').optional().trim().notEmpty().withMessage('Store URL cannot be empty'),
    body('store_description').optional().trim().notEmpty().withMessage('Store description cannot be empty'),
    validateRequest,
    updateStore
);

/**
 * @route DELETE /api/stores/:id
 * @desc Delete a store
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid store ID'),
    validateRequest,
    deleteStore
);

export default router;

/**
 * @route POST /api/stores
 * @desc Create a new store
 * @example
 * // Request body
 * {
 *   "vendor_id": 1,
 *   "store_name": "Tech Store",
 *   "store_url": "https://techstore.com",
 *   "store_description": "A store for all your tech needs"
 * }
 * // Response
 * {
 *   "store_id": 1,
 *   "vendor_id": 1,
 *   "store_name": "Tech Store",
 *   "store_url": "https://techstore.com",
 *   "store_description": "A store for all your tech needs",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/stores
 * @desc Get all stores
 * @example
 * // Response
 * [
 *   {
 *     "store_id": 1,
 *     "vendor_id": 1,
 *     "store_name": "Tech Store",
 *     "store_url": "https://techstore.com",
 *     "store_description": "A store for all your tech needs",
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/stores/:id
 * @desc Get a store by ID
 * @example
 * // Response
 * {
 *   "store_id": 1,
 *   "vendor_id": 1,
 *   "store_name": "Tech Store",
 *   "store_url": "https://techstore.com",
 *   "store_description": "A store for all your tech needs",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/stores/:id
 * @desc Update a store's details
 * @example
 * // Request body
 * {
 *   "store_name": "Updated Tech Store"
 * }
 * // Response
 * {
 *   "store_id": 1,
 *   "vendor_id": 1,
 *   "store_name": "Updated Tech Store",
 *   "store_url": "https://techstore.com",
 *   "store_description": "A store for all your tech needs",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/stores/:id
 * @desc Delete a store
 * @example
 * // Response
 * {
 *   "message": "Store deleted successfully"
 * }
 */