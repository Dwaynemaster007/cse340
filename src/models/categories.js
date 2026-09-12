import db from './db.js'; 

export async function getCategories() {
  try {
    const sql = 'SELECT * FROM categories ORDER BY category_name ASC;';
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error('getCategories error: ' + error);
    throw error;
  }
}