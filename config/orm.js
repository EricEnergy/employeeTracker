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
    return new Promise(function(resolve, reject) {
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

  getRolen: function (value, tableInput) {
    return new Promise(function(resolve, reject) {
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
    return new Promise(function(resolve, reject) {
      var queryString = "SELECT * FROM ??";
      connection.query(queryString, [value], function (err, result) {
        if (err) {
          reject(err);
        };
        var departmentInfo = [];
        parsedInfo = JSON.parse(JSON.stringify(result));
        console.log(parsedInfo)
        for (i = 0; i < parsedInfo.length; i++) {
          departmentInfo.push("Id# "+ parsedInfo[i].id +" "+ parsedInfo[i].first_name +" "+ parsedInfo[i].last_name);
          console.log(departmentInfo)

        };
        resolve(departmentInfo);
      });
    })
  },


  addDepartment: function (department_update) {
    var queryString = "INSERT INTO department (department_name) VALUES (?)";
    connection.query(queryString, [department_update], function (err, result) {
      if (err) throw err;
      console.log(result + " was added");
      return process.exit(0);
    });
  },

  addRole: function (title, salary, departmentNum, managerNum) {
    var queryString = "INSERT INTO role (title, salary, department_id, manager_id) VALUES (?, ?, ?, ?)";
    connection.query(queryString, [title, salary, departmentNum, managerNum], function (err, result) {
      if (err) throw err;
      console.log("A new Role "+ title +" was added");
      return process.exit(0);
    });
  },

  addEmployee: function (fname, lName, roleNum) {
    var queryString = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
    connection.query(queryString, [fname, lName, roleNum], function (err, result) {
      if (err) throw err;
      console.log("Congrants! "+ fname +" was added");
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

};

module.exports = orm;
