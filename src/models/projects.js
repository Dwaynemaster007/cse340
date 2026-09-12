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

export { getAllProjects }; 