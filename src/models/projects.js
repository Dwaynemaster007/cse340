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
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM project
    WHERE organization_id = $1
    ORDER BY date;
  `;
  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);
  return result.rows;
};

// Single combined export statement at the end of the file
export { getAllProjects, getProjectsByOrganizationId };