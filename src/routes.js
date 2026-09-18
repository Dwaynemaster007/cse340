import express from 'express';
import { showHomePage } from './controllers/index.js';
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
} from './controllers/organizations.js';
import {
  showProjectsPage,
  showProjectDetailsPage,
} from './controllers/projects.js';
import {
  showCategoriesPage,
  showCategoryDetailsPage,
} from './controllers/categories.js';

const router = express.Router();

router.get('/', showHomePage);

// Organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Service Project routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

export default router;