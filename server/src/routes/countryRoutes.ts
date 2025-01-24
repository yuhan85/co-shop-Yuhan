
import express, { Request, Response, NextFunction } from 'express';
import { 
    createCountry, 
    getCountryByName,
    getAllCountries, 
    getCountryById, 
    updateCountry, 
    deleteCountry 
} from '../controllers/countryController';

import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors';

const router = express.Router();

// Validation middleware checks all validation errors 
const validateRequest = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array()[0].msg);
    }
    next();
};

router.post('/', 
    body('country_name').trim().notEmpty().withMessage('Country name is required'),
    validateRequest,
    createCountry
);

router.get('/', getAllCountries);

router.get('/:id', 
    param('id').isInt().withMessage('Invalid country ID'),
    validateRequest,
    getCountryById
);

router.put('/:id', 
    param('id').isInt().withMessage('Invalid country ID'),
    body('country_name').optional().trim().notEmpty().withMessage('Country name cannot be empty'),
    validateRequest,
    updateCountry
);

router.delete('/:id', 
    param('id').isInt().withMessage('Invalid country ID'),
    validateRequest,
    deleteCountry
);

export default router;


