CREATE DATABASE employees_db;
USE employees_db;
CREATE TABLE department
(
    id INTEGER
    AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR
    (30) NOT NULL 
);
    CREATE TABLE role
    (
        id INTEGER
        AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR
        (30) NOT NULL,
salary DECIMAL,
dept_id INTEGER,
FOREIGN KEY
        (dept_id) REFERENCES department
        (id) ON
        DELETE CASCADE 
);
        CREATE TABLE employee
        (
            id INTEGER
            AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR
            (30) NOT NULL,
last_name VARCHAR
            (30) NOT NULL,
role_id INTEGER,
FOREIGN KEY
            (role_id) REFERENCES role
            (id) ON
            DELETE CASCADE,
manager_id INTEGER UNSIGNED
            );

            INSERT INTO department
                (name)
            VALUES
                ("Legal"),
                ("Software Development"),
                ("Accounting");

            SELECT *
            FROM department;
            SELECT *
            FROM role;
            INSERT INTO role
                (title, salary, dept_id)
            VALUES
                ("Manager", 56000, 2),
                ("Accountant", 56000, 3),
                ("Lawyer", 56000, 1);

            INSERT INTO role
                (title, salary, dept_id)
            VALUES
                ("Developer", 56000, 2);

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Hameed", "Kazeem", 4, NULL),
                ("Mike", "Adams", 3, 1);

            SELECT *
            FROM employee;