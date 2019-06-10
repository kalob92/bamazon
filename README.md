# bamazon 🛍
### CLI application for e-commerce

Bamazon uses Node.js to run within your terminal, reading from a MySQL database to display to you all available products for sale from Bamazon's virtual store.

---

+ Open Bamazon by running `node bamazonCustomer.js` in your terminal. The store should open, displaying your options.

+ Once you've decided on an item, enter the Product ID number into the terminal where it prompts you for it. If the number doesn't match an existing Product ID or isn't a non-numerical character, then Bamazon will ask again for a valid ID number.

+ If the ID is correct, you'll be asked to specify the quantity desired of the product you wish to purchase. If there isn't enough product available to fulfill your order, then Bamazon will tell you "Insufficient quantity!" and reload the storefront after 4 seconds so you can double check the stock on hand or select a different item. Otherwise the transaction will go through, giving you your total price and subtracting your order from the inventory.

---

Watch the demonstration [here](https://drive.google.com/open?id=1yK2H3GvpYBcAd8bSGtSinni86I0S00f4 "Bamazon Demo on Google Drive")

Uses [Node.js](https://nodejs.org/en/ "Node.js") as well as the [inquirer.js](https://www.npmjs.com/package/inquirer/v/0.2.3 "inquirer npm docs") and [mysql](https://www.npmjs.com/package/mysql "mysql npm docs") modules
