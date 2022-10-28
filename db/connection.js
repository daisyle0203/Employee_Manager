const mysql = require("mysql2")
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

db.connect(function (err) {
  if (err) throw err
})

module.exports = db
