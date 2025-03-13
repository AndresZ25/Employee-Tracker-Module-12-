const inquirer = require("inquirer");
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require("./db/queries");
const { mainMenuPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeeRolePrompt } = require("./utils/prompts");


const mainMenu = async () => {
  const { action } = await inquirer.prompt(mainMenuPrompt);

  switch (action) {
    case "View all departments":
      const departments = await getDepartments();
      console.table(departments);
      mainMenu();
      break;

    case "View all roles":
      const roles = await getRoles();
      console.table(roles);
      mainMenu();
      break;

    
case "View all employees":
  const employees = await getEmployees();
  console.table(employees);  
  mainMenu();
  break;



case "Add a department":
  const { departmentName } = await inquirer.prompt(addDepartmentPrompt);
  await addDepartment(departmentName);
  console.log(`Department ${departmentName} added.`);
  mainMenu();
  break;


case "Add a role":
  const departmentsForRole = await getDepartments();
  const departmentChoices = departmentsForRole.map(department => department.name);
  const rolePrompts = addRolePrompt(departmentChoices);
  const roleDetails = await inquirer.prompt(rolePrompts);
  await addRole(roleDetails.roleTitle, roleDetails.roleSalary, departmentChoices.indexOf(roleDetails.roleDepartment) + 1);
  console.log(`Role ${roleDetails.roleTitle} added.`);
  mainMenu();
  break;


case "Add an employee":
  const rolesForEmployee = await getRoles();
  const roleChoices = rolesForEmployee.map(role => role.title);
  const employeesForManager = await getEmployees();
  const employeeChoices = employeesForManager.map(employee => `${employee.first_name} ${employee.last_name}`);
  const employeePrompts = addEmployeePrompt(roleChoices, employeeChoices);
  const employeeDetails = await inquirer.prompt(employeePrompts);
  await addEmployee(employeeDetails.firstName, employeeDetails.lastName, roleChoices.indexOf(employeeDetails.role) + 1, employeeChoices.indexOf(employeeDetails.manager) + 1);
  console.log(`Employee ${employeeDetails.firstName} ${employeeDetails.lastName} added.`);
  mainMenu();
  break;


case "Update an employee role":
  const employeesForUpdate = await getEmployees();
  const updateEmployeeChoices = employeesForUpdate.map(employee => `${employee.first_name} ${employee.last_name}`);
  const updateRoleChoices = await getRoles();
  const updateRoleChoicesFormatted = updateRoleChoices.map(role => role.title);
  const updatePrompts = updateEmployeeRolePrompt(updateEmployeeChoices, updateRoleChoicesFormatted);
  const updateDetails = await inquirer.prompt(updatePrompts);
  await updateEmployeeRole(updateEmployeeChoices.indexOf(updateDetails.employee) + 1, updateRoleChoicesFormatted.indexOf(updateDetails.newRole) + 1);
  console.log(`Employee's role updated.`);
  mainMenu();
  break;


    case "Quit":
      console.log("Exiting application...");
      process.exit();
      break;
  }
};

mainMenu();
