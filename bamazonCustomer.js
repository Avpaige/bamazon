var inquirer = require("inquirer");
var mysql = require("mysql");
var startTime = setTimeout(function() {
   start();
  }, 1000);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    afterConnection(startTime);
   
 });

 function afterConnection() {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      console.log("--------------PRODUCTS FOR SALE----------")
      for (result of results){
        console.log("Product ID: "+ result.Item_ID + " _Product Name: "+ result.Product_Name + " _Price: $"+ result.Price );
        console.log("----------------------------------")
      }
    });
  }
 function start() {
    inquirer
      .prompt([    
     {
        name: "prodID",
        type: "list",
        message: "Which Product ID would you like to buy?",
        choices: ["1", "2", "3", "4", "5","6","7","8","9","10" ] 
      }, 
      {
        name: "purchase",
        type: "input",
        message: "How many would you like to purchase?",
      }
    ])
      .then(function(answer) {
        var item = answer.prodID
        var quantity = answer.purchase
        connection.query(
            "SELECT * FROM products WHERE Item_ID ='" + item + "'", 
        function(err, results){
            if (err) throw err;
              for (result of results){
                if(result.Total_Stock> quantity){
                    var price = result.Price*quantity
                     console.log("You're purchase is complete, thank you for your business! Your order total is $" + price);
                     var newStock = result.Total_Stock-quantity
                     connection.query("UPDATE products SET ? WHERE Item_ID = '" + item + "'", [
                      {Total_Stock: newStock},
                     ]
                     , function (err, result) {
                      if (err) throw err;
                      // console.log(result.affectedRows + " record(s) updated");
                    });

                   }else
                   {
                    console.log("Bummer, we don't have enough of that item in stock, please try a different quantity.")
                }
            }
        })
    })
}
 
