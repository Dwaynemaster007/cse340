import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  updateCategoryAssignments,
  createCategory,        // ← add this
  updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/projects.js'; // or from categories if you have it there

import { body, validationResult } from 'express-validator';

// Validation rules
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach(error => req.flash('error', error.msg));
    return res.redirect('/new-category');
  }

  const { name } = req.body;
  try {
    const categoryId = await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error creating category.');
    res.redirect('/new-category');
  }
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);

  if (!category) {
    req.flash('error', 'Category not found.');
    return res.redirect('/categories');
  }

  const title = 'Edit Category';
  res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach(error => req.flash('error', error.msg));
    return res.redirect(`/edit-category/${req.params.id}`);
  }

  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error updating category.');
    res.redirect(`/edit-category/${categoryId}`);
  }
};

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

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation };