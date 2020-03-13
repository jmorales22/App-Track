require('dotenv').config();

const pgp = require("pg-promise")({
    query: function(e) {
        console.log('Query:', e.query);
    }
});

const options = {
    host: process.env['DB_HOST'],
    database: process.env['DB_NAME'],
    user: process.env['DB_NAME'],
    password: process.env['DB_PASSWORD']
};

const db = pgp(options);

module.exports = db;