INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finace"),
       ("Legal");

INSERT INTO role (title, salary, department_id, is_manager)
VALUES ("Sales Lead", 100000, 1, true),
       ("Salesperson", 80000, 1, true),
       ("Lead Engineer", 150000, 2, false),
       ("Software Engineer", 120000, 2, true),
       ("Account Manager", 160000, 3, false),
       ("Accountant", 125000, 3, true),
       ("Legal Team Lead", 250000, 4, false);
       ("Lawyer", 190000, 4, false);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Madeleine", "Lawrence", 1, null),
       ("Lily", "Lewis", 2, 1),
       ("Christopher", "Underwood", 3, 2),
       ("Nicola", "Ince", 3, 2),
       ("Rebecca", "Gill", 4, 1),
       ("Frank", "Ellison", 5, 5),
       ("Maria", "Murray", 5, 5),
       ("Mary", "Short", 6, 1),
       ("Oliver-Joe", "May", 7, 8),
       ("Olivia", "Tucker", 7, 8);