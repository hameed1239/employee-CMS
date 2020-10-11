const inquirer = require('inquirer');

inquirer.prompt([
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
            "update an employee role"
        ]
    }

])
    .then(answers => {
        // Use user feedback for... whatever!!
        const operation = answers.operation;
        // console.log(operation);
        switch (operation) {
            case "view all departments":
                // Display all departments

                break;
            case "view all roles":
                // Display all roles

                break;
            case "view all employees":
                // Display all employees
                break;
            case "add a department":
                // get department name
                inquirer.prompt([
                    {
                        type: "input",
                        name: "deptName",
                        message: "Enter the new department name",
                        validate: (deptName) => {
                            if ((deptName) && deptName.length <= 30) {
                                return true;
                            }
                            console.log ("\nErr: Department name must be a string with less than 30 characters in length")
                            return false;
                        }
                    }
                ])
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
                        type: "input",
                        name: "dept",
                        message: "Enter a department for the new role",
                        validate: (dept) => {
                            if (dept && dept.length <= 30) {
                                return true;
                            }
                            console.log("\nErr: Enter a valid department with less than 30 characters in length ")
                            return false;
                        }
                    }
                ])
                    .then(role => {
                        //Add new role
                        console.log(role);
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
                        type: "input",
                        name: "managerID",
                        message: "Enter employee's manager ID (optional: press Enter if no employee has no manager",
                        validate: (managerID) => {
                            if (managerID > 0) {
                                return true;
                            }
                            console.log("\nErr: Enter a valid manager ID ")
                            return false;
                        }
                    }

                ])
                break;
            case "update an employee role":
                
                break;
        
            default:
                break;
        }
    })
    .catch(error => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else when wrong
        }
    });