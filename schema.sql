CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE Products(
    Item_ID  AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Product_Name VARCHAR(300) NOT NULL,
    Department_Name VARCHAR(300) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Total_Stock INT(10) NOT NULL,

);

select * from products;

INSERT INTO products(Product_Name,Department_Name,Price,Total_Stock)
VALUES ("The Mighty Ducks","Blu Ray",10.00,12),
    ("The Big Green", "Blu Ray", 5.00, 20),
    ("DVD Player", "Electronics", 30.00, 20),
    ("Blu Ray Player","Electronics",75.00,18),
    ("Camp Nowhere","Blu Ray",7.00,	20),
    ("The Sandlot",	"DVD"	,15.00,	17),
    ("Angels in the Outfield","	DVD",	12.00,	20),
    ("Rookie of the Year"	,"Blu Ray",	5.00,	19),
    ("Ocean's 11","Blu Ray",10.00,5);
