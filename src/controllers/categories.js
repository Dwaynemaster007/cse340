import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.render('categories', {
      title: 'Service Project Categories',
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

export { showCategoriesPage };