            INSERT INTO department
                (name)
            VALUES
                ("Legal"),
                ("Software Development"),
                ("Accounting"),
                ("Treasury");
            INSERT INTO role
                (title, salary, dept_id)
            VALUES
                ("Manager", 56000, 2),
                ("Accountant", 56000, 3),
                ("Lawyer", 56000, 1),
                ("Developer", 56000, 2);

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ("Hameed", "Kazeem", 4, NULL),
                ("John", "McDonalds", 2, 1),
                ("Barbara", "Little", 2, 1),
                ("Michelle", "Dryer", 2, 1),
                ("Karen", "McFall", 3, NULL),
                ("Jak", "Ridder", 2, 1),
                ("James", "Ball", 2, 1),
                ("Kathie", "Jackson", 1, NULL),
                ("Mike", "Adams", 3, 5);
