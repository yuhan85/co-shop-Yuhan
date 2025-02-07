import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { store_id, name, description, price, category_id, stock_quantity } = req.body;

    const newProduct = await Product.create({ store_id, name, description, price, category_id, stock_quantity });
    res.status(201).json(newProduct);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }

    res.status(200).json(product);
});

export const getAllProducts = asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.findAll();
    res.status(200).json(products);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { store_id, name, description, price, category_id, stock_quantity } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }

    product.store_id = store_id || product.store_id;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category_id = category_id || product.category_id;
    product.stock_quantity = stock_quantity || product.stock_quantity;
    await product.save();

    res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
});