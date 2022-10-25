const inquirer = require("inquirer")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3001

const db = mysql.createConnection(
  {
    host: PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the database.`)
)

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
