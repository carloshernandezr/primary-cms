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
                
                    break;
                default:
                    console.log("Error: No option selected");
            }
        });
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
                    initialize();  
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
                    initialize();
                });
        }
        );
}






