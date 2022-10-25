INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finace"),
       ("Legal");

INSERT INTO role (title, salary, department_id, is_manager)
VALUES ("Sales Lead", 100000, 1, true),
       ("Salesperson", 80000, 1, false),
       ("Lead Engineer", 150000, 2, true),
       ("Software Engineer", 120000, 2, false),
       ("Account Manager", 160000, 3, true),
       ("Accountant", 125000, 3, false),
       ("Legal Team Lead", 250000, 4, true);
       ("Lawyer", 190000, 4, false);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Madeleine", "Lawrence", 1, null),
       ("Lily", "Lewis", 2, 1),
       ("Christopher", "Underwood", 3, null),
       ("Nicola", "Ince", 4, 2),
       ("Rebecca", "Gill", 5, null),
       ("Frank", "Ellison", 6, 5),
       ("Maria", "Murray", 7, null),
       ("Mary", "Short", 8, 1),
 