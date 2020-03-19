DROP DATABASE IF EXISTS cms_DB;
CREATE database cms_DB;

USE cms_DB;

CREATE TABLE deparment
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE role 
(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,    
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_deparment FOREIGN KEY (department_id) REFERENCES deparment(id) ON DELETE CASCADE
     
);

 
CREATE TABLE employee
(
    id INT NOT NULL AUTO_INCREMENT,
    first_name   VARCHAR(30) NOT NULL,    
    last_name    VARCHAR(30) NULL,
    role_id      INT NOT NULL,
    manager_id   INT UNSIGNED,
    PRIMARY KEY  (id),
  
   CONSTRAINT fk_manager FOREIGN KEY  (manager_id)  REFERENCES employee(id) ON DELETE SET NULL,
   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE

     
);

INSERT INTO deparment(name) VALUES ('Software');
INSERT INTO deparment (name) VALUES ('Sales');
INSERT INTO role (title, salary, department_id) VALUES ('Engineer',25210, '1');
INSERT INTO role (title, salary, department_id) VALUES ('Salesman',11050, '2');
INSERT INTO employee(first_name, last_name, role_id) VALUES ('Carlos', 'Hernandez', '1');
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('Adriana', 'Hernandez', '1','1');
