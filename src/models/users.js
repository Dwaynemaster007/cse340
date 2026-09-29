import db from './db.js';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
    INSERT INTO users (name, email, password_hash, role_id) 
    VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
    RETURNING user_id
  `;
    const queryParams = [name, email, passwordHash, default_role];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

export { createUser };