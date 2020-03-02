// var mysql = require("mysql");
// var inquirer = require("inquirer");
// const logo = require("asciiart-logo");


// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: process.env.MYSQL_PASSWORD,
//     database: "cms_DB"
// });

// connection.connect(function (err) {
//     if (err) throw err;
   
// });
//  runSearch();

// function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: [
//           "Find songs by artist",
//           "Find all artists who appear more than once",
//           "Find data within a specific range",
//           "Search for a specific song",
//           "Find artists with a top song and top album in the same year"
//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//         case "Find songs by artist":
   
//           break;
  
//         case "Find all artists who appear more than once":
    
//           break;
  
//         case "Find data within a specific range":
       
//           break;
  
//         case "Search for a specific song":
   
//           break;
  
//         case "Find artists with a top song and top album in the same year":
       
//           break;
//         }
//       });
//   }


// // initialize();
// // mainOptions();

// // // Display logo text, load main prompts
// // function initialize() {
// //     const logoText = logo({ name: "Primary C M S" }).render();
// //     console.log(logoText);
// //    // mainOptions();
// // }
// //select the main action for to do
// function mainOptions() {
    
//     // inquirer.prompt(
//     //     {
//     //         type: "list",
//     //         name: "choice",
//     //         message: "What would you like to do?",
//     //         choices:
//     //             [

//     //                 'View',
//     //                 'Add',
//     //                 'Delete',
//     //                 'Update'

//     //             ]
//     //     })
//     //     .then(function (response) {
//     //         switch (response.action) {
//     //             case 'View':

                                      
//     //             case 'Add':
//     //                 addChoice();
                                        
//     //             case 'Delete':

                                    
//     //             case 'Update':

                                   
//     //             // default:
//     //             //     console.log("Error: No option selected");
//     //         }
//     //     });

     
      

// }


// function addChoice() {
//     inquirer.prompt([{
//         type: 'list',
//         name: 'addType',
//         message: 'What would you like to add?',
//         choices:
//             [
//                 'Employee',
//                 'Department',
//                 'Position'
//             ]
//     }])
//         .then(function (response) {
//             switch (response.addType) {
//                 case 'Employee':
                   
//                     break;
//                 case 'Department':
                   
//                     break;
//                 case 'Position':
              
//                     break;
//                 default:
//                     console.log("Error: No option selected");
//             }
//         });
// }


// function addEmployee(array) {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'first_name',
//             message: "What is the employee's first name?",
//         },
//         {
//             type: 'input',
//             name: 'last_name',
//             message: "What is the employee's last name?",
//         },
//         {
//             type: 'input',
//             name: 'position_id',
//             message: "What is the employee's role ID?",
//             // choices: array
//             //this needs to be dynamic
//             // [
//             //     1,
//             //     2,
//             //     3,
//             //     4
//             // ]
//         },
//         {
//             type: 'input',
//             name: 'manager_id',
//             message: "Who is the employee's manager?",
//             //this needs to be dynamic and a list
//         },
//     ])
//         .then(function (response) {
//             connection.query(
//                 "INSERT INTO employee SET ?;",
//                 [response],
//                 function (err, result) {
//                     if (err) throw err;
//                     initialize();
//                 });
//         }
//         );
// }

var inquirer = require("inquirer");
runSearch();
function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Find songs by artist",
          "Find all artists who appear more than once",
          "Find data within a specific range",
          "Search for a specific song",
          "Find artists with a top song and top album in the same year"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Find songs by artist":
        
          break;
  
        case "Find all artists who appear more than once":
 
          break;
  
        case "Find data within a specific range":
       
          break;
  
        case "Search for a specific song":
         
          break;
  
        case "Find artists with a top song and top album in the same year":
        
          break;
        }
      });
  }