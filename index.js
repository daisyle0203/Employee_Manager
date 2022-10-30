const inquirer = require("inquirer")
const logo = require("asciiart-logo")

require("dotenv").config()

const db = require("./db/connection")

function init() {
  const logoText = logo({
    name: "Employee Manager",
    logoColor: "bold-cyan",
    borderColor: "bold-blue",
  }).render()

  console.log(logoText)

  promptUser()
}

const getTargetValue = (array) => {
  return array.map((object) => object.target)
}

const getId = (array, value) => {
  return array.filter((object) => object.target == value)[0].id
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
  const departments = await db
    .promise()
    .query("SELECT d.id, d.name AS target FROM department as d;")
  const departmentChoices = getTargetValue(departments[0])

  inquirer
    .prompt([
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
    ])
    .then((answer) => {
      const departmentId = getId(departments[0], answer.dept)
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [answer.title, parseInt(answer.salary), departmentId],
        (err, result) => {
          if (err) console.log(err)
          console.log("Added " + answer.title + " to the database!")
          showRoles()
        }
      )
    })
}

const addEmployee = async () => {
  let roles = await db.promise().query("SELECT role.id, role.title FROM role")
  roles = roles[0]
  const roleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }))

  let employees = await db.promise().query("SELECT * FROM employee")
  employees = employees[0]
  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }))
  managerChoices.unshift({ name: "None", value: null })

  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (addFirst) => {
          if (addFirst) {
            return true
          } else {
            console.log(` Please enter a first name!`)
            return false
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (addLast) => {
          if (addLast) {
            return true
          } else {
            console.log(` Please enter a last name!`)
            return false
          }
        },
      },
      {
        type: "list",
        name: "title",
        message: "What is the employee's role?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: managerChoices,
      },
    ])
    .then((answer) => {
      console.log(answer)
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [answer.firstName, answer.lastName, answer.title , answer.manager],
        (err, result) => {
          if (err) console.log(err)
          console.log(
            `Added ${answer.firstName} ${answer.lastName} to the database!`
          )
          showEmployees()
        }
      )
    })

}

const updateEmployee = async () => {
  const employees = await db.promise().query("SELECT * FROM employee;")
  const employeeChoices = employees[0].map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }))
  console.log(employeeChoices);

  let roles = await db.promise().query("SELECT role.id, role.title FROM role")
  roles = roles[0]
  const roleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }))
  console.log(roleChoices);

  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's new role?",
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      console.log(answer);
      console.log(answer);
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?;", [answer.role, answer.employee],
        (err, result) => {
          if (err) console.log(err)
          console.log(`Employee has been updated!`)
          showEmployees()
        }
      )
    })
}

init()
