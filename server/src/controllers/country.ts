import { Request, Response, NextFunction  } from 'express';
import Country from '../models/Country'; // Adjust path to your Country model
import Address from '../models/Address'; // Adjust path to your Address model
import { 
    BadRequestError, 
    NotFoundError, 
    InternalServerError 
} from '../errors/customErrors';

//confirm the path

// Create a new country
export const createCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { country_name } = req.body;
        if (!country_name) {
            res.status(400).json({ message: 'Country name is required' });
            return;
        }
        const newCountry = await Country.create({ country_name });
        res.status(201).json(newCountry);
    } catch (error:any) {
        res.status(500).json({ message: 'Error creating country', error: error.message });
    }
};

export const createCountry = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { country_name } = req.body;

        if (!country_name?.trim()) {
            throw new BadRequestError('Country name is required');
        }

        const existingCountry = await Country.findOne({ 
            where: { country_name } 
        });

        if (existingCountry) {
            throw new BadRequestError('Country already exists');
        }

        const newCountry = await Country.create({ country_name });
        res.status(201).json(newCountry);
    } catch (error) {
        next(error);
    }
};
// get a country by name
export const getCountryByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(400).json({ message: 'Country name is required' });
            return;
        }

        // Find the country by name
        const country = await Country.findOne({ where: { country_name: name } });

        if (!country) {
            res.status(404).json({ message: `Country with name '${name}' not found` });
            return;
        }

        // Respond with the country details
        res.status(200).json(country);
    } catch (error:any) {
        console.error('Error fetching country by name:', error);
        res.status(500).json({
            message: 'Error fetching country',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};

// Get all countries
export const getAllCountries = async (_req: Request, res: Response): Promise<void> => {
    try {
        const countries = await Country.findAll({ include: Address }); // Includes associated addresses
        res.status(200).json(countries);
    } catch (error:any) {
        res.status(500).json({ message: 'Error fetching countries', error: error.message });
    }
};



// Get a country by ID
export const getCountryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const country = await Country.findByPk(id, { include: Address });

        if (!country) {
            res.status(404).json({ message: 'Country not found' });
            return;
        }

        res.status(200).json(country);
    } catch (error:any) {
        res.status(500).json({ message: 'Error fetching country', error: error.message });
    }
};

// Update a country
export const updateCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { country_name } = req.body;

        const country = await Country.findByPk(id);

        if (!country) {
            res.status(404).json({ message: 'Country not found' });
            return;
        }

        country.country_name = country_name || country.country_name;
        await country.save();

        res.status(200).json(country);
    } catch (error:any) {
        res.status(500).json({ message: 'Error updating country', error: error.message });
    }
};

// Delete a country
export const deleteCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const country = await Country.findByPk(id);

        if (!country) {
            res.status(404).json({ message: 'Country not found' });
            return;
        }

        await country.destroy();

        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: 'Error deleting country', error: error.message });
    }
};