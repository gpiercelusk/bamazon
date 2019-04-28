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


connection.query('SELECT * FROM products', function (err, res) {
  if (err) throw err;
  console.log("\nWelcome to BAMAZON!! Here is what we have in stock:\n" + lineBreak)
  for (var i = 0; i < res.length; i++) {
    console.log('ID: ' + res[i].id + ' | Item: ' + res[i].item_name + " | Price: $" + res[i].price);

  }
  console.log(lineBreak)
  idChoice();
});

function idChoice() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'idChoice',
      message: 'Input ID of item you wish to purchase:',
    },
    {
      type: 'input',
      name: 'unitChoice',
      message: 'How many would you like to buy?:',
    }

  ]).then(function (answers) {
    quantityCheck(answers.idChoice, answers.unitChoice);
  });
}

function quantityCheck(id, units) {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    if (res[id - 1] === undefined) {
      console.log("No product by that id.");
      idChoice();
    } else if (units > res[id - 1].stock_quantity) {
      console.log('Not enough stock to complete order.');
      idChoice();
    } else {
      updateProduct(id, res[id - 1].stock_quantity, units, res[id - 1].item_name, res[id - 1].price);
    }
  });
}

function updateProduct(id, initialUnits, units, whatYouBought, price, productSales) {
  connection.query('UPDATE products SET ? WHERE ?',
    [
      {
        stock_quantity: initialUnits - units,
        //product_sales: productSales + price * units
      },
      {
        id: id
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log('\nThank you for your purchase. You bought:', units, 'unit(s) of', whatYouBought + '.' + '\n');
      console.log("Your total is: $" + units * price + '.\n');
      connection.end();
    });
}