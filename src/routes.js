import express from 'express';
import { showHomePage } from './controllers/index.js';
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,        // ← add this
  processEditOrganizationForm      // ← add this
} from './controllers/organizations.js';
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm
} from './controllers/projects.js';
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation
} from './controllers/categories.js';
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard
} from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);

// Organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/organization/:id', showOrganizationDetailsPage);

// Edit organization routes
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Service Project routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// New project routes
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

// Edit project routes
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Assign categories routes
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Category create/edit
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

export default router;