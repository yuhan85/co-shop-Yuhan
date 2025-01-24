import { Request, Response, NextFunction } from 'express';
import Country from '../models/Country';
import Address from '../models/Address';
import { 
    BadRequestError, 
    NotFoundError, 
    InternalServerError 
} from '../errors/customErrors';

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

export const getCountryByName = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { name } = req.params;

        if (!name) {
            throw new BadRequestError('Country name is required');
        }

        const country = await Country.findOne({ 
            where: { country_name: name } 
        });

        if (!country) {
            throw new NotFoundError(`Country with name '${name}' not found`);
        }

        res.status(200).json(country);
    } catch (error) {
        next(error);
    }
};

export const getAllCountries = async (
    _req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const countries = await Country.findAll({ 
            include: Address 
        });
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

export const getCountryById = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const country = await Country.findByPk(id, { include: Address });

        if (!country) {
            throw new NotFoundError('Country not found');
        }

        res.status(200).json(country);
    } catch (error) {
        next(error);
    }
};

export const updateCountry = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { country_name } = req.body;

        const country = await Country.findByPk(id);

        if (!country) {
            throw new NotFoundError('Country not found');
        }

        country.country_name = country_name || country.country_name;
        await country.save();

        res.status(200).json(country);
    } catch (error) {
        next(error);
    }
};

export const deleteCountry = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const country = await Country.findByPk(id);

        if (!country) {
            throw new NotFoundError('Country not found');
        }

        await country.destroy();
        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        next(error);
    }
};