const inquirer = require("inquirer")

require("dotenv").config()

const db = require("./db/connection")

const getTargetValue = (array)=>{
  return array.map(object=>object.target)
}

const getId = (array, value)=>{
  return array.filter(object => object.target === value)[0].id
}


const promptUser = () => {
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

const showDepartments = () => {
  return db
    .promise()
    .query("SELECT d.id, d.name AS department FROM department as d;")
    .then((department) => {
      console.table(department[0])
      promptUser()
    })
}

const showRoles = () => {
  return db
    .promise()
    .query(
      "SELECT r.id, r.title, d.name AS department, r.salary FROM role as r JOIN department as d ON r.department_id = d.id ORDER BY r.id;"
    )
    .then((role) => {
      console.table(role[0])
      promptUser()
    })
}

const showEmployees = () => {
  return db
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    )
    .then((employee) => {
      console.table(employee[0])
      promptUser()
    })
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What department would you like to add?",
        validate: (addDep) => {
          if (addDep) {
            return true
          } else {
            console.log(` Please enter a department!`)
            return false
          }
        },
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.dept,
        (err, result) => {
          if (err) console.log(err)
          console.log("Added " + answer.dept + " to the database!")
          showDepartments()
        }
      )
    })
}

const addRole = async () => { 
  let departments = await db.promise().query("SELECT d.id, d.name AS target FROM department as d;")
  let departmentChoices = getTargetValue(departments[0])
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What role would you like to add?",
      validate: (addRole) => {
        if (addRole) {
          return true
        } else {
          console.log(` Please enter a role!`)
          return false
        }
      },
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role?",
      validate: (addSalary) => {
        if (parseInt(addSalary)) {
          return true
        } else {
          console.log(` Please enter a salary!`)
          return false
        }
      },
    },
    {
      type: "list",
      name: "dept",
      message: "What department does the role belong to?",
      choices: departmentChoices,
    },
  ]).then((answer) => {

    console.log(answer)
    let departmentId = getId(departments[0], answer.dept)
    console.log(departmentId)
    db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
      [answer.title, parseInt(answer.salary), departmentId],
      (err, result) => {
        if (err) console.log(err)
        console.log("Added " + answer.title + " to the database!")
        showDepartments()
      }
    )
  })

}

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
promptUser()
