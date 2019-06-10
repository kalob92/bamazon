var mysql = require('mysql');
var inquirer = require('inquirer');
var items = [];
var customerItem = [];

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
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            // trying here to make a for loop to push the key:value pairs to the Items array that I will then use console.table to log items
            for(i=0; i<res.length; i++){
                items.push(
                    {
                        ID: res[i].item_id,
                        Name: res[i].product_name,
                        Price: "$" + res[i].price,
                        Stock: res[i].stock_quantity
                    }
                );
            };
            console.table(items);
            shop(items);
        }
    );
}

// prompt user w 2 messages
function shop() {
    // first ask for ID of product they wanna buy
    inquirer
        .prompt([
            {
                type: "input",
                name: "productID",
                message: "Enter the ID# of the item you'd like to purchase!",
                validate: function (productID) {
                    for (var i = 0; i < items.length; i++) {
                        if (productID === items[i].ID.toString()) {
                            return true;
                        }
                    }
                }
            },
            // second message asks how many units of the product they want
            {
                type: "number",
                name: "quantity",
                message: `How many of those can we get you?`,
                validate: function(quantity) {
                    var isValid = !isNaN(quantity);
                    return isValid || "Please enter a valid, numeric quantity";
                }
            }
        ])
        .then(answers => {
            connection.query(
                'SELECT * FROM products WHERE item_id = ?',
                [answers.productID],
                function(err, res) {
                    if (err) throw err;
                    customerItem = JSON.parse(JSON.stringify(res[0]));
                    // console.log(customerItem);
                    if(customerItem.stock_quantity >= answers.quantity) {
                        // if there's enough in stock then finish the order
                        var quantityDesired = answers.quantity;
                        checkout(customerItem, quantityDesired);
                    } else {
                        console.log(`Insufficient quantity! Check out our other products in stock!`);
                        setTimeout(
                            function() {
                                console.table(items);
                                shop(items);
                            }, 
                            4000
                        )
                    };
                }
            )
        });
}

function checkout(cart, amount) {
    // (update SQL database to reflect remaining quantity)
    connection.query(
        `UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?`,
        [amount, cart.item_id],
        function(err, res) {
            if(err) throw err;
        }
    )
    // show customer total cost of purchase
    var totalPrice = cart.price * amount;
    console.log(`Your total is $${totalPrice}. Thanks for choosing Bamazon!`);
    connection.end();
}