var connection = require("../config/connection.js");

var orm = {
  allthings: function (tableInput) {
    var queryString = "SELECT * FROM ?? ";

    connection.query(queryString, [tableInput], function (err, result) {
      if (err) throw err;
      parsedInfo = JSON.parse(JSON.stringify(result));
      console.log(parsedInfo);
      return process.exit(0);
    });
  },

  getthings: function (value, tableInput) {
    return new Promise(function (resolve, reject) {
      var queryString = "SELECT ?? FROM ??";
      connection.query(queryString, [value, tableInput], function (err, result) {
        if (err) {
          reject(err);
        };

        var departmentInfo = [];
        parsedInfo = JSON.parse(JSON.stringify(result));
        for (i = 0; i < parsedInfo.length; i++) {
          departmentInfo.push(parsedInfo[i].department_name);
        };
        resolve(departmentInfo);
      });
    })
  },

  getthings2: function (id, value, value2, tableInput) {
    return new Promise(function (resolve, reject) {
      var queryString = "SELECT ??, ??, ?? FROM ??";
      connection.query(queryString, [id, value, value2, tableInput], function (err, result) {
        if (err) {
          reject(err);
        };
        var employeeInfo = [];
        parsedInfo = JSON.parse(JSON.stringify(result));
        for (i = 0; i < parsedInfo.length; i++) {
          employeeInfo.push("Id# " + parsedInfo[i].id + " " + parsedInfo[i].first_name + " " + parsedInfo[i].last_name);
        };
        resolve(employeeInfo);
      });
    })
  },

  getRolen: function (value, tableInput) {
    return new Promise(function (resolve, reject) {
      var queryString = "SELECT ?? FROM ??";
      connection.query(queryString, [value, tableInput], function (err, result) {
        if (err) {
          reject(err);
        };

        var departmentInfo = [];
        parsedInfo = JSON.parse(JSON.stringify(result));
        for (i = 0; i < parsedInfo.length; i++) {
          departmentInfo.push(parsedInfo[i].title);
        };
        resolve(departmentInfo);
      });
    })
  },


  getEmployee: function (value) {
    return new Promise(function (resolve, reject) {
      var queryString = "SELECT * FROM ??";
      connection.query(queryString, [value], function (err, result) {
        if (err) {
          reject(err);
        };
        var departmentInfo = [];
        parsedInfo = JSON.parse(JSON.stringify(result));
        console.log(parsedInfo)
        for (i = 0; i < parsedInfo.length; i++) {
          departmentInfo.push("Id# " + parsedInfo[i].id + " " + parsedInfo[i].first_name + " " + parsedInfo[i].last_name);
          console.log(departmentInfo)

        };
        resolve(departmentInfo);
      });
    })
  },
  //left join so i have acess to all the data  left join with
  //SELECT column_name(s) FROM table1 LEFT JOIN table2 ON table1.column_name = table2.column_name;
  // getDepartmentID: function (value) {
  //   return new Promise(function (resolve, reject) {
  //     var queryString = "SELECT  department.id, department.department_name, employee_db.role.title FROM  employee_db.department LEFT JOIN  employee_db.role ON department.id = role.department_id";
  //     connection.query(queryString, [value], function (err, result) {
  //       if (err) {
  //         reject(err);
  //       };
        
  //       var departmentInfo = [];
  //       depparsedInfo = JSON.parse(JSON.stringify(result));
  //       for (i = 0; i < depparsedInfo.length; i++) {
  //         departmentInfo.push(depparsedInfo[i].id + " " + depparsedInfo[i].department_name);
       
        
  //         var titleInfo = [];
  //         titleparsedInfo = JSON.parse(JSON.stringify(result));
  //         for (i = 0; i < titleparsedInfo.length; i++) {
  //           if (titleparsedInfo[i].title === null){}
  //           else {
  //             titleInfo.push(titleparsedInfo[i].title );
  //           }};
  //         };
  //       resolve(departmentInfo, titleInfo);
  //     });
  //   })
  // },



  addDepartment: function (department_update) {
    var queryString = "INSERT INTO department (department_name) VALUES (?)";
    connection.query(queryString, [department_update], function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(department_update) + " was added");
      return process.exit(0);
    });
  },

  addRole: function (title, salary, departmentNum, managerNum) {
    var queryString = "INSERT INTO role (title, salary, department_id, manager_id) VALUES (?, ?, ?, ?)";
    connection.query(queryString, [title, salary, departmentNum, managerNum], function (err, result) {
      if (err) throw err;
      console.log("A new Role called " + title + " has been added");
      return process.exit(0);
    });
  },

  addEmployee: function (fname, lName, roleNum) {
    var queryString = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
    connection.query(queryString, [fname, lName, roleNum], function (err, result) {
      if (err) throw err;
      console.log("Congrants! " + fname + " was added");
      return process.exit(0);
    });
  },


  deleteEmployeeBYId: function (value) {
    var queryString = "DELETE FROM `employee` WHERE `id` = ?;";
    connection.query(queryString, [value], function (err, result) {
      if (err) throw err;
      console.log("Employee was removed");
      return process.exit(0);
    });
  },


  // UPDATE `members` SET `contact_number` = '0759 253 542' WHERE `membership_number` = 1;
  //       table name       colomN NAME               new value           from id             #


  updateYourHeartsDesire: function (tblName, colName, newValue, idNum) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE `id` = ?;";
    connection.query(queryString, [tblName, colName, newValue, idNum], function (err, result) {
      if (err) throw err;
      return process.exit(0);
    });
  },

  updateYourHeartsDesire2: function (tblName, colfName, val1, colLName, val2, idNum) {
    var queryString = "UPDATE ?? SET ?? = ?, ?? = ? WHERE `id` = ?;";
    connection.query(queryString, [tblName, colfName, val1, colLName, val2, idNum], function (err, result) {
      if (err) throw err;
      return process.exit(0);
    });
  },



};

module.exports = orm;
