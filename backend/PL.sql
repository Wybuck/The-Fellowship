-- All code here was handwritten by Jackson Manriquez and Wyatt Buckman, loosely based on exploration "PL/SQL part 2, Stored Procedures for CUD"
-- Link: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-pl-slash-sql-part-2-stored-procedures-for-cud?module_item_id=26243430

DROP PROCEDURE IF EXISTS sp_reset_database;
DELIMITER //

CREATE PROCEDURE sp_reset_database()
BEGIN

    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS Customers, JobRoles, Employees, Products, Orders, OrderItems;

    
    -- Create table section
    

    CREATE OR REPLACE TABLE Customers (
    customerID int NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    homeTown VARCHAR(45) NOT NULL,
    PRIMARY KEY (customerID)
    ) ENGINE=InnoDB;
    -- Must Bring in Job Roles before Employees, as is referenced in employees. 
    CREATE OR REPLACE TABLE JobRoles (
    jobID int NOT NULL AUTO_INCREMENT,
    jobName VARCHAR(45) NOT NULL,
    pay int NOT NULL,
    PRIMARY KEY (jobID)
    ) ENGINE=InnoDB;

    CREATE OR REPLACE TABLE Employees (
    employeeID int NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    startDate DATE NOT NULL,
    jobID int NOT NULL,
    PRIMARY KEY (employeeID),
    FOREIGN KEY (jobID) 
        REFERENCES JobRoles(jobID)
        ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE OR REPLACE TABLE Products (
    productID int NOT NULL AUTO_INCREMENT, 
    productName VARCHAR(45) NOT NULL, 
    productPrice decimal NOT NULL,
    sale int,
    categoryName VARCHAR(45) NOT NULL,
    PRIMARY KEY (productID)
    ) ENGINE=InnoDB;
    -- Can finally create Orders table
    CREATE OR REPLACE TABLE Orders (
    orderID int NOT NULL AUTO_INCREMENT, 
    employeeID int NOT NULL,
    customerID int NOT NULL,
    orderTotal decimal NOT NULL DEFAULT 0,
    orderDate date NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (employeeID) 
        REFERENCES Employees(employeeID)
        ON DELETE RESTRICT,
    FOREIGN KEY (customerID) 
        REFERENCES Customers(customerID)
        ON DELETE CASCADE
    ) ENGINE=InnoDB;
    
    CREATE OR REPLACE TABLE OrderItems (
    orderID int NOT NULL,
    productID int NOT NULL,
    quantity int NOT NULL,
    PRIMARY KEY (orderID, productID),
    FOREIGN KEY (orderID) 
        REFERENCES Orders(orderID) 
        ON DELETE CASCADE,
    FOREIGN KEY (productID)
        REFERENCES Products(productID)
        ON DELETE RESTRICT
    ) ENGINE=InnoDB;

    
    -- Insert data section
    

    INSERT INTO Customers (firstName, lastName, homeTown) VALUES 
    ('Peregrin', 'Took', 'Tuckborough'),
    ('Rosie', 'Cotton', 'Bywater'),
    ('Farmer', 'Maggot', 'Bamfurlong'),
    ('Fredegar', 'Bolger', 'Budgeford'),
    ('Meriadoc', 'Brandybuck', 'Buckland')
    ;

    INSERT INTO JobRoles (jobName, pay) VALUES 
    ('Manager', 10),
    ('Clerk', 4),
    ('Barkeep', 2)
    ;

    INSERT INTO Employees (firstName, lastName, jobID, startDate) VALUES 
    ('Gandalf', 'Grey', (SELECT jobID FROM JobRoles WHERE jobName = 'Manager'), '3003-01-01'),
    ('Bilbo', 'Baggins', (SELECT jobID FROM JobRoles WHERE jobName = 'Clerk'), '3003-01-05'),
    ('Frodo', 'Baggins', (SELECT jobID FROM JobRoles WHERE jobName = 'Barkeep'), '3003-03-01'),
    ('Samwise', 'Gamgee', (SELECT jobID FROM JobRoles WHERE jobName = 'Barkeep'), '3003-03-02'),
    ('Legolas', 'Greenleaf', (SELECT jobID FROM JobRoles WHERE jobName = 'Clerk'), '3003-03-03')
    ;

    INSERT INTO Products (productName, productPrice, categoryName) VALUES 
    ('Short-Sword', 15, 'Weapons'),
    ('Great-Sword', 25, 'Weapons'),
    ('Battle-Axe', 20, 'Weapons'),
    ('Bow-and-Arrow', 30, 'Weapons'),
    ('Water', 1, 'Drinks'),
    ('Beer', 2, 'Drinks');
    
    INSERT INTO Orders(employeeID, customerID, orderTotal, orderDate) VALUES 
  ((SELECT employeeID FROM Employees WHERE firstName = 'Gandalf' AND lastName = 'Grey'), 
    (SELECT customerID FROM Customers WHERE firstName = 'Peregrin' AND lastName = 'Took'), 
    10, 
    '3003-01-01'),
  ((SELECT employeeID FROM Employees WHERE firstName = 'Bilbo' AND lastName = 'Baggins'), 
    (SELECT customerID FROM Customers WHERE firstName = 'Rosie' AND lastName = 'Cotton'), 
    16, 
    '3003-01-01'),
  ((SELECT employeeID FROM Employees WHERE firstName = 'Bilbo' AND lastName = 'Baggins'), 
    (SELECT customerID FROM Customers WHERE firstName = 'Farmer' AND lastName = 'Maggot'), 
    15, 
    '3003-01-06'),
  ((SELECT employeeID FROM Employees WHERE firstName = 'Legolas' AND lastName = 'Greenleaf'), 
    (SELECT customerID FROM Customers WHERE firstName = 'Fredegar' AND lastName = 'Bolger'), 
    30, 
    '3003-03-04')
;

INSERT INTO OrderItems (orderID, productID, quantity) VALUES
  (
    (SELECT orderID FROM Orders 
       WHERE customerID = (SELECT customerID FROM Customers WHERE firstName='Peregrin' AND lastName='Took')
         AND employeeID = (SELECT employeeID FROM Employees WHERE firstName='Gandalf' AND lastName='Grey')
         AND orderDate = '3003-01-01'),
    (SELECT productID FROM Products WHERE productName='Beer'),
    5
  ),
  (
    (SELECT orderID FROM Orders 
       WHERE customerID = (SELECT customerID FROM Customers WHERE firstName='Rosie' AND lastName='Cotton')
         AND employeeID = (SELECT employeeID FROM Employees WHERE firstName='Bilbo' AND lastName='Baggins')
         AND orderDate = '3003-01-01'),
    (SELECT productID FROM Products WHERE productName='Beer'),
    8
  ),
  (
    (SELECT orderID FROM Orders 
       WHERE customerID = (SELECT customerID FROM Customers WHERE firstName='Farmer' AND lastName='Maggot')
         AND employeeID = (SELECT employeeID FROM Employees WHERE firstName='Bilbo' AND lastName='Baggins')
         AND orderDate = '3003-01-06'),
    (SELECT productID FROM Products WHERE productName='Short-Sword'),
    1
  ),
  (
    (SELECT orderID FROM Orders 
       WHERE customerID = (SELECT customerID FROM Customers WHERE firstName='Fredegar' AND lastName='Bolger')
         AND employeeID = (SELECT employeeID FROM Employees WHERE firstName='Legolas' AND lastName='Greenleaf')
         AND orderDate = '3003-03-04'),
    (SELECT productID FROM Products WHERE productName='Bow-and-Arrow'),
    1
  );
    
    

    SET FOREIGN_KEY_CHECKS = 1;

END //

DELIMITER ;
-- Customer SP's

DROP PROCEDURE IF EXISTS sp_create_customer;

DELIMITER //
CREATE PROCEDURE sp_create_customer(
	proc_firstName VARCHAR(45), 
	proc_lastName VARCHAR(45), 
	proc_homeTown VARCHAR(45)
)
BEGIN

    INSERT INTO Customers (firstName, lastName, homeTown) VALUES (proc_firstName, proc_lastName, proc_homeTown);

END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_delete_customer;

DELIMITER //
CREATE PROCEDURE sp_delete_customer(proc_customerID INT)
BEGIN

    DELETE FROM Customers WHERE customerID = proc_customerID;

END //


DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_customer;

DELIMITER //
CREATE PROCEDURE sp_update_customer(
    proc_firstName VARCHAR(45), 
	  proc_lastName VARCHAR(45), 
	  proc_homeTown VARCHAR(45),
    proc_customerID INT
)
BEGIN

    UPDATE Customers SET firstName = proc_firstName, 
    lastName = proc_lastName, 
    homeTown = proc_homeTown 
    WHERE customerID = proc_customerID;

END //


DELIMITER ;

-- Employee SP's

DROP PROCEDURE IF EXISTS sp_create_employee;

DELIMITER //
CREATE PROCEDURE sp_create_employee(
	proc_firstName VARCHAR(45), 
	proc_lastName VARCHAR(45), 
	proc_startDate DATE,
  proc_jobID INT
)
BEGIN

    INSERT INTO Employees (firstName, lastName, startDate, jobID) VALUES (proc_firstName, proc_lastName, proc_startDate, proc_jobID);

END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_delete_employee;

DELIMITER //
CREATE PROCEDURE sp_delete_employee(proc_employeeID INT)
BEGIN

    DELETE FROM Employees WHERE employeeID = proc_employeeID;

END //


DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_employee;

DELIMITER //
CREATE PROCEDURE sp_update_employee(
    proc_firstName VARCHAR(45), 
	  proc_lastName VARCHAR(45), 
	  proc_startDate DATE,
    proc_jobID INT,
    proc_employeeID INT
)
BEGIN

    UPDATE Employees SET firstName = proc_firstName, lastName = proc_lastName, startDate = proc_startDate, jobID = proc_jobID WHERE employeeID = proc_employeeID;

END //


DELIMITER ;

-- JobRoles SP's

DROP PROCEDURE IF EXISTS sp_create_jobRole;

DELIMITER //
CREATE PROCEDURE sp_create_jobRole(
	proc_jobName VARCHAR(45), 
  proc_pay INT
)
BEGIN

    INSERT INTO JobRoles (jobName, pay) VALUES (proc_jobName, proc_pay);

END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_delete_jobRole;

DELIMITER //
CREATE PROCEDURE sp_delete_jobRole(proc_jobID INT)
BEGIN

    DELETE FROM JobRoles WHERE jobID = proc_jobID;

END //


DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_jobRole;

DELIMITER //
CREATE PROCEDURE sp_update_jobRole(
    proc_jobName VARCHAR(45), 
    proc_pay INT,
    proc_jobID INT
)
BEGIN

    UPDATE JobRoles SET jobName = proc_jobName, pay = proc_pay WHERE jobID = proc_jobID;

END //


DELIMITER ;

-- Product SP's

DROP PROCEDURE IF EXISTS sp_create_product;

DELIMITER //
CREATE PROCEDURE sp_create_product(
	proc_productName VARCHAR(45), 
  proc_productPrice INT,
  proc_sale INT,
  proc_categoryName VARCHAR(45)
)
BEGIN

    INSERT INTO Products (productName, productPrice, sale, categoryName) VALUES (proc_productName, proc_productPrice, proc_sale, proc_categoryName);
    
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_delete_product;

DELIMITER //
CREATE PROCEDURE sp_delete_product(proc_productID INT)
BEGIN

    DELETE FROM Products WHERE productID = proc_productID;

END //


DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_product;

DELIMITER //
CREATE PROCEDURE sp_update_product(
    proc_productName VARCHAR(45), 
  proc_productPrice INT,
  proc_sale INT,
  proc_categoryName VARCHAR(45),
  proc_productID INT
)
BEGIN

    UPDATE Products SET productName = proc_productName, productPrice = proc_productPrice, sale = proc_sale, categoryName = proc_categoryName WHERE productID = proc_productID;

END //


DELIMITER ;

-- Order SP's

DROP PROCEDURE IF EXISTS sp_create_order;

DELIMITER //
CREATE PROCEDURE sp_create_order(
	  proc_employeeID INT, 
    proc_customerID INT, 
    proc_orderTotal INT, 
    proc_orderDate DATE
)
BEGIN

    INSERT INTO Orders (employeeID, customerID, orderTotal, orderDate) VALUES (proc_employeeID, proc_customerID, proc_orderTotal, proc_orderDate);

END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_delete_order;

DELIMITER //
CREATE PROCEDURE sp_delete_order(proc_orderID INT)
BEGIN

    DELETE FROM Orders WHERE orderID = proc_orderID;

END //


DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_order;

DELIMITER //
CREATE PROCEDURE sp_update_order(
    proc_employeeID INT, 
    proc_customerID INT, 
    proc_orderTotal INT, 
    proc_orderDate DATE, 
    proc_orderID INT
)
BEGIN

    UPDATE Orders SET employeeID = proc_employeeID, customerID = proc_customerID, orderTotal = proc_orderTotal, orderDate = proc_orderDate WHERE orderID = proc_orderID;

END //


DELIMITER ;

-- OrderItem SP's

DROP PROCEDURE IF EXISTS sp_create_orderItem;

DELIMITER //
CREATE PROCEDURE sp_create_orderItem(
	  proc_orderID INT, 
    proc_productID INT, 
    proc_quantity INT
)
BEGIN

    INSERT INTO OrderItems (orderID, productID, quantity) VALUES (proc_orderID, proc_productID, proc_quantity);

END //

DELIMITER ;

DROP PROCEDURE IF EXISTS sp_delete_orderItem;

DELIMITER //
CREATE PROCEDURE sp_delete_orderItem(proc_orderID INT, proc_productID INT)
BEGIN

    DELETE FROM Orders WHERE orderID = proc_orderID AND productID = proc_productID;

END //


DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_orderItem;

DELIMITER //
CREATE PROCEDURE sp_update_orderItem(
    proc_orderID INT, 
    proc_productID INT, 
    proc_quantity INT
)
BEGIN

    UPDATE OrderItems SET quantity = proc_orderID WHERE orderID = proc_productID AND productID = proc_quantity;

END //


DELIMITER ;