import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

export default router;