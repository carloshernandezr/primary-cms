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
  password: "password",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
 // runSearch();
});


initialize();


// Display logo text, load main prompts
function initialize() {
    const logoText = logo({ name: "Primary C M S" }).render();
    console.log(logoText);
 
}