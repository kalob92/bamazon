DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products (
	item_id int AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) UNSIGNED NOT NULL,
    stock_quantity INT(5) UNSIGNED NOT NULL,
    PRIMARY KEY (item_id)
);

-- just to make the product IDs look cool:
ALTER TABLE products AUTO_INCREMENT=101011;

SELECT * FROM bamazon.products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Black Coat', 'Clothing', 59.99, 25), ('Wood Table', 'Furniture', 349.99, 40), ('Stone Cutting Board', 'Kitchen', 39.99, 10), ('Metal Plant Stand', 'Garden', 74.99, 8), ('Floor Lamp', 'Lighting', 79.99, 10), ('Floral Soap', 'Personal Care', 8.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Green Hat', 'Clothing', 14.99, 4), ('Leather Couch', 'Furniture', 1899.99, 6), ('Dog Bed', 'Pets', 83.99, 5), ('Crystal Paperweight', 'Furniture', 48.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Black Raincoat', 'Clothing', 179.99, 12), ('Blender', 'Kitchen', 49.99, 30), ('Sunglasses', 'Clothing', 21.99, 18);