const inquirer = require("inquirer");

const mainMenuPrompt = {
  type: "list",
  name: "action",
  message: "What would you like to do?",
  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Quit"
  ]
};


const addDepartmentPrompt = {
  type: "input",
  name: "departmentName",
  message: "Enter the name of the department:"
};


const addRolePrompt = (departments) => [
  {
    type: "input",
    name: "roleTitle",
    message: "Enter the title of the role:"
  },
  {
    type: "input",
    name: "roleSalary",
    message: "Enter the salary for the role:"
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "Select the department for the role:",
    choices: departments
  }
];


const addEmployeePrompt = (roles, employees) => [
  {
    type: "input",
    name: "firstName",
    message: "Enter the employee's first name:"
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter the employee's last name:"
  },
  {
    type: "list",
    name: "role",
    message: "Select the role for the employee:",
    choices: roles
  },
  {
    type: "list",
    name: "manager",
    message: "Select the employee's manager:",
    choices: employees
  }
];


const updateEmployeeRolePrompt = (employees, roles) => [
  {
    type: "list",
    name: "employee",
    message: "Select an employee to update:",
    choices: employees
  },
  {
    type: "list",
    name: "newRole",
    message: "Select the new role for the employee:",
    choices: roles
  }
];

module.exports = {
  mainMenuPrompt,
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeeRolePrompt
};
