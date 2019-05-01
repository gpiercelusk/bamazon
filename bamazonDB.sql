DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department VARCHAR(50),
  price DECIMAL(10,2) NULL,
  stock_quantity INT(20) NOT NULL,
  product_sales DECIMAL (10,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
	department_id INT AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL,
  over_head_costs DECIMAL NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO products(item_name, department, price, stock_quantity, product_sales)
VALUES  ("Audio-Technica AT-LP60XBT-BK", "Electronics", 129, 5, 4000), 
        ("Superman: Red Son", "Books", 14.50, 10, 800), 
        ("Pandemic Legacy: Season 1", "Board Games", 55, 20, 500), 
        ("Pandemic Legacy: Season 2", "Board Games", 79.99, 32, 300),
        ("Nachtmann Vivendi Bordeaux Glasses(4 pack)", "Housewares", 59.99, 12, 475), 
        ("Lamb: The Gospel According to Biff, Christ's Childhood Pal", "Books", 14.50, 99, 1000), 
        ("65-Inch 4K Ultra LED TV", "Electronics", 1099.99, 42, 3042), 
        ("One Piece: Season 1", "Home Video", 24.99, 120, 300020),
        ("Kit Kat Maccha Green Tea Flavor", "Candy",  20.99, 8, 20), 
        ("Knoppers", "Candy", 9.99, 100, 579),
        ("Diego", "Pets", 10000000, 1, 0);

INSERT INTO departments(department, over_head_costs)
VALUES  ("Electronics", 6000),
        ("Books", 500),
        ("Board Games", 300),
        ("Housewares", 1000),
        ("Candy", 1500),
        ("Pets", 100000000),
        ("Home Video", 5000);
        
SELECT * FROM products;
SELECT * FROM departments;

SELECT COUNT(department), department
FROM products
GROUP BY department;

SELECT * FROM products
LEFT JOIN departments ON products.department = departments.department;