const mysql = require("mysql2")
const cTable = require("console.table")
const logo = require("asciiart-logo")
require("dotenv").config()

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const logoText = logo({
  name: "Employee Manager",
  logoColor: "bold-cyan",
  borderColor: "bold-blue",
}).render()

db.connect(function (err) {
  if (err) throw err
})

module.exports = { db,logoText }
