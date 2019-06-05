var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');
var values = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0hShit!!",
    database: "bamazon"
});

// first display all of the items available for sale
// include ids, names, and prices of products
connection.connect(function(err) {
    if (err) throw err;
    console.log(`Welcome to Bamazon!\nLook what's in stock today!\n`);
    displayItems();
});

function displayItems() {
    connection.query(
        "SELECT item_id, product_name, price FROM products",
        function (err, res) {
            if (err) throw err;
            // trying here to make a for loop to push the key:value pairs to the Values array that I will then use console.table to log items
            for(i=0; i<res.length; i++){
                values.push(
                    {
                        "ID#": res[i].item_id,
                        "Product Name": res[i].product_name,
                        "Price": "$" + res[i].price
                    }
                );
            };
            console.table(values);
            // delete this connection.end() and put it somewhere else once you're done building here
            // connection.end();
            shop();
        }
    );
}

// prompt user w 2 messages
function shop() {
    // first ask for ID of product they wanna buy
    inquirer
        .prompt([
            {
                type: "string",
                name: "productID",
                message: "Enter the ID# of the item you'd like to purchase!",
                validate: function(productID){
                    var isValid = !isNaN(parseFloat(productID));
                    return isValid || "Please enter a valid Product ID#";
                }
            },
            // second message asks how many units of the product they want
            {
                type: "number",
                name: "quantity",
                message: "How many of that can we get you?",
                validate: function(productID){
                    var isValid = !isNaN(parseFloat(productID));
                    return isValid || "Please enter a valid, numeric quantity";
                }
            }
        ])
        .then(answers => {
            // do something here with the answers
        });

}


// after placing order, app checks if store has enough in stock

// if not then log Insufficient quantity!
// and then prevent the order from going through

// if there's enough in stock then finish the order
// (update SQL database to reflect remaining quantity)
// show customer total cost of purchase