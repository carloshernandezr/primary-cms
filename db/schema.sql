DROP DATABASE IF EXISTS cms_DB;
CREATE database cms_DB;

USE cms_DB;

CREATE TABLE deparment
(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE role 
(
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,    
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES deparment(id)
     
);

 
CREATE TABLE employee
(
    id INT NOT NULL,
    first_name   VARCHAR(30) NOT NULL,    
    last_name    VARCHAR(30) NULL,
    role_id      INT NOT NULL,
    manager_id   INT NULL,
    PRIMARY KEY  (id),
    FOREIGN KEY  (role_id)  REFERENCES role(id),
    FOREIGN KEY  (manager_id)  REFERENCES employee(id)
);