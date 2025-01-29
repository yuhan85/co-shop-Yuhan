import { Request, Response, NextFunction } from 'express';
import Country from '../models/Country';
import Address from '../models/Address';

import { 
    BadRequestError, 
    NotFoundError
} from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createCountry = asyncHandler(async (req: Request, res: Response) => {
    const { country_name } = req.body;

    // Check if country already exists
    const existingCountry = await Country.findOne({ where: { country_name } });
    if (existingCountry) {
        throw new BadRequestError('Country already exists');
    }

    const newCountry = await Country.create({ country_name });
    res.status(201).json(newCountry);
});

export const getCountryByName = asyncHandler(async (req: Request, res: Response) => {
    const {  country_name } = req.params;

    const country = await Country.findOne({ where: { country_name } });
    if (!country) {
        throw new NotFoundError(`Country with name '${ country_name}' not found`);
    }

    res.status(200).json(country);
});

export const getAllCountries = asyncHandler(async (_req: Request, res: Response) => {
    const countries = await Country.findAll({ include: Address });
    res.status(200).json(countries);
});

export const getCountryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const country = await Country.findByPk(id, { include: Address });
    if (!country) {
        throw new NotFoundError('Country not found');
    }

    res.status(200).json(country);
});

export const updateCountry = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { country_name } = req.body;

    const country = await Country.findByPk(id);
    if (!country) {
        throw new NotFoundError('Country not found');
    }

    country.country_name = country_name || country.country_name;
    await country.save();

    res.status(200).json(country);
});

export const deleteCountry = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const country = await Country.findByPk(id);
    if (!country) {
        throw new NotFoundError('Country not found');
    }

    await country.destroy();
    res.status(200).json({ message: 'Country deleted successfully' });
});