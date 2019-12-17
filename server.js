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
    choices: ["Add", "View", "Terminate", "Update", "Exit", "Beep"],
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
    } else if (answer.choices === "Beep") {
      fun();
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
        }, {
          name: "salary",
          type: "input",
          message: "What salary will thise role have?",
        }, {
          name: "question1",
          type: "list",
          message: "What department will we be adding this role to?",
          choices: result,
        }, {
          name: "question2",
          type: "list",
          message: "Is this a managers role?",
          choices: ["Yes", "No"],
        }]).then((answer) => {
          let q2Answer;
          var IndexNum = result.indexOf(answer.question1) + 1;
          if (answer.question2 === "Yes") {
            q2Answer = IndexNum;
          } else {
            q2Answer = "NULL";
          }
          orm.addRole(answer.title, answer.salary, IndexNum, q2Answer);
        });
      })
    } else if (answer.choices === "Employee") {
      orm.getRolen("title", "employee_db.role").then((result) => {
        inquirer.prompt([{
          name: "firstName",
          type: "input",
          message: "First Name?",
        }, {
          name: "lastName",
          type: "input",
          message: "Last Name?",
        }, {
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

function terminateEmployee() {
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




// UPDATE `members` SET `contact_number` = '0759 253 542' WHERE `membership_number` = 1;
//       table name       colomN NAME               new value           from id             #



function update() {
  inquirer.prompt({
    name: "choices",
    type: "list",
    message: "What would you like to Update?",
    choices: ["A Department", "A Role", "An Employees info"],
  }).then((answer) => {
    if (answer.choices === "A Department") {
      inquirer.prompt({
        name: "confirm1",
        type: "confirm",
        message: "You can only update a departments name at this time. Still proceed?",
      }).then((answer) => {
        console.log(answer)
        if (answer.confirm1 === true) {
          orm.getthings("department_name", "employee_db.department").then((result) => {
            inquirer.prompt([{
              name: "question1",
              type: "list",
              message: "Choose a departments name to update.",
              choices: result,
            }, {
              name: "newbName",
              type: "input",
              message: "Please enter a new name.",
            }]).then((answer) => {
              var IndexNum = result.indexOf(answer.question1) + 1;
              orm.updateYourHeartsDesire("department", "department_name", answer.newbName, IndexNum);
            })});
        } else {
          return process.exit(0);
        }
      })
    } else if (answer.choices === "A Role") {
      inquirer.prompt({
        name: "choices",
        type: "list",
        message: "What would you like to see?",
        choices: ["Change Title Name", "Change Salary Amount", "Change Manager ID"],  // "Change the Department ID of this role",
      }).then((answer) => {
        if (answer.choices === "Change Title Name"){ 
          orm.getRolen("title", "employee_db.role").then((result) => {
            inquirer.prompt([{
            name: "question1",
            type: "list",
            message: "Choose a job title that you want to update.",
            choices: result,
          }, {
            name: "newbName",
            type: "input",
            message: "What do you want to update this title to?",
          }]).then((answer) => {
            var IndexNum = result.indexOf(answer.question1) + 1;
            orm.updateYourHeartsDesire("role", "title", answer.newbName, IndexNum);
          })});

        } else if(answer.choices === "Change Salary Amount"){
          orm.getRolen("title", "employee_db.role").then((result) => {
            inquirer.prompt([{
            name: "question1",
            type: "list",
            message: "Choose a Role to change the salary to.",
            choices: result,
          }, {
            name: "newbName",
            type: "input",
            message: "What do you want to update this salary to?",
          }]).then((answer) => {
            var IndexNum = result.indexOf(answer.question1) + 1;
            orm.updateYourHeartsDesire("role", "salary", answer.newbName, IndexNum);
          })});

        // } else if(answer.choices === "Change the Department ID of this role"){
        //   inquirer.prompt({
        //     name: "confirm1",
        //     type: "confirm",
        //     message: "Please only update this if you think a role was added to the wrong department. Still proceed?",
        //   }).then((answer) => {
        //     if (answer.confirm1 === true) {
        //       orm.getDepartmentID().then((result) => {
        //         console.log(result)
        //         inquirer.prompt([{
        //           name: "question1",
        //           type: "list",
        //           message: "Choose a departments name to update.",
        //           choices: result,
        //         },{
        //           name: "question2",
        //           type: "list",
        //           message: "Choose a departments name to update.",
        //           choices: result,
        //         },]).then((answer) => {
        //           var IndexNum = result.indexOf(answer.question1) + 1;
        //           var stepOne = JSON.stringify(answer.question1)
        //           var stepTwo = stepOne.split(" ");
        //           var stepThree = stepTwo[1]
        //           orm.updateYourHeartsDesire("role", "department_id", stepThree, IndexNum);
        //         })});
        //     } else {
        //       return process.exit(0);
        //     }})
        } else{
          console.log("Goodbye!")
          return process.exit(0);
        }
      });
    } else if (answer.choices === "An Employees info") {
      inquirer.prompt({
        name: "choices",
        type: "list",
        message: "What would you like to Update?",
        choices: ["Update an employee Name", " Update an Employees ID Last Name"],
      }).then((answer) => {
        if (answer.choices === "Update an employee Name") {
              orm.getthings2("id", "first_name", "last_name", "employee_db.employee").then((result) => {
                inquirer.prompt([{
                  name: "question1",
                  type: "list",
                  message: "Choose an employees name to update.",
                  choices: result,
                }, {
                  name: "newFName",
                  type: "input",
                  message: "Please enter a new first name.",
                },{
                  name: "newLName",
                  type: "input",
                  message: "Please enter a new last name.",
                }]).then((answer) => {
                  var stepOne = JSON.stringify(answer.question1)
                  var stepTwo = stepOne.split(" ");
                  var stepThree = stepTwo[1]
                  orm.updateYourHeartsDesire2("employee", "first_name", answer.newFName, "last_name", answer.newLName, stepThree);
                })});    } else {
      console.log("Due to the sensitivity of this info it cannot be changed at this time. Goodbye!")
      return process.exit(0);
    }})
    } else {
      console.log("Goodbye!")
      return process.exit(0);
    }
  });
};


function fun() {

  console.log("Beep... Yah thats all this does. What got got a problem? BEEP BEEP! IS THIS WHAT YOU REALLY WANT FROM ME? WILL THIS MAKE YOU HAPPY? BEEEEP BEEEPP...... Look, sorry I yelled, its been a long day, ill do better I promise.")
  return process.exit(0);
};