const pool = require("../config/connection");

const getAllDepartments = async () => {
  const result = await pool.query("SELECT * FROM department;");
  return result.rows;
};

const addDepartment = async (name) => {
  await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
};

module.exports = { getAllDepartments, addDepartment };
