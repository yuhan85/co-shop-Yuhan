
import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createCountry, 
    getCountryByName,
    getAllCountries, 
    getCountryById, 
    updateCountry, 
    deleteCountry 
} from '../controllers/countryController';

const router = express.Router();

/**
 * @route POST /api/countries
 * @desc Create a new country
 * @access Public
 */
router.post('/', 
    body('country_name').trim().notEmpty().withMessage('Country name is required'),
    validateRequest,
    createCountry
);

/**
 * @route GET /api/countries
 * @desc Get all countries
 * @access Public
 */
router.get('/', getAllCountries);

/**
 * @route GET /api/countries/name/:country_name
 * @desc Get a country by its name
 * @access Public
 */
router.get(
    '/name/:country_name',
    param('country_name').trim().notEmpty().withMessage('Country name is required'),
    validateRequest,
    getCountryByName
);

/**
 * @route GET /api/countries/:id
 * @desc Get a country by ID
 * @access Public
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid country ID'),
    validateRequest,
    getCountryById
);

/**
 * @route PUT /api/countries/:id
 * @desc Update a country's details
 * @access Public
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid country ID'),
    body('country_name').optional().trim().notEmpty().withMessage('Country name cannot be empty'),
    validateRequest,
    updateCountry
);

/**
 * @route DELETE /api/countries/:id
 * @desc Delete a country
 * @access Public
 */
router.delete(
    '/:id', 
    param('id').isInt().withMessage('Invalid country ID'),
    validateRequest,
    deleteCountry
);

export default router;


