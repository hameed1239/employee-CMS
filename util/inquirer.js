const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const { getAll, addDepartment, addRow, addEmployee, getRoles, updateEmployee } = require('./query');
require('console.table');


//asciiart Logo
function logoArt() {
    console.log(
        logo({
            name: 'Employee Manager',
            font: 'DOS Rebel',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'green',
        })
            .emptyLine()
            .right('version 3.7.123')
            .render()
    );
}
function promptQuestions() {// Get user operation here with inquirer
    return inquirer.prompt([
        {
            type: "list",
            name: "operation",
            message: "Select one of the following options",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "quit"
            ]
        }

    ])
}
function query(connection) {// Perform all query here
    promptQuestions()
        .then(answers => {
            switch (answers.operation) {
                case "view all departments":
                    // Display all departments
                    getAll(connection, "department").then(([rows]) => {
                        console.table(rows);
                        query(connection);
                    });
                    break;
                case "view all roles":
                    // Display all roles
                    getAll(connection, "role").then(([rows]) => {
                        console.table(rows);
                        query(connection);
                    });
                    break;
                case "view all employees":
                    // Display all employees
                    getAll(connection, "employee").then(([rows]) => {
                        console.table(rows);
                        query(connection);
                    });
                    break;
                case "add a department":
                    // get department name
                    console.log("I'm here");
                    return inquirer.prompt([
                        {
                            type: "input",
                            name: "deptName",
                            message: "Enter the new department name",
                            validate: (deptName) => {
                                if ((deptName) && deptName.length <= 30) {
                                    return true;
                                }
                                console.log("\nErr: Department name must be a string with less than 30 characters in length")
                                return false;
                            }
                        }
                    ])
                        .then(res => {
                            addDepartment(connection, res.deptName).then(([rows]) => {
                                console.table(rows);
                                query(connection);
                            })
                            .catch(err => console.log(err));
                        });
                    //retun Department name and the new ID

                    break;
                case "add a role":
                    //get role name, salary, and department
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "roleName",
                            message: "Enter a name for the new role",
                            validate: (roleName) => {
                                if (roleName && roleName.length <= 30) {
                                    return true;
                                }
                                console.log("\nErr: Enter a valid Role name with less than 30 characters in length ")
                                return false;
                            }
                        },
                        {
                            type: "number",
                            name: "salary",
                            message: "Enter a salary for the role",
                            validate: (salary) => {
                                if (salary && salary > 0) {
                                    return true;
                                }
                                console.log("\nErr: Enter a salary > 0 ")
                                return false;
                            }
                        },
                        {
                            type: "number",
                            name: "dept",
                            message: "Enter a department for the new role",
                            validate: (dept) => {
                                if (dept && dept > 0) {
                                    return true;
                                }
                                console.log("\nErr: Enter a valid department ID")
                                return false;
                            }
                        }
                    ])
                        .then(role => {
                            //Add new role
                            console.log(role);
                            addRow(connection, role).then(([rows]) => {
                                console.table(rows);
                                query(connection);
                            })
                            .catch(err => console.log(err));
                        })
                    break;
                case "add an employee":
                    //get employee's firstname, lastname, role, manager(optional)
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter employee's firstname",
                            validate: (firstName) => {
                                if (firstName && firstName.length <= 30) {
                                    return true;
                                }
                                console.log("\nErr: Enter a valid firstname with less than 30 characters in length ")
                                return false;
                            }
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter employee's lastname",
                            validate: (lastName) => {
                                if (lastName && lastName.length <= 30) {
                                    return true;
                                }
                                console.log("\nErr: Enter a valid lastname with less than 30 characters in length ")
                                return false;
                            }
                        },
                        {
                            type: "number",
                            name: "roleID",
                            message: "Enter employee's role ID",
                            validate: (roleID) => {
                                if (roleID > 0) {
                                    return true;
                                }
                                console.log("\nErr: Enter a valid role ID ")
                                return false;
                                
                            }
                        },
                        {
                            type: "number",
                            name: "managerID",
                            message: "Enter employee's manager ID (optional: press Enter if employee has no manager)",
                            validate: (managerID) => {
                                if (managerID) {
                                    if(managerID > 0){
                                        return true;
                                    }
                                    else {
                                        console.log("\nErr: Enter a valid manager ID ")
                                        return false;
                                    }
                                }
                                else{
                                    managerID = null;
                                    return true;
                                }
                                
                            }
                        }

                    ])
                    .then(employeeData =>{
                        console.log(employeeData);
                        if(isNaN(employeeData.managerID)){
                            employeeData.managerID = "NULL";
                        }
                        //console.log(employeeData);
                        addEmployee(connection, employeeData)
                        .then(([rows])=>{
                            console.table(rows);
                            query(connection);
                        })
                    })
                    break;
                case "update an employee role":
                    let employees;
                    let employeeInfo;
                    let rolesTitle;
                    let roles;
                    getAll(connection, "employee")
                    .then(([rows]) =>{
                        employeeInfo = rows;
                        employees=employeeInfo.map(employee =>`${employee.first_name} ${employee.last_name}`);
                     })
                     .catch(err =>{
                         console.log(err)
                     })
                     getRoles(connection)
                         .then(([rows]) => {
                             rolesTitle = rows.map(row => row.title);
                             roles = rows;
                             inquirer.prompt([
                                {
                                    type: "list",
                                    name: "employeeName",
                                    message: "Select one employee to change their role ",
                                    choices: employees,
                                    validate: (employeeName) => {
                                        if (employeeName.length === 1) {
                                            return true;
                                        }
                                        console.log("\nErr: Select 1 employee")
                                        return false;
                                    }
                                }
                            ])
                            .then((response)=>{
                                employeeInfo = response.employeeName.split(' ');
                                inquirer.prompt([
                                    {
                                        type: "list",
                                        name: "role",
                                        message: `Select a new role for ${response.employeeName}`,
                                        choices: rolesTitle,
                                        validate: (role) => {
                                            if (role.length = 1) {
                                                return true;
                                            }
                                            console.log("\nErr: Select one role")
                                            return false;
                                        }
                                    }])
                                    .then(response =>{
                                        roles.forEach(role =>{
                                            if (role.title === response.role){
                                                roleID = role.id;//Notice roleID is not explicitly defined
                                            }
                                        })
                                        console.log(roleID);
                                        updateEmployee(connection, employeeInfo, roleID)
                                            .then(([rows]) => {
                                                console.table(rows);
                                                query(connection)
                                            })
                                            .catch(err =>{
                                                console.log(err);
                                            })
                                    })
                                    .catch(err =>{
                                        console.log(err);
                                    })
    
                                
    
                                })
                             
                         })
                         .catch(err =>{
                            console.log(err)
                        })
                        
                        
                    break;
                case "quit":
                    connection.end();
                    break;
                default:
                    break;
            }
        })
<<<<<<< HEAD
         .then((operation) => {
            //  console.log(`${operation} line 185`);
            if (operation === "quit") {
                connection.end();
            }
             console.log("HI");
             return query(connection);
         })
        //  .then(() => {
        //      return query(connection);
        //  })
        
=======
>>>>>>> feature/tables
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log("Prompt cannot be rendered in the current environment");
            } else {
                // Something else when wrong
                console.log (error);
            }
        });

}

module.exports = { logoArt, query };