require('dotenv').config();
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.user_pg,
    password:process.env.password_pg,
    host:'localhost',
    port: 5432,
    database: process.env.database_pg
})

module.exports = pool;