const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = []

async function employeePick() {
 function employeeGen() {
       
    
     inquirer.prompt([
      {type: "confirm",
      message: "Add another employee?",
      name: "addMore"
      },
      {
        type: "input",
        message: "Enter employee name",
        name: "employeeName",
        when: (answers) => answers.addMore=== true,
     },
     {  type: "input",
        message: "What is your employee number?",
        name: "employeeId",
        when: (answers) => answers.addMore=== true,
     },
     {  type: "email",
        message: "Please enter your employee email",
        name:"employeeEmail",
        when: (answers) => answers.addMore=== true,
     },
     {  type: "list",
        message: "What is your role?",
        name:"employeeRole",
        choices: ["Engineer", "Intern", "Manager", "quit"],
        when: (answers) => answers.addMore=== true,
     }]).then(async function(answers) {
      const { employeeRole, employeeEmail, employeeId, employeeName, addMore} = answers
      const id = employeeId
      const role = employeeRole
      const email = employeeEmail
      const name = employeeName 
      const add = addMore 
      console.log(add);

         if (add) {
           
   
   
               switch (role) {
                  case "Intern":
                     inquirer.prompt([{
                        type: 'input',
                        message: 'What school did you attend?',
                        name: 'school'
                     }])
                     .then(function({school}){
                       
                        const newIntern = new Intern(id, name, email, school)
                        employees.push(newIntern)
                        console.log('-------newIntern--------\n', newIntern, '\n---------newIntern---------')
                        employeeGen()

                     })
                     break;
   
                  case "Engineer":
                     inquirer.prompt([{
                        type: 'input',
                        message: 'What is your GitHub name?',
                        name: 'github'
                     }])
                     .then(function({github}){
                       
                        const newEngineer= new Engineer(id, name, email, github)
                        employees.push(newEngineer)
                        console.log('-------newIntern--------\n', newEngineer, '\n---------newIntern---------')
                        employeeGen()
                     })
                     break;
   
                  case "Manager":
                     inquirer.prompt([{
                        type: 'input',
                        message: 'What is your office number?',
                        name: 'officeNumber'
                     }])
                     .then(function({officeNumber}){
                       
                        const newManager= new Manager(id, name, email, officeNumber)
                        employees.push(newManager)
                        console.log('-------newIntern--------\n', newManager, '\n---------newIntern---------')
                        employeeGen()
                     })
                     break;
                     
               }
               // await employeeGen()
            
         }
         else {
            fs.writeFile(outputPath, render(employees), 'utf8', function(err){
               if(err){
                  console.log('ERROR_____>', err)
               } else {
                  console.log('Wrote new HTML')
               }
            })
            console.log(employees);

         }
        
  })
}
await employeeGen()
 }
   

employeePick()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

//test