const inquirer = require("inquirer");
const cTable = require("console.table");
var orm = require("./config/orm.js");


console.log(
  "___________________________________________________________________" + `\n` +
  "|  ____   __   __   ____    _       ____  __   __  ____    ____   |" + `\n` +
  "| | ___| |  \\_/  | |  _  \\ | |     / __ \\ \\ \\_/ / | ___|  | ___|  |" + `\n` +
  "| | |__  | |\\_/| | | |_| | | |     ||  ||  \\   /  | |__   | |__   |" + `\n` +
  "| | __|  | |   | | | ___/  | |     ||  ||   | |   |  __|  |  __|  |" + `\n` +
  "| | |___ | |   | | | |     | |___  |\\__/|   | |   | |___  | |___  |" + `\n` +
  "| |_____||_|   |_| |_|     |_____| \\____/   |_|   |_____| |_____| |" + `\n` +
  "| _______   _____    _____    _____   __  __  ____    _____       |" + `\n` +
  "||__   __| |  __ \\  /  _  \\  / ____| | | / / | ___|  |  __ \\      |" + `\n` +
  "|   | |    | |  \\ \\ | |_| | | /      | |/ /  | |__   | |  \\ \\     |" + `\n` +
  "|   | |    | |__/ / | | | | | |      |   \\   |  __|  | |__/ /     |" + `\n` +
  "|   | |    | | \\ \\  | | | | | \\____  | |\\ \\  | |___  | | \\ \\      |" + `\n` +
  "|   |_|    |_|  \\_\\ |_| |_|  \\_____| |_| \\_\\ |_____| |_|  \\_\\     |" + `\n` +
  "|_________________________________________________________________|"
)

init();

function init() {
  inquirer.prompt({
    name: "choices",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add", "View", "Terminate", "Update", "Exit"],
  }).then((answer) => {
    if (answer.choices === "Add") {
      add();
    } else if (answer.choices === "View") {
      view();
    } else if (answer.choices === "Terminate") {
      console.log("yo yo")
      terminateEmployee();
    } else if (answer.choices === "Update") {
      update();
    } else {
      console.log("Goodbye!")
      return process.exit(0);
    }
  });
};

function add() {
  inquirer.prompt({
    name: "choices",
    type: "list",
    message: "What would you like add?",
    choices: ["Department", "Role", "Employee", "exit"],
  }).then((answer) => {
    if (answer.choices === "Department") {
      inquirer.prompt({
        name: "department_name",
        type: "input",
        message: "What is the type of department you are wanting to add?",
      }).then((answer) => {
        orm.addDepartment(answer.department_name);
      });
    } else if (answer.choices === "Role") {
      orm.getthings("department_name", "employee_db.department").then((result) => {
        inquirer.prompt([{
          name: "title",
          type: "input",
          message: "What is the type of Role are you wanting to add?",
        },{
          name: "salary",
          type: "input",
          message: "What salary will thise role have?",
        },{
          name: "question1",
          type: "list",
          message: "What department will we be adding this role to?",
          choices: result,
        },{
          name: "question2",
          type: "list",
          message: "Is this a managers role?",
          choices: ["Yes", "No"],
        }]).then((answer) => {
          let q2Answer;
         var IndexNum = result.indexOf(answer.question1) + 1;
         if (answer.question2 === "Yes"){
          q2Answer = IndexNum;
        }else{
          q2Answer = "NULL";}
        orm.addRole(answer.title, answer.salary, IndexNum, q2Answer);
        });
      })
    } else if (answer.choices === "Employee") {
      orm.getRolen("title", "employee_db.role").then((result) => {
        inquirer.prompt([{
          name: "firstName",
          type: "input",
          message: "First Name?",
        },{
          name: "lastName",
          type: "input",
          message: "Last Name?",
        },{
          name: "question1",
          type: "list",
          message: "What department will we be adding this role to?",
          choices: result,
        }]).then((answer) => {
         var IndexNum = result.indexOf(answer.question1) + 1;
        orm.addEmployee(answer.firstName, answer.lastName, IndexNum);
        });
      })
    } else {
      console.log("Goodbye!")
      return process.exit(0);
    }
  });
}

function view() {
  inquirer.prompt({
    name: "choices",
    type: "list",
    message: "What would you like to see?",
    choices: ["All Departments", "All Roles", "All Employees"],
  }).then((answer) => {
    if (answer.choices === "All Departments") {
      orm.allthings("department");
    } else if (answer.choices === "All Roles") {
      orm.allthings("role");
    } else if (answer.choices === "All Employees") {
      orm.allthings("employee");
    } else {
      console.log("Goodbye!")
      return process.exit(0);
    }
  });
};

function terminateEmployee(){
    orm.getEmployee("employee").then((result) => {
    inquirer.prompt([{
      name: "question1",
      type: "list",
      message: "Select the name of the employee you want to terminate?",
      choices: result,
    }]).then((answer) => {
      var stepOne = JSON.stringify(answer.question1)
      var stepTwo = stepOne.split(" ");
      var stepThree = stepTwo[1]
      orm.deleteEmployeeBYId(stepThree)
    });
  })
};














function update() {
  console.log("update")
};
