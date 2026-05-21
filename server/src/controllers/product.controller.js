import { products } from '../data/products.js';
import logger from '../middlewares/logger.js';

export const getProducts = (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || products.length;
    const offset = parseInt(req.query.offset) || 0;
    
    // Also handle title query for search if frontend sends it
    const title = req.query.title ? req.query.title.toLowerCase() : '';
    
    let filteredProducts = products;
    if (title) {
      filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(title));
    }
    
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);
    res.status(200).json(paginatedProducts);
  } catch (error) {
    logger.error(`getProducts error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    logger.error(`getProductById error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
