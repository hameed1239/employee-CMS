
const cTable = require('console.table');

function getAll(connection, table) {
    connection.query(`SELECT * FROM ${table}`, function (err, res) {
        if (err) throw err;
         console.table(res);
    });
    // return (res);
}

function addDepartment(connection, deptName) {
    connection.query(`INSERT INTO department (name) VALUES ("${deptName}")`, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}
module.exports = { getAll, addDepartment };