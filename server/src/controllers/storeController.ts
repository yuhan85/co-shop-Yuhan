import { Request, Response, NextFunction } from 'express';
import Store from '../models/Store';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createStore = asyncHandler(async (req: Request, res: Response) => {
    const { vendor_id, store_name, store_url, store_description } = req.body;

    const newStore = await Store.create({ vendor_id, store_name, store_url, store_description });
    res.status(201).json(newStore);
});

export const getStoreById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const store = await Store.findByPk(id);
    if (!store) {
        throw new NotFoundError('Store not found');
    }

    res.status(200).json(store);
});

export const getAllStores = asyncHandler(async (_req: Request, res: Response) => {
    const stores = await Store.findAll();
    res.status(200).json(stores);
});

export const updateStore = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { vendor_id, store_name, store_url, store_description } = req.body;

    const store = await Store.findByPk(id);
    if (!store) {
        throw new NotFoundError('Store not found');
    }

    store.vendor_id = vendor_id || store.vendor_id;
    store.store_name = store_name || store.store_name;
    store.store_url = store_url || store.store_url;
    store.store_description = store_description || store.store_description;
    await store.save();

    res.status(200).json(store);
});

export const deleteStore = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const store = await Store.findByPk(id);
    if (!store) {
        throw new NotFoundError('Store not found');
    }

    await store.destroy();
    res.status(200).json({ message: 'Store deleted successfully' });
});