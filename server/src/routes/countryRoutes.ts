import express from 'express';
import { createCountry, getAllCountries, getCountryById, updateCountry, deleteCountry } from '../controllers/countryController';

const router = express.Router();

router.post('/', createCountry); // Create a country
router.get('/', getAllCountries); // Get all countries
router.get('/:id', getCountryById); // Get a country by ID
router.put('/:id', updateCountry); // Update a country
router.delete('/:id', deleteCountry); // Delete a country

export default router;