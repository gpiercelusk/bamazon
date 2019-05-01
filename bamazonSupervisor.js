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

supervisorUser();

function supervisorUser() {
  inquirer.prompt([
    {
      type: "list",
      name: "supervisor",
      message: "Select a supervisor action:",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Exit"
      ]
    }
  ]).then(function (ans) {
    if (ans.supervisor === "View Product Sales by Department") {
      viewDept();
    } else if (ans.supervisor === "Create New Department") {
      createNewDept();
    } else {
      connection.end();
    }
  });
}

function viewDept() {
  console.log(lineBreak);
  connection.query(
    'SELECT * FROM products LEFT JOIN departments ON products.department = departments.department',
    function (err, res) {
      if (err) throw err;
      var tableArray = [];
      var productSalesTotal = 0;
      for (var i = 0; i < res.length; i++) {
        if (i === 0) {
          productSalesTotal += res[i].product_sales;
        } else if (res[i].department === res[i - 1].department && res[i].department === res[i + 1].department) {
          productSalesTotal += res[i].product_sales;

        } else if (res[i].department === res[i - 1].department && res[i].department_id !== res[i + 1].department_id) {
          productSalesTotal += res[i].product_sales;
          tableArray.push({
            department_id: res[i - 1].department_id,
            department: res[i - 1].department,
            over_head_costs: res[i - 1].over_head_costs,
            product_sales: productSalesTotal,
            total_profit: productSalesTotal - parseInt(res[i - 1].over_head_costs)
          });
          productSalesTotal = 0;

        } else if (res[i].department !== res[i - 1].department && res[0].department_id !== res[i - 1].department_id) {
          productSalesTotal += res[i].product_sales;

          tableArray.push({
            department_id: res[i].department_id,
            department: res[i].department,
            over_head_costs: res[i].over_head_costs,
            product_sales: productSalesTotal,
            total_profit: productSalesTotal - parseInt(res[i].over_head_costs)
          });

          productSalesTotal = 0;
        };
      };
      console.table(tableArray);
      supervisorUser();
    });
}

