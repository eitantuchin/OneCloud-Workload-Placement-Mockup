const mysql = require('mysql2/promise')
const db = mysql.createPool({ // changing to pool from connection allowed me to get the data in the db
    host: "127.0.0.1",
    user: "root",
    password: "Dainty27!",
    database: "CloudFit_Intern_DB"
})
module.exports = db;