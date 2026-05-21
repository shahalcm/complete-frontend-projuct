import express from 'express';
import { getCategories, getCategoryById, getProductsByCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/products', getProductsByCategory);

export default router;
