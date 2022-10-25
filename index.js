const inquirer = require("inquirer")
const mysql = require("mysql2")
const cTable = require("console.table")
require("dotenv").config()

const PORT = process.env.PORT || 3001

const db = mysql.createConnection({
  host: PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})
console.log(
  `***********************************
   *                                 *
   *        EMPLOYEE MANAGER         *
   *                                 *
   ***********************************`
)

promptUser()

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
          "Update An Employee Manager",
          "View Employees By Department",
          "Delete A Department",
          "Delete A Role",
          "Delete An Employee",
          "View Department Budgets",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers

      if (choices === "View All Departments") {
        showDepartments()
      }

      if (choices === "View All Roles") {
        showRoles()
      }

      if (choices === "View All Employees") {
        showEmployees()
      }

      if (choices === "Add A Department") {
        addDepartment()
      }

      if (choices === "Add A Role") {
        addRole()
      }

      if (choices === "Add An Employee") {
        addEmployee()
      }

      if (choices === "Update An Employee Role") {
        updateEmployee()
      }

      if (choices === "Update An Employee Manager") {
        updateManager()
      }

      if (choices === "View Employees By Department") {
        employeeDepartment()
      }

      if (choices === "Delete A Department") {
        deleteDepartment()
      }

      if (choices === "Delete A Role") {
        deleteRole()
      }

      if (choices === "Delete An Employee") {
        deleteEmployee()
      }

      if (choices === "View Department Budgets") {
        viewBudget()
      }

      if (choices === "Quit") {
        db.end()
      }
    })
}

// showDepartments() => {}
// showRoles() => {}
// showEmployees() => {}
// addDepartment() => {}
// addRole() => {}
// addEmployee() => {}
// updateEmployee() => {}
// updateManager() => {}
// employeeDepartment() => {}
// deleteDepartment() => {}
// deleteRole() => {}
// deleteEmployee() => {}
// viewBudget() => {}
// db.end()
