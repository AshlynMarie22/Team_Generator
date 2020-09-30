const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const mainArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
promptInfo();
function promptInfo(userInputOne){
    inquirer.prompt([
       { name: "employeeName",
        type: "input",
        message: "What is the employee's name?"
       },
       {
           name: "employeeRole",
           type: "list",
           messgae: "What is the employee's role?",
           choices: ["Manager", "Engineer", "Intern"]
       },
       {
           name: "employeeEmail",
           type: "input",
           message: "What is the employee's email?"
       },
       {
           name: "employeeId",
           type: "input",
           message: "What is the employee's id?"
       }

    ]).then(function(res){
        specificPrompt(res);
    }).catch(function(err){
        if(err) throw err;
        console.log("Only basic employee info logged")
    })
}
function specificPrompt(userInputTwo){
    if(userInputTwo.employeeRole === "Intern"){
        inquirer.prompt([
            {
                name: "school",
                type: "input",
                message: "What school did the employee attend?"
            }
        ]).then(function(specificResponse){
            const intern = new Intern(userInputTwo.employeeName, userInputTwo.employeeEmail, userInputTwo.employeeId, specificResponse.school)
            mainArray.push(intern);
            endPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    }else if(userInputTwo.employeeRole === "Engineer"){
        inquirer.prompt([
            {
                name: "github",
                type: "input",
                message: "What is the employees's GitHub username?"
            }
        ]).then(function(specificResponse){
            const engineer = new Engineer(userInputTwo.employeeName, userInputTwo.employeeEmail, userInputTwo.employeeId, specificResponse.github)
            mainArray.push(engineer);
            endPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    }else if(userInputTwo.employeeRole === "Manager"){
        inquirer.prompt([
            {
                name: "officeNumber",
                type: "input",
                message: "What is the employees's office number?"
            }
        ]).then(function(specificResponse){
            const manager = new Manager(userInputTwo.employeeName, userInputTwo.employeeEmail, userInputTwo.employeeId, specificResponse.officeNumber)
            mainArray.push(manager);
            endPrompt();
        }).catch(function(err){
            if(err) throw err
        })
    }
    }
    function endPrompt(){
        inquirer.prompt([
            {
                name:"end",
                type: "confirm",
                message:"Are you done adding employees?"
            }
        ]).then(function(res){
            if(res.end){
                const newEmployee = render(mainArray);
                fs.writeFile(outputPath, newEmployee, function(err){
                    if(err) throw err;
                })
            }else{
                promptInfo();
            }
        })
    }

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
