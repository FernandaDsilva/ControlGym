const { Pool } = require("pg")

module.exports = new Pool ({
    user:'postgres',
    password:'pass123',
    host: 'localhost',
    port: 5432,
    database:"gymmanager"
})