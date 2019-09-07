# bamazon
Inventory System to order prodcuts as a customer and manage them as a manager.
 
Run command: node bamazonCustomer.js
to: 
View Current Products including their Product Id, Product Name, and Price
From there select which product to order, and how many to purchase
If there is enough product in stock the order will go through and complete your order.
    Successful orders will also update stock quantity in MySql database
If you order more than current stock amount you will be prevented from ordering.

Run command: node bamazonManager.js
to: 
View Products for Sale and their item IDs, names, prices, and quantities.
View Low Inventory for products with current inventory lower than 5.
Add Inventory to current products
Add new products to bAmazon

Actions will update related MysQl Database