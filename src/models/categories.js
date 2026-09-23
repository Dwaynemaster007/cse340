import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT category_id, category_name AS name
    FROM public.categories
    ORDER BY category_name;
  `;
  const result = await db.query(query);
  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, category_name AS name
    FROM public.categories
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location
    FROM public.projects p
    JOIN public.projects_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
    INSERT INTO projects_categories (category_id, project_id)
    VALUES ($1, $2);
  `;
  await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First remove all existing assignments for this project
  const deleteQuery = `
    DELETE FROM projects_categories
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  // Then add the new ones
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignments };