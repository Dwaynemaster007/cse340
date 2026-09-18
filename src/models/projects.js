import db from './db.js';

const getAllProjects = async () => {
  const query = `
    SELECT projects.project_id, projects.title, projects.description,
           projects.location, projects.date, projects.category,
           organization.name AS organization_name
    FROM public.projects
    JOIN public.organization
      ON projects.organization_id = organization.organization_id
    ORDER BY projects.date;
  `;
  const result = await db.query(query);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT project_id, organization_id, title, description, location, date
    FROM public.projects
    WHERE organization_id = $1
    ORDER BY date;
  `;
  const result = await db.query(query, [organizationId]);
  return result.rows;
};

// 1. Get the next N upcoming service projects
const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.projects p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;
  const result = await db.query(query, [number_of_projects]);
  return result.rows;
};

// 2. Get a single service project details by ID
const getProjectDetails = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.projects p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

// 3. Get all categories for a given service project
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.category_name AS name
    FROM public.categories c
    JOIN public.projects_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.category_name;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

// Single export statement for all functions
export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProjectId,
};