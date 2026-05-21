import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import logger from '../middlewares/logger.js';

export const getCategories = (req, res) => {
  try {
    res.status(200).json(categories);
  } catch (error) {
    logger.error(`getCategories error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCategoryById = (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json(category);
  } catch (error) {
    logger.error(`getCategoryById error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductsByCategory = (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const categoryProducts = products.filter(p => p.category.id === categoryId);
    
    res.status(200).json(categoryProducts);
  } catch (error) {
    logger.error(`getProductsByCategory error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
