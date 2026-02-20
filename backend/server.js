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
        const [jobroles] = await db.query('SELECT * from JobRoles;');
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
        const [products] = await db.query('SELECT * from Products;');
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



// ########## DELETE ROUTES ###############
app.delete('/Customers/:id', async (req, res) => {
    try {
        const customerID = req.params.id;

        const query = `DELETE FROM Customers WHERE customerID = ?`;
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

app.delete('/Employees/:id', async (req, res) => {
    try {
        const employeeID = req.params.id;

        const query = `DELETE FROM Employees WHERE employeeID = ?`;
        const [result] = await db.query(query, [employeeID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send("Error deleting employee.");
    }
});

app.delete('/JobRoles/:id', async (req, res) => {
    try {
        const jobID = req.params.id;

        const query = `DELETE FROM JobRoles WHERE jobID = ?`;
        const [result] = await db.query(query, [jobID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Position not found" });
        }

        res.status(200).json({ message: "Position deleted successfully" });

    } catch (error) {
        console.error("Error deleting position:", error);
        res.status(500).send("Error deleting position.");
    }
});

app.delete('/Customers/:id', async (req, res) => {
    try {
        const customerID = req.params.id;

        const query = `DELETE FROM Customers WHERE customerID = ?`;
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

app.delete('/Customers/:id', async (req, res) => {
    try {
        const customerID = req.params.id;

        const query = `DELETE FROM Customers WHERE customerID = ?`;
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

app.delete('/Customers/:id', async (req, res) => {
    try {
        const customerID = req.params.id;

        const query = `DELETE FROM Customers WHERE customerID = ?`;
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



// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
