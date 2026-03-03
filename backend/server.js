// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 33060;

// ########################################
// ########## ROUTE HANDLERS
app.use((req,res,next)=>{
    console.log("Incoming request:", req.method, req.url);
    next();
});
// READ ROUTES
app.get('/Customers', async (req, res) => {
    try {
        // Create and execute our queries
        const [customers] = await db.query('SELECT customerID AS "Customer ID", firstName AS "First Name", lastName AS "Last Name", homeTown AS "Home Town" from Customers;');
        res.status(200).json({customers});  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/Customers/:customerID', async (req, res) => {
    try {
        const [customers] = await db.query('SELECT * from Customers WHERE customerID = ?',
            [req.params.customerID]
        );
        if(customers.length > 0) {
            res.json(customers[0]);
        } else {
            res.status(404).json({ error: 'Customer not found'});
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

// JobRole READ ROUTES 

app.get('/JobRoles', async (req, res) => {
    try {
        // Create and execute our queries
        const [jobroles] = await db.query('SELECT j.jobID AS "Job ID", j.jobName AS "Job Name", j.pay as "Salary" from JobRoles j;');
        res.status(200).json({ jobroles });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/JobRoles/:jobID', async (req, res) => {
    try {
        const [jobroles] = await db.query('SELECT * from JobRoles WHERE jobID = ?',
            [req.params.jobID]
        );
        if(jobroles.length > 0) {
            res.json(jobroles[0]);
        } else {
            res.status(404).json({ error: 'Job Role not found'});
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

// Employee READ ROUTES

app.get('/Employees', async (req, res) => {
    try {
        // Create and execute our queries
        const [employees] = await db.query('SELECT e.employeeID AS "Employee ID", e.firstName AS "First Name", e.lastName AS "Last Name", e.startDate AS "Start Date", e.jobID AS "Role ID", j.jobName AS "Role" FROM Employees e LEFT JOIN JobRoles j ON e.jobID = j.jobID');
        res.status(200).json({employees});  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/Employees/:employeeID', async (req, res) => {
    try {
        const [employees] = await db.query('SELECT e.firstName, e.lastName, e.startDate, j.jobName FROM Employees e LEFT JOIN JobRoles j ON e.jobID = j.jobID WHERE e.employeeID = ?',
            [req.params.employeeID]
        );
        if(employees.length > 0) {
            res.json(employees[0]);
        } else {
            res.status(404).json({ error: 'Employee not found'});
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

// Products READ ROUTES

app.get('/Products', async (req, res) => {
    try {
        // Create and execute our queries
        const [products] = await db.query('SELECT productID as "Product ID", productName AS "Product Name", productPrice AS "Product Price", sale AS "Sale", categoryName as "Category" from Products;');
        res.status(200).json({products});  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/Products/:productID', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * from Products WHERE productID = ?',
            [req.params.productID]
        );
        if(products.length > 0) {
            res.json(products[0]);
        } else {
            res.status(404).json({ error: 'Product not found'});
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

// Orders READ ROUTES

app.get('/Orders', async (req, res) => {
    try {
        // Create and execute our queries
        const [orders] = await db.query('SELECT o.orderID as "Order ID", o.employeeID AS "Employee ID", e.firstName as "Employee Name", o.customerID AS "Customer ID", c.firstName AS "Customer Name", o.orderTotal AS "Order Total", o.orderDate AS "Order Date" from Orders o LEFT JOIN Employees e ON o.employeeID = e.employeeID LEFT JOIN Customers c on o.customerID = c.customerID;');
        res.status(200).json({orders});  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/Orders/:orderID', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT o.orderTotal, o.orderDate, c.firstName, c.lastName FROM Orders o LEFT JOIN Customers c ON o.customerID = c.customerID WHERE o.orderID = ?',
            [req.params.orderID]
        );
        if(orders.length > 0) {
            res.json(orders[0]);
        } else {
            res.status(404).json({ error: 'Order not found'});
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});

// OrderItems READ ROUTES

app.get('/OrderItems', async (req, res) => {
    try {
        // Create and execute our queries
        const [orderitems] = await db.query('SELECT o.orderID AS "Order ID", o.productID AS "Product ID", p.productName AS "Product Name", o.quantity AS "Quantity" from OrderItems o LEFT JOIN Products p ON o.productID = p.productID;');
        res.status(200).json({orderitems});  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/OrderItems/:orderID', async (req, res) => {
    try {
        const [orderitems] = await db.query('SELECT * FROM OrderItems WHERE orderID = ?',
            [req.params.orderID]
        );
        if(orderitems.length > 0) {
            res.json(orderitems);
        } else {
            res.status(404).json({ error: 'Order not found'});
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});



// Customer CREATE ROUTES

app.post('/Customers', async (req, res) => {
    try{
        const {firstName, lastName, homeTown} = req.body;
        if (!firstName || !lastName || !homeTown) {
           return res.status(400).json({ error: 'Missing required field'});
        }
    // Insert into the database
        const [result] = await db.query(
        'INSERT INTO Customers (firstName, lastName, homeTown) VALUES (?, ?, ?)',
        [firstName, lastName, homeTown]
    );
    // Return the inserted row info
    const [newCustomer] = await db.query(
        'SELECT * FROM Customers WHERE customerID = ?',
        [result.insertId]
    );

    res.status(201).json(newCustomer[0]); // Send back the created customer
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).send("An error occurred while creating the customer.");
    }
});

// JobRole CREATE ROUTE

app.post('/JobRoles', async (req, res) => {
    console.log("Incoming JobRole POST:", req.body);
    try{
        
        const {jobName, pay} = req.body;
        if (!jobName || !pay) {
           return res.status(400).json({ error: 'Missing required field'});
        }
    // Insert into the database
        const [result] = await db.query(
        'INSERT INTO JobRoles (jobName, pay) VALUES (?, ?)',
        [jobName, pay]
    );
    // Return the inserted row info
    const [newJobRole] = await db.query(
        'SELECT * FROM JobRoles WHERE jobID = ?',
        [result.insertId]
    );

    res.status(201).json(newJobRole[0]); // Send back the created job role
    } catch (error) {
        console.error("Error creating job role:", error);
        res.status(500).send("An error occurred while creating the job role.");
    }
});

// Employee CREATE ROUTE

app.post('/Employees', async (req, res) => {
    try{
        const {firstName, lastName, startDate, jobID} = req.body;
        if (!firstName || !lastName || !startDate || !jobID) {
           return res.status(400).json({ error: 'Missing required field'});
        }
    // Insert into the database
        const [result] = await db.query(
        'INSERT INTO Employees (firstName, lastName, startDate, jobID) VALUES (?, ?, ?, ?)',
        [firstName, lastName, startDate, jobID]
    );
    // Return the inserted row info
    const [newEmployee] = await db.query(
        'SELECT * FROM Employees WHERE employeeID = ?',
        [result.insertId]
    );

    res.status(201).json(newEmployee[0]); // Send back the created Employee
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).send("An error occurred while creating the employee.");
    }
});

// Products CREATE ROUTE

app.post('/Products', async (req, res) => {
    try{
        const {productName, productPrice, sale, categoryName} = req.body;
        if (!productName || productPrice == null || sale == null || !categoryName) {
           return res.status(400).json({ error: 'Missing required field'});
        }
    // Insert into the database
        const [result] = await db.query(
        'INSERT INTO Products (productName, productPrice, sale, categoryName) VALUES (?, ?, ?, ?)',
        [productName, productPrice, sale, categoryName]
    );
    // Return the inserted row info
    const [newProduct] = await db.query(
        'SELECT * FROM Products WHERE productID = ?',
        [result.insertId]
    );

    res.status(201).json(newProduct[0]); // Send back the created product
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("An error occurred while creating the product.");
    }
});

// Orders CREATE ROUTE

app.post('/Orders', async (req, res) => {
    try{
        const {employeeID, customerID, orderTotal, orderDate} = req.body;
        if (!employeeID || !customerID || !orderTotal || !orderDate) {
           return res.status(400).json({ error: 'Missing required field'});
        }
    // Insert into the database
        const [result] = await db.query(
        'INSERT INTO Orders (employeeID, customerID, orderTotal, orderDate) VALUES (?, ?, ?, ?)',
        [employeeID, customerID, orderTotal, orderDate]
    );
    // Return the inserted row info
    const [newOrder] = await db.query(
        'SELECT * FROM Orders WHERE orderID = ?',
        [result.insertId]
    );

    res.status(201).json(newOrder[0]); // Send back the created Order
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("An error occurred while creating the order.");
    }
});

// OrdersItems CREATE ROUTE

app.post('/OrderItems', async (req, res) => {
    try{
        const {orderID, productID, quantity} = req.body;
        if (!orderID || !productID || !quantity) {
           return res.status(400).json({ error: 'Missing required field'});
        }
    // Insert into the database
        const [result] = await db.query(
        'INSERT INTO OrderItems (orderID, productID, quantity) VALUES (?, ?, ?)',
        [orderID, productID, quantity]
    );
    // Return the inserted row info
    const [newOrderItem] = await db.query(
        'SELECT * FROM OrderItems WHERE orderID = ? AND productID = ?',
        [orderID, productID]
    );

    res.status(201).json(newOrderItem[0]); // Send back the created OrderItems
    } catch (error) {
        console.error("Error creating Order list:", error);
        res.status(500).send("An error occurred while creating the Order list.");
    }
});

// Customer UPDATE ROUTE

app.put('/Customers/:customerID', async (req, res) => {
    console.log("success in calling")
    try {
        const customerID = req.params.customerID;
        const { firstName, lastName, homeTown } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !homeTown) {
            return res.status(400).json({ error: 'Missing required field(s)' });
        }

        // Update the record in the database
        const [result] = await db.query(
            'UPDATE Customers SET firstName = ?, lastName = ?, homeTown = ? WHERE customerID = ?',
            [firstName, lastName, homeTown, customerID]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Return the updated customer
        const [updatedCustomer] = await db.query(
            'SELECT * FROM Customers WHERE customerID = ?',
            [customerID]
        );

        res.status(200).json(updatedCustomer[0]);
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).send("An error occurred while updating the customer.");
    }
});

// JobRoles UPDATE ROUTE

app.put('/JobRoles/:jobID', async (req, res) => {
    try {
        const jobID = req.params.jobID;
        const { jobName, pay } = req.body;

        // Validate required fields
        if (!jobName || !pay) {
            return res.status(400).json({ error: 'Missing required field(s)' });
        }

        // Update the record in the database
        const [result] = await db.query(
            'UPDATE JobRoles SET jobName = ?, pay = ? WHERE jobID = ?',
            [jobName, pay, jobID]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Job Role not found' });
        }

        // Return the updated JobRole
        const [updatedJobRole] = await db.query(
            'SELECT * FROM JobRoles WHERE jobID = ?',
            [jobID]
        );

        res.status(200).json(updatedJobRole[0]);
    } catch (error) {
        console.error("Error updating Job Role:", error);
        res.status(500).send("An error occurred while updating the Job Role.");
    }
});

// Employees UPDATE ROUTE

app.put('/Employees/:employeeID', async (req, res) => {
    try {
        const employeeID = req.params.employeeID;
        const { firstName, lastName, startDate, jobID } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !startDate || !jobID) {
            return res.status(400).json({ error: 'Missing required field(s)' });
        }

        // Update the record in the database
        const [result] = await db.query(
            'UPDATE Employees SET firstName = ?, lastName = ?, startDate = ?, jobID = ? WHERE employeeID = ?',
            [firstName, lastName, startDate, jobID, employeeID]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Return the updated employee
        const [updatedEmployee] = await db.query(
            'SELECT * FROM Employees WHERE employeeID = ?',
            [employeeID]
        );

        res.status(200).json(updatedEmployee[0]);
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).send("An error occurred while updating the employee.");
    }
});

// Products UPDATE ROUTE

app.put('/Products/:productID', async (req, res) => {
    try {
        const productID = req.params.productID;
        const { productName, productPrice, sale, categoryName } = req.body;

        // Validate required fields
        if (!productName || productPrice == null || sale == null || !categoryName) {
            return res.status(400).json({ error: 'Missing required field(s)' });
        }

        // Update the record in the database
        const [result] = await db.query(
            'UPDATE Products SET productName = ?, productPrice = ?, sale = ?, categoryName = ? WHERE productID = ?',
            [productName, productPrice, sale, categoryName, productID]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the updated product
        const [updatedProduct] = await db.query(
            'SELECT * FROM Products WHERE productID = ?',
            [productID]
        );

        res.status(200).json(updatedProduct[0]);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("An error occurred while updating the product.");
    }
});

// Orders UPDATE ROUTE

app.put('/Orders/:orderID', async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const { employeeID, customerID, orderTotal, orderDate } = req.body;

        // Validate required fields
        if (!employeeID || !customerID || !orderTotal || !orderDate) {
            return res.status(400).json({ error: 'Missing required field(s)' });
        }

        // Update the record in the database
        const [result] = await db.query(
            'UPDATE Orders SET employeeID = ?, customerID = ?, orderTotal = ?, orderDate = ? WHERE orderID = ?',
            [employeeID, customerID, orderTotal, orderDate, orderID]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Return the updated order
        const [updatedOrder] = await db.query(
            'SELECT * FROM Orders WHERE orderID = ?',
            [orderID]
        );

        res.status(200).json(updatedOrder[0]);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).send("An error occurred while updating the order.");
    }
});

// OrderItems PUT Route

app.put('/OrderItems/:orderID/:productID', async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const productID = req.params.productID;
        const { quantity } = req.body;

        // Validate required fields
        if (!orderID || !productID || !quantity) {
            return res.status(400).json({ error: 'Missing required field(s)' });
        }

        // Update the record in the database
        const [result] = await db.query(
            'UPDATE OrderItems SET quantity = ? WHERE orderID = ? AND productID = ?',
            [quantity, orderID, productID]
        );

        // Check if any row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Return the updated order
        const [updatedOrder] = await db.query(
            'SELECT * FROM OrderItems WHERE orderID = ? AND productID = ?',
            [orderID, productID]
        );

        res.status(200).json(updatedOrder[0]);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).send("An error occurred while updating the order.");
    }
});

// Customer DELETE ROUTE

app.delete('/Customers/:customerID', async (req, res) => {
    try {
        const customerID = req.params.customerID;

        const query = 'DELETE FROM Customers WHERE customerID = ?';
        const [result] = await db.query(query, [customerID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully" });

    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).send("Error deleting customer.");
    }
});

// JobRoles DELETE ROUTE

app.delete('/JobRoles/:jobID', async (req, res) => {
    try {
        const jobID = req.params.jobID;

        const query = 'DELETE FROM JobRoles WHERE jobID = ?';
        const [result] = await db.query(query, [jobID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Job Role not found" });
        }

        res.status(200).json({ message: "Job Role deleted successfully" });

    } catch (error) {
        console.error("Error deleting Job Role:", error);
        res.status(500).send("Error deleting Job Role.");
    }
});

// Employees DELETE ROUTE

app.delete('/Employees/:employeeID', async (req, res) => {
    try {
        const employeeID = req.params.employeeID;

        const query = 'DELETE FROM Employees WHERE employeeID = ?';
        const [result] = await db.query(query, [employeeID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        console.error("Error deleting Employee:", error);
        res.status(500).send("Error deleting Employee.");
    }
});

// Products DELETE ROUTE

app.delete('/Products/:productID', async (req, res) => {
    try {
        const productID = req.params.productID;

        const query = 'DELETE FROM Products WHERE productID = ?';
        const [result] = await db.query(query, [productID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product.");
    }
});

// Orders DELETE ROUTE

app.delete('/Orders/:orderID', async (req, res) => {
    try {
        const orderID = req.params.orderID;

        const query = 'DELETE FROM Orders WHERE orderID = ?';
        const [result] = await db.query(query, [orderID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).send("Error deleting order.");
    }
});

// OrderItems DELETE ROUTE

app.delete('/OrderItems/:orderID/:productID', async (req, res) => {
    try {
        const {orderID, productID} = req.params;

        const query = 'DELETE FROM OrderItems WHERE orderID = ? AND productID = ?';
        const [result] = await db.query(query, [orderID, productID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "OrderItems not found" });
        }

        res.status(200).json({ message: "OrderItems deleted successfully" });

    } catch (error) {
        console.error("Error deleting OrderItems:", error);
        res.status(500).send("Error deleting OrderItems.");
    }
});

// Reset Route
app.post('/Reset', async (req, res) => {
    console.log("success in calling")
    try {
        await db.query("CALL sp_reset_database;");
        

        res.status(200).json({ message: "All data has been reset!"});
    } catch (error) {
        console.error("Error resetting:", error);
        res.status(500).send("An error occurred while resetting the database.");
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});

//Citation
//Date:2/11/26
//Based on:
// https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419