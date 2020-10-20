
require('console.table');

function getAll(connection, table) {
    return connection.promise().query(`SELECT department.id, department.name FROM ${table}`);
}

function addDepartment(connection, deptName) {
    connection.query(`INSERT INTO department (name) VALUES ("${deptName}")`, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}
module.exports = { getAll, addDepartment };