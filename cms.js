var mysql = require("mysql");
var inquirer = require("inquirer");
const logo = require("asciiart-logo");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password", //process.env.MYSQL_PASSWORD,
    database: "cms_DB"
});

connection.connect(function (err) {
    if (err) throw err;
   
});
 

initialize();
 

// Display logo text, load main prompts
function initialize() {
    const logoText = logo({ name: "Primary C M S" }).render();
    console.log(logoText);
    mainOptions();
}
//select the main action for to do
function mainOptions() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View",
        "Add",
        "Delete",        
        "Update"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {

      case "View":
        viewChoice();
        break;

      case "Add":        
        addChoice();
        break;

      case "delete":
      
        break;

      case "Update":
      
        break;

 
      }
    });
    
}



/**function for view all data */
function viewChoice() {
    inquirer.prompt([{
        type: 'list',
        name: 'viewType',
        message: 'What would you like to view?',
        choices:
            [
                'All Employees',
                'All Employees By Department',
                'All Employees By Manager'
            ]
    }])
        .then(function (response) {
            switch (response.viewType) {
                case 'All Employees':
                    allEmployees(true);
                    break;
                case 'All Employees By Department':
                   
                    break;
                case 'All Employees By Manager':
                   
                    break;
                default:
                    console.log("Error: No option selected");
            }
        });
}


function allEmployees(runInit, cb) {
    connection.query(
        "SELECT e.id 'ID', e.first_name 'First Name', e.last_name 'Last name', deparment.name 'Department', role.title 'Role', role.salary 'Salary', CONCAT(manag.first_name, ' ', manag.last_name) AS 'Manager' FROM employee AS e left join employee AS manag ON e.manager_id = manag.id INNER JOIN role ON e.role_id = role.id INNER JOIN deparment ON role.department_id = deparment.id ORDER BY id;",
        function (err, result) {
            if (err) throw err;
            console.table(result);
            if (runInit === false) {
                console.log("\n");
                return cb();
            } else {
                mainOptions()
            }
        });
}

/**function for view all data */








//**functions for add main prompt */
function addChoice() {
    inquirer.prompt([{
        type: 'list',
        name: 'addType',
        message: 'What would you like to add?',
        choices:
            [
                'Employee',
                'Department',
                'Role'
            ]
    }])
        .then(function (response) {
            switch (response.addType) {
                case 'Employee':
                  addEmployee();
                    break;
                case 'Department':
                    addDepartment();   
                    break;
                case 'Role':
                    addRole();
                    break;
                default:
                    console.log("Error: No option selected");
            }
        });
}




function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the role's name?",
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the role's salary?",
        },
        {
            type: 'input',
            name: 'department_id',
            message: "What is the role's department?",
        }
    ])
        .then(function (response) {
            connection.query(
                "INSERT INTO role SET ?;",
                [response],
                function (err, result) {
                    if (err) throw err;
                    console.log("Role added successfully")
                    mainOptions() 
                });
        }
        );
}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the department name?",
        }
    ])
        .then(function (response) {
            connection.query(
                "INSERT INTO deparment SET ?;",
                [response],
                function (err, result) {
                    if (err) throw err;
                    console.log("Department added successfully")
                    mainOptions() 
                });
        }
        );
}



function addEmployee(array) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's role ID?",
            // choices: array
            //this needs to be dynamic
            // [
            //     1,
            //     2,
            //     3,
            //     4
            // ]
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            //this needs to be dynamic and a list
        },
    ])
        .then(function (response) {
            //hacer una funcion para validar que el manager id no sea empty
            connection.query(
                "INSERT INTO employee SET ?;",
                [response],
                function (err, result) {
                    if (err) throw err;
                    console.log("Employee added successfully")
                    mainOptions()
                });
        }
        );
}

//**functions for add main prompt */




