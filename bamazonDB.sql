DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(50) NOT NULL,
  department VARCHAR(50),
  price DECIMAL(10,2) NULL,
  stock_quantity INT(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products(item_name, department, price, stock_quanity)
VALUES  ("Audio-Technica AT-LP60XBT-BK", "Electronics", 129, 5), 
        ("Superman: Red Son", "Books", 14.39, 10), 
        ("Pandemic Legacy: Season 1", "Board Games", 55, 20), 
        ("Pandemic Legacy: Season 2", "Board Games", 79.99, 32)
        ("Nachtmann Vivendi Bordeaux Glasses(4 pack)", "Housewares", 59.95, 12), 
        ("Lamb: The Gospel According to Biff, Christ's Childhood Pal", "Books", 14.50, 99), 
        ("65-Inch 4K Ultra LED TV", "Electronics", 1099.98, 42), 
        ("One Piece: Season 1", "Home Video", 24.99, 120),
        ("Kit Kat Maccha Green Tea Flavor", "Candy",  20.99, 8), 
        ("Knoppers", "Candy", 9.98, 100);