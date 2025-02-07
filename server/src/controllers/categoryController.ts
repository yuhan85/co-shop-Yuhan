import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import { BadRequestError, NotFoundError } from '../errors/customErrors';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { category_name } = req.body;

    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
});

export const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
        throw new NotFoundError('Category not found');
    }

    res.status(200).json(category);
});

export const getAllCategories = asyncHandler(async (_req: Request, res: Response) => {
    const categories = await Category.findAll();
    res.status(200).json(categories);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { category_name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
        throw new NotFoundError('Category not found');
    }

    category.category_name = category_name || category.category_name;
    await category.save();

    res.status(200).json(category);
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
        throw new NotFoundError('Category not found');
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
});