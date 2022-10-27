const inquirer = require("inquirer")
const mysql = require("mysql2")
require("dotenv").config()

const cTable = require("console.table")

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

console.log(
  `     ***********************************
     *                                 *
     *        EMPLOYEE MANAGER         *
     *                                 *
     ***********************************`
)

promptUser = () => {
  inquirer
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
        showDepartments().then((department) => {
          console.table(department[0])
        })

        promptUser()
      }

      if (choices === "View All Roles") {
        showRoles().then((role) => {
          console.table(role[0])
        })

        promptUser()
      }

      if (choices === "View All Employees") {
        showEmployees().then((employee) => {
          console.table(employee[0])
        })
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

showDepartments = () => {
  return db
    .promise()
    .query("SELECT d.id, d.name AS department FROM department as d;")
}

showRoles = () => {
  return db
    .promise()
    .query(
      "SELECT r.id, r.title, d.name AS department, r.salary FROM role as r JOIN department as d ON r.department_id = d.id;"
    )
}

showEmployees = () => {
  return db
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    )
}

addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "addDep",
      message: "What would you like to do?",
      validate: (addDep) => {
        if (addDep) {
          return true
        } else {
          console.log(` Please enter a department!`)
        }
      },
    },
  ])

  return db.promise().query("")
}

// addRole = () => {
//   return db.promise().query("")
// }

// addEmployee = () => {
//   return db.promise().query("")
// }

// updateEmployee = () => {
//   return db.promise().query("")
// }

// updateManager = () => {
//   return db.promise().query("")
// }

// employeeDepartment = () => {}

// deleteDepartment = () => {}

// deleteRole = () => {}

// deleteEmployee = () => {}

// viewBudget = () => {}

// db.end()
