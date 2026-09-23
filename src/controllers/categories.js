import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  updateCategoryAssignments
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/projects.js'; // or from categories if you have it there

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

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = 'Assign Categories to Project';

  res.render('assign-categories', {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];

  // Make sure it is always an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  await updateCategoryAssignments(projectId, categoryIdsArray);

  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };