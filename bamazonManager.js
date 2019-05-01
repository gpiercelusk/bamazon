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
      console.log(lineBreak);
      viewItems();
    } else if (res.manager === "View Low Stock") {
      console.log(lineBreak);
      readLowStock();
    } else if (res.manager === "Add Stock") {
      console.log(lineBreak);
      addStock();
    } else if (res.manager === "Add to Inventory") {
      console.log(lineBreak);
      addInventory();
    }
  });
}

function viewItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + "| Item: " + res[i].item_name + "| Price: $" + res[i].price + "| Quantity: " + res[i].stock_quantity);
    };
    console.log(lineBreak);
    managerUser();
  });
}

function readLowStock() {
  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + "| Item: " + res[i].item_name + "| Quantity: " + res[i].stock_quantity);
    };
    console.log(lineBreak);
    managerUser();
  });
}

function addStock() {

}

function addInventory() {

}