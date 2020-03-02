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
    password: process.env.MYSQL_PASSWORD,
    database: "cms_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // runSearch();
});


initialize();


// Display logo text, load main prompts
function initialize() {
    const logoText = logo({ name: "Primary C M S" }).render();
    console.log(logoText);
    mainOptions();
}

function mainOptions() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices:
                [

                    'View',
                    'Add',
                    'Delete',
                    'Update'

                ]
        }])
        .then(function (response) {
            switch (response.action) {
                case 'View':
                     
                case 'Add':
                     
                case 'Delete':
                     
                case 'Update':
                     
                default:
                    console.log("Error: No option selected");
            }
        });

}
