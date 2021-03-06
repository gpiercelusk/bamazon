require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var lineBreak = "\n--------------------------------------------\n"


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
      message: "Select a managerial action:\n",
      choices: [
        "View Items for Sale",
        "View Low Stock",
        "Receive Inventory",
        "Add New Item to Inventory",
        "Exit"
      ]
    }
  ]).then(function (res) {
    if (res.manager === "View Items for Sale") {
      console.log(lineBreak);
      viewItems();
    } else if (res.manager === "View Low Stock") {
      console.log(lineBreak);
      readLowStock();
    } else if (res.manager === "Receive Inventory") {
      console.log(lineBreak);
      addStock();
    } else if (res.manager === "Add New Item to Inventory") {
      console.log(lineBreak);
      addNew();
    } else {
      connection.end();
    }
  });
}

function viewItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + "| Item: " + res[i].item_name + "| Department: " + res[i].department + "| Price: $" + res[i].price + "| Quantity: " + res[i].stock_quantity);
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
  inquirer.prompt([
    {
      type: "input",
      name: "chooseId",
      message: "Select item you would like to add to stock.(Select with ID)"
    },
    {
      type: "input",
      name: "howMany",
      message: "How many came in?"
    }
  ]).then(function (res) {
    checkId(res.chooseId, res.howMany)
  });
}

function checkId(id, units) {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    if (res[id - 1] === undefined) {
      console.log("Item not a product. Plese select a valid option");
      addStock();
    } else {
      updateItem(id, res[id - 1].stock_quantity, units)
    }
  });
}

function updateItem(id, initialUnits, units) {
  connection.query('UPDATE products SET ? WHERE ?',
    [
      {
        stock_quantity: parseInt(initialUnits) + parseInt(units)
      },
      {
        id: id
      }
    ],
    function (err) {
      if (err) throw err;
      console.log(lineBreak + "\nProduct inventory updated. Product ID #" + id + " increased inventory by " + units + " units.");
      console.log(lineBreak);
      managerUser();
    });
}

function addNew() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'item_name',
      message: 'Input name of the product:',
    },
    {
      type: 'input',
      name: 'department',
      message: 'Input department name:',
    },
    {
      type: 'input',
      name: 'price',
      message: 'Input product price ($00.00): $',
    },
    {
      type: 'input',
      name: 'stock_quantity',
      message: 'Input amount available for purchase:'
    },
  ]).then(function (res) {
    connection.query(
      "INSERT INTO products SET ?",
      {
        item_name: res.item_name,
        department: res.department,
        price: res.price,
        stock_quantity: res.stock_quantity,
        product_sales: 0
      },
      function (err) {
        if (err) throw err;
        console.log(lineBreak + res.item_name + " was added to: " + res.department + " at $" + res.price + " with a stock of " + res.stock_quantity + lineBreak);
        managerUser();
      }
    );
  });
}