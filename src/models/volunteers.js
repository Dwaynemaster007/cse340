import db from './db.js';

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO project_volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
    RETURNING user_id, project_id
  `;
  const result = await db.query(query, [userId, projectId]);
  return result.rows[0] || null;
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM project_volunteers
    WHERE user_id = $1 AND project_id = $2
  `;
  await db.query(query, [userId, projectId]);
};

const isUserVolunteering = async (userId, projectId) => {
  const query = `
    SELECT 1 FROM project_volunteers
    WHERE user_id = $1 AND project_id = $2
  `;
  const result = await db.query(query, [userId, projectId]);
  return result.rows.length > 0;
};

const getProjectsByUserId = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      o.name AS organization_name
    FROM projects p
    JOIN project_volunteers pv ON p.project_id = pv.project_id
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE pv.user_id = $1
    ORDER BY p.date ASC
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

export {
  addVolunteer,
  removeVolunteer,
  isUserVolunteering,
  getProjectsByUserId
};