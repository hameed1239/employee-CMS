
require('console.table');

function getAll(connection, table) {//get all, can be used to grab all data in any table.
    return connection.promise().query(`SELECT * FROM ${table}`);
}

function addDepartment(connection, deptName) {//Add a new Department
    return connection.promise().query(`INSERT INTO department (name) VALUES ("${deptName}")`);
}

function addRow(connection, role) {//Add a new role
    return connection.promise().query(`INSERT INTO role (title, salary, dept_id) VALUES ("${role.roleName}", ${role.salary}, ${role.dept})`);
}

function addEmployee(connection, employee) {//Add a new employee
    return connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", ${employee.roleID}, ${employee.managerID})`);
}
function getManagers(connection){//get Managers from employees
    return connection.promise().query(`SELECT title FROM role WHERE manager_id is null`)
}
function updateEmployee(connection, employee, roleID) {//Update employee role

    return connection.promise().query(`UPDATE employee SET employee.role_id = ${roleID} WHERE employee.first_name = "${employee[0]}" AND employee.last_name = "${employee[1]}"`);
}
function getRoles(connection){
    return connection.promise().query(`SELECT * FROM role`)
}

module.exports = { getAll, addDepartment, addRow, addEmployee,getManagers, updateEmployee, getRoles };