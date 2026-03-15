DROP PROCEDURE IF EXISTS reset_schema;
DELIMITER //

CREATE PROCEDURE sp_reset_database()
BEGIN

    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS Customers, JobRoles, Employees, Products, Orders, OrderItems;

    --------------------------------
    --Create table section
    --------------------------------

    CREATE OR REPLACE TABLE Customers (
    customerID int NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    homeTown VARCHAR(45) NOT NULL,
    PRIMARY KEY (customerID)
    ) ENGINE=InnoDB;
    --Must Bring in Job Roles before Employees, as is referenced in employees. 
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
        ON DELETE RESTRICT
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

    --------------------------------
    --Insert data section
    --------------------------------

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

    SET FOREIGN_KEY_CHECKS = 1;

END //

DELIMITER ;
