var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});
connection.connect(function (err) {
    // if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    manager();
   });


   function manager() {
    inquirer
      .prompt([    
     {
        name: "manager",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"] 
      }])
      .then(function(answer) {
          switch (answer.manager) {
            case "View Products for Sale":
                  getProducts();
                  break;
            case "View Low Inventory":
                  lowInventory();
                  break;
            case "Add to Inventory":
                  addInventory();
                  break;
            case "Add New Product":
                  addProduct();
                  break;
            default:
                   console.log("Not a valid option. Please try again")
          }
      });
    }

    function getProducts() {
        connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            console.log("--------------PRODUCTS FOR SALE----------")
            for (result of results){
              console.log("Product ID: "+ result.Item_ID + "   Product Name: "+ result.Product_Name + "\n" + "Price: $"+ result.Price + "       Stock: " + result.Total_Stock );
              console.log("----------------------------------")
                }
            });
            manager();
         }

    function lowInventory() {
        connection.query("SELECT * FROM products WHERE Total_Stock <=5" , function(err, results) {
            if (err) throw err;
            if (results.length===0){
                console.log("No inventory is currently low.")
            }
            if (results.length<0){
            console.log("--------------PRODUCTS WITH LOW INVENTORY----------")
            for (result of results){
                console.log("Product ID: "+ result.Item_ID + "   Product Name: "+ result.Product_Name + "\n" + "Price: $"+ result.Price + "       Stock: " + result.Total_Stock );
                console.log("----------------------------------")
                }
            }
        });
        manager();
    }

    function addInventory() {
        inquirer
        .prompt([    
       {
          name: "add",
          type: "list",
          message: "Which product would you like to add more inventory to?",
          choices: ["1", "2", "3", "4", "5","6","7","8","9","10" ] 
        }, 
        {
            name: "inventory",
            type: "list",
            message: "How many items would like to add to this inventory?",
            choices: [5, 25, 50, 100, 500, 1,000 ] 
          } 
    ])   .then(function(answer) {
            connection.query("SELECT * FROM products WHERE Item_ID ='" + answer.add + "'", function(err, results) {
            if (err) throw err;
            for (result of results){
            var newStock = result.Total_Stock+answer.inventory
            console.log("Done. Your inventory for " + result.Product_Name + " has been updated to " + newStock +" .")
            connection.query("UPDATE products SET ? WHERE Item_ID = '" + result + "'", [
                {Total_Stock: newStock},        
            ]
            , function (err, result) {
            if (err) throw err;
            // console.log(result.affectedRows + " record(s) updated");
          });
            }
        });
    })

}
  
function addProduct() {
    inquirer
    .prompt([    
   {
      name: "product",
      type: "input",
      message: "What product would you like to add?",
    }, 
    {
        name: "dept",
        type: "list",
        message: "Which department should it be added to?",
        choices: ["Blu Ray", "DVD", "Electronics", "Gaming", "Home Tech"] 
    },
    {
        name: "price",
        type: "list",
        message: "How much sold this product be sold for?",
        choices: [10.00, 15.00, 20.00, 25.00, 50.00, 100.00, 300.00, 500.00] 
    }, 
    {
        name: "stock",
        type: "list",
        message: "How many items would like to add to this inventory?",
        choices: [5, 25, 50, 100, 500, 1,000 ] 
      } 

])   .then(function(answer) {
        var newProd = answer.product
        var newDept = answer.dept
        var price = answer.price
        var stock = answer.stock
        connection.query("INSERT INTO products SET ?", {
            Product_Name: newProd,
            Departmment_Name: newDept,
            Price: price,
            Total_Stock: stock
        }, function (err, results){
        if (err) throw err;
            console.log("Done. " + newProd + " has been added to bAmazon.")
     
            });
        })
    }

