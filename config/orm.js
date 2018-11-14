// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
// =============================================================
// Import MySQL connection.
const connection = require("./connection.js");


// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objectToSql(object) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in object) {
    var value = object[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(object, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  // Read All
  selectAll: function (tableName, callback) {
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  // Create One
  insertOne: function (tableName, cols, vals, callback) {
    var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },
  // An example of objectColVals would be { devoured: 'true' }
  updateOne: function (tableName, objectColVals, condition, callback) {
    var queryString = "UPDATE " + tableName;

    queryString += " SET ";
    queryString += objectToSql(objectColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },
  delete: function (tableName, condition, callback) {
    var queryString = "DELETE FROM " + tableName;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;


/* 


// ORM

const orm = {

    // Here our ORM is creating a simple method for performing a query of the entire table.
    // We make use of the callback to ensure that data is returned only once the query is done.
    selectAll: function (callback) {
        let s = "SELECT * FROM " + tableName;

        connection.query(s, function (err, result) {

            callback(result);

        });
    },

    insertOne: function (burger, callback) {
        let s = "INSERT INTO " + tableName + " (burger_name, devoured) VALUES (?, ?)";
        burger.devoured = burger.devoured || 0;
        connection.query(s, [
            burger.burger_name, burger.devoured
        ], function (err, result) {

            callback(result);

        });
    },

    updateOne: function (burger, callback) {
        var s = "UPDATE " + tableName + " SET burger_name=? WHERE id=?";

        connection.query(s, [
            burger.burger_name, burger.id
        ], function (err, result) {

            callback(result);

        });
    }
};

module.exports = orm;


 */

