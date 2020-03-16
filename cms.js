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
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View",
                "Add",
                "Delete",
                "Update"
            ]
        })
        .then(function (answer) {
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

                    allEmployeeByDeparment();
                    break;
                case 'All Employees By Manager':
                    allEmployeeByManager();
                    break;
                default:
                    console.log("Error: No option selected");
            }
        });
}


function allEmployeeByDeparment() {

    connection.query("select d.name as name, d.id as id, r.department_id, e.role_id, r.id from deparment as d INNER JOIN role as r ON d.id = r.department_id INNER JOIN employee as e ON e.role_id = r.id  ", function (err, data) {

        var ebdChoices = data.map(ebd => {

            return {
                name: ebd.name,
                value: ebd.id
            }
        })
        if (ebdChoices == "") {
            console.log("\nThere are no deparment assigned\nPlease select another option.\n")
            return mainOptions();
        }
 //  console.log(ebdChoices)

        inquirer.prompt([{
            type: 'list',
            name: 'eByd',
            message: "View all employees in which department?",
            choices: ebdChoices
        }])
            .then(function (response) {
             
                connection.query(
             
                    "select f.first_name, f.last_name, CONCAT(e.first_name, ' ', e.last_name) AS 'Manager'  from employee as e INNER JOIN employee as f ON e.id = f.manager_id   where f.manager_id = ?",
                     
                [response.eByd],
                  
                    function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        console.table("\n");
                        mainOptions();
                    });
            }
            );
    })
}//end allemployess


//*


function allEmployeeByManager() {

    connection.query("SELECT DISTINCT e.id AS fd, f.manager_id AS managerID,  CONCAT(e.first_name, ' ', e.last_name) AS 'Manager' FROM employee AS e INNER JOIN employee AS f ON f.manager_id = e.id   ", function (err, data) {

        var mngChoices = data.map(mng => {

            return {
                name: mng.Manager,
                value: mng.managerID
            }
        })
        if (mngChoices == "") {
            console.log("\nThere are no managers assigned\nPlease select another option.\n")
            return mainOptions();
        }
   

        inquirer.prompt([{
            type: 'list',
            name: 'depart',
            message: "View all employees in which department?",
            choices: mngChoices
        }])
            .then(function (response) {
             
                connection.query(
             
                    "select f.first_name, f.last_name, CONCAT(e.first_name, ' ', e.last_name) AS 'Manager'  from employee as e INNER JOIN employee as f ON e.id = f.manager_id   where f.manager_id = ?",
                     
                [response.depart],
                  
                    function (err, result) {
                        if (err) throw err;
                        console.table(result);
                        console.table("\n");
                        mainOptions();
                    });
            }
            );
    })
}//end allemployess




//Functions to make some questions dynamically show choices
function distinctDepartment(cb) {
    let deptArray = [];
    connection.query(
        "SELECT DISTINCT role FROM department;",
        function (err, result) {
            if (err) throw err;
            result.forEach(element => deptArray.push(element.role));
            cb(deptArray)
        }
    )
}

function allDepartmentEmployees(array) {
    inquirer.prompt([{
        type: 'list',
        name: 'department',
        message: "View all employees in which department?",
        choices: array
    }])
        .then(function (response) {
            connection.query(
                "SELECT e.id 'ID', e.first_name 'First Name', e.last_name 'Last name', department.name 'Department', role.title 'Position', role.salary 'Salary', CONCAT(f.first_name, ' ', f.last_name) AS 'Manager' FROM employee AS e left join employee AS f on e.manager_id = f.id INNER JOIN role ON e.role_id = role.id INNER JOIN deparment ON role.department_id = deparment.id WHERE deparment.name = ? ORDER BY id;",
                [response.department],
                function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    init();
                });
        }
        );
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

    // get all role
    connection.query("select * from deparment", function (err, data) {
        // console.log(data)
        //   var array=[]
        //  for (var i =0; i< data.length; i++){
        //   array.push({name:array[i].name, value: array[i].id})
        //  }
        var deptChoices = data.map(dep => {
            console.log("dep:", dep)
            return {
                name: dep.name,
                value: dep.id
            }
        })
        console.log(deptChoices)



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
                type: 'list',
                name: 'department_id',
                message: "What is the role's department?",
                choices: deptChoices
            }
        ])
            .then(function (response) {
                console.log(response)
                connection.query(
                    "INSERT INTO role SET ?;",
                    response,
                    function (err, result) {
                        if (err) throw err;
                        console.log("Role added successfully")
                        mainOptions()
                    });
            }
            );
    })
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


    connection.query("select * from role", function (err, data) {
        // console.log(data)
        //   var array=[]
        //  for (var i =0; i< data.length; i++){
        //   array.push({name:array[i].name, value: array[i].id})
        //  }
        var roleChoices = data.map(rol => {

            return {
                name: rol.title,
                value: rol.id
            }
        })



        connection.query("select * from employee", function (err, data) {
            // console.log(data)
            //   var array=[]
            //  for (var i =0; i< data.length; i++){
            //   array.push({name:array[i].name, value: array[i].id})
            //  }
            var managerChoices = data.map(manager => {

                return {
                    name: manager.first_name + " " + manager.last_name,
                    value: manager.id
                }
            })

            managerChoices.push({ name: "No Manager", value: null })



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
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employee's role ID?",
                    choices: roleChoices,

                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: managerChoices

                },
            ])
                .then(function (response) {
                    //hacer una funcion para validar que el manager id no sea empty
                    connection.query(
                        "INSERT INTO employee SET ?;",
                        response,
                        function (err, result) {
                            if (err) throw err;
                            console.log("Employee added successfully")
                            mainOptions()
                        });
                })

        })
    })
}

//**functions for add main prompt */




