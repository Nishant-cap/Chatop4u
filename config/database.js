const { createPool } = require("mysql");

const pool = createPool ({
    port: process.env.DB_PORT,
    host: "localhost",
    user: "root",
    password: "Sumit@98",
    database: "test",
    connectionLimit:10
});

module.exports = pool;