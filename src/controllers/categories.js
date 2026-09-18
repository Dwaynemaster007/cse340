import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
} from '../models/categories.js';

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

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    const projects = await getProjectsByCategoryId(categoryId);
    res.render('category', {
      title: category.name,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export { showCategoriesPage, showCategoryDetailsPage };