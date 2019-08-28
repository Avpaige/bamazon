var inquirer = require("inquirer");
var mysql = require("mysql");

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
    }
        