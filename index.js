const { logoArt, query } = require('./util/inquirer');
const mysql = require('mysql2');

// Creates the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'MayowaFathiat@93',
    database: 'employees_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});



afterConnection = () => {
    logoArt();
    query(connection);
};

