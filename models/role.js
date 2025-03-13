const pool = require("../config/connection");

const getAllRoles = async () => {
  const result = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id;
  `);
  return result.rows;
};

const addRole = async (title, salary, department_id) => {
  await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
};

module.exports = { getAllRoles, addRole };
