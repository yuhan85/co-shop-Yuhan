import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createReview, 
    getReviewById, 
    getAllReviews, 
    updateReview, 
    deleteReview 
} from '../controllers/reviewController';

const router = express.Router();

/**
 * @route POST /api/reviews
 * @desc Create a new review
 * @access Public
 */
router.post('/', 
    body('customer_id').isInt().withMessage('Customer ID is required'),
    body('ordered_product_id').isInt().withMessage('Ordered product ID is required'),
    body('rating_score').isInt({ min: 1, max: 5 }).withMessage('Rating score must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required'),
    validateRequest,
    createReview
);

/**
 * @route GET /api/reviews
 * @desc Get all reviews
 * @access Public
 */
router.get('/', getAllReviews);

/**
 * @route GET /api/reviews/:id
 * @desc Get a review by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid review ID'),
    validateRequest,
    getReviewById
);

/**
 * @route PUT /api/reviews/:id
 * @desc Update a review's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid review ID'),
    body('customer_id').optional().isInt().withMessage('Customer ID must be an integer'),
    body('ordered_product_id').optional().isInt().withMessage('Ordered product ID must be an integer'),
    body('rating_score').optional().isInt({ min: 1, max: 5 }).withMessage('Rating score must be between 1 and 5'),
    body('comment').optional().trim().notEmpty().withMessage('Comment cannot be empty'),
    validateRequest,
    updateReview
);

/**
 * @route DELETE /api/reviews/:id
 * @desc Delete a review
 * @access Public
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid review ID'),
    validateRequest,
    deleteReview
);

export default router;

/**
 * @route POST /api/reviews
 * @desc Create a new review
 * @example
 * // Request body
 * {
 *   "customer_id": 1,
 *   "ordered_product_id": 2,
 *   "rating_score": 5,
 *   "comment": "Great product!"
 * }
 * // Response
 * {
 *   "review_id": 1,
 *   "customer_id": 1,
 *   "ordered_product_id": 2,
 *   "rating_score": 5,
 *   "comment": "Great product!",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route GET /api/reviews
 * @desc Get all reviews
 * @example
 * // Response
 * [
 *   {
 *     "review_id": 1,
 *     "customer_id": 1,
 *     "ordered_product_id": 2,
 *     "rating_score": 5,
 *     "comment": "Great product!",
 *     "createdAt": "2025-02-07T15:20:45.000Z",
 *     "updatedAt": "2025-02-07T15:20:45.000Z"
 *   },
 *   ...
 * ]
 */

/**
 * @route GET /api/reviews/:id
 * @desc Get a review by ID
 * @example
 * // Response
 * {
 *   "review_id": 1,
 *   "customer_id": 1,
 *   "ordered_product_id": 2,
 *   "rating_score": 5,
 *   "comment": "Great product!",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route PUT /api/reviews/:id
 * @desc Update a review's details
 * @example
 * // Request body
 * {
 *   "rating_score": 4
 * }
 * // Response
 * {
 *   "review_id": 1,
 *   "customer_id": 1,
 *   "ordered_product_id": 2,
 *   "rating_score": 4,
 *   "comment": "Great product!",
 *   "createdAt": "2025-02-07T15:20:45.000Z",
 *   "updatedAt": "2025-02-07T15:20:45.000Z"
 * }
 */

/**
 * @route DELETE /api/reviews/:id
 * @desc Delete a review
 * @example
 * // Response
 * {
 *   "message": "Review deleted successfully"
 * }
 */