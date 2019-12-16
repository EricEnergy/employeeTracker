
USE employee_db;

INSERT INTO department (department_name) values ("Tech");
INSERT INTO department (department_name) values ("developer");
INSERT INTO department (department_name) values ("Sales");
INSERT INTO department (department_name) values ("Finance");

INSERT INTO role (title, salary, department_id, manager_id) values ("Lead Technician", 90000.00, 1, 1);
INSERT INTO role (title, salary, department_id, manager_id) values ("Technician", 65000.00, 1, NULL);
INSERT INTO role (title, salary, department_id, manager_id) values ("Lead Software Developer", 120000.00, 2, 2);
INSERT INTO role (title, salary, department_id, manager_id) values ("Software Developer", 125000.00, 2, NULL);
INSERT INTO role (title, salary, department_id, manager_id) values ("Sales Lead", 100000.00, 3, 3);
INSERT INTO role (title, salary, department_id, manager_id) values ("Salesperson", 80000.00, 3, NULL);
INSERT INTO role (title, salary, department_id, manager_id) values ("CPA", 190000.00, 4, 4);
INSERT INTO role (title, salary, department_id, manager_id) values ("Accountant", 65000.00, 4, NULL);


INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Jeff', 'Ball', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Brian', 'Birch', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Josh', 'Wadel', 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Tues', 'Grandolf', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Burt', 'Harvey', 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Jacob', 'Kraft', 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Greg', 'Stocker', 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Eric', 'Simmons', 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Zack', 'Hughes', 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Scott', 'Sheppard', 7, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Pam', 'Darby', 8, NULL);




