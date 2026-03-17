--Group 16, Wyatt Buckman, Jackson Manriquez

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS Customers, JobRoles, Employees, Products, Orders, OrderItems;

SET FOREIGN_KEY_CHECKS=1;
--------------------------------
--Create table section
--------------------------------

CREATE TABLE Customers (
  customerID int NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  homeTown VARCHAR(45) NOT NULL,
  PRIMARY KEY (customerID)
) ENGINE=InnoDB;
--Must Bring in Job Roles before Employees, as is referenced in employees. 
CREATE TABLE JobRoles (
  jobID int NOT NULL AUTO_INCREMENT,
  jobName VARCHAR(45) NOT NULL,
  pay int NOT NULL,
  PRIMARY KEY (jobID)
) ENGINE=InnoDB;

CREATE TABLE Employees (
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

CREATE TABLE Products (
  productID int NOT NULL AUTO_INCREMENT, 
  productName VARCHAR(45) NOT NULL, 
  productPrice decimal(10, 2) NOT NULL,
  sale int,
  categoryName VARCHAR(45) NOT NULL,
  PRIMARY KEY (productID)
) ENGINE=InnoDB;
-- Can finally create Orders table
CREATE TABLE Orders (
  orderID int NOT NULL AUTO_INCREMENT, 
  employeeID int NOT NULL,
  customerID int NOT NULL,
  orderTotal decimal(10, 2) NOT NULL DEFAULT 0,
  orderDate date NOT NULL,
  PRIMARY KEY (orderID),
  FOREIGN KEY (employeeID) 
    REFERENCES Employees(employeeID)
    ON DELETE RESTRICT,
  FOREIGN KEY (customerID) 
    REFERENCES Customers(customerID)
    ON DELETE CASCADE
) ENGINE=InnoDB;
  
CREATE TABLE OrderItems (
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
  ('Beer', 2, 'Drinks')
;

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
