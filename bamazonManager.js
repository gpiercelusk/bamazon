require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var lineBreak = "--------------------------------------------\n"


var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: process.env.password,
  database: "bamazon_DB"
});

managerUser();

function managerUser() {
  inquirer.prompt([
    {
      type: "list",
      name: "manager",
      message: "Select a managerial action:",
      choices: [
        "View Items for Sale",
        "View Low Stock",
        "Add Stock",
        "Add to Inventory"
      ]
    }
  ]).then(function (res) {
    if (res.manager === "View Items for Sale") {
      console.log("\n");
      viewItems();
    } else if (res.manager === "View Low Stock") {
      console.log("\n");
      readLowStock();
    } else if (res.manager === "Add Stock") {
      console.log("\n");
      addStock();
    } else if (res.manager === "Add to Inventory") {
      console.log("\n");
      addInventory();
    }
  });
}