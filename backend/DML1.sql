-- Data Manipulation Queries for The Fellowship

-- Customers -------------------------------------

-- get all customer info

SELECT customerID AS "Customer ID", firstName AS "First Name", lastName AS "Last Name", homeTown AS "Home Town" from Customers;

-- add customer

insert into Customers (firstName, lastName, homeTown)
VALUES
(@firstNameInput, @lastNameInput, @homeTownInput);

-- delete customer

delete from Customers where customerID = @customerIDInput;

-- update customer

update Customers set firstName = @firstNameInput,
                     lastName = @lastNameInput,
                     homeTown = @homeTownInput
where customerID = @customerIDInput;

-- JobRoles ---------------------------------------

-- get all job role info

SELECT j.jobID AS "Job ID", j.jobName AS "Job Name", j.pay as "Salary" from JobRoles j;

-- add jobRole

insert into JobRoles (jobName, pay)
values 
(@jobNameInput, @payInput);

-- delete jobRole

delete from JobRoles where jobID = @jobIDInput; 

-- update jobRole

update JobRoles set jobName = @jobNameInput, 
                    pay = @payInput 
where jobID = @jobIDInput;

-- Employees -------------------------------------

-- get all employee info

SELECT e.employeeID AS "Employee ID", e.firstName AS "First Name", e.lastName AS "Last Name", e.startDate AS "Start Date", e.jobID AS "Role ID", j.jobName AS "Role" FROM Employees e LEFT JOIN JobRoles j ON e.jobID = j.jobID;

-- jobRole info retrieval 

select jobName, pay from JobRoles;

-- add employee

insert into Employees (firstName, lastName, startDate, jobID)
values 
(@firstNameInput, @lastNameInput, @startDateInput,
(select jobID from JobRoles where jobName = @jobNameInput));

-- delete employee

delete from Employees where employeeID = @employeeIDInput;

-- update employee

update Employees set firstName = @firstNameInput,
                     lastName = @lastNameInput,
                     startDate = @startDateInput,
                     jobID = @jobIDInput
where employeeID = @employeeIDInput;

-- Products ---------------------------------------

-- get all product info 

SELECT productID as "Product ID", productName AS "Product Name", productPrice AS "Product Price", sale AS "Sale", categoryName as "Category" from Products;

-- add product 

insert into Products (productName, productPrice, sale, categoryName)
values 
(@productNameInput, @productPriceInput, @saleInput, @categoryNameInput);

-- delete product

delete from Products where productID = @productIDInput;

-- update product 

update Products set productName = @productNameInput,
                    productPrice = @productPriceInput,
                    sale = @saleInput,
                    categoryName = @categoryNameInput
where productID = @productIDInput;

-- Orders ----------------------------------------- 

-- get all order info

SELECT o.orderID as "Order ID", o.employeeID AS "Employee ID", e.firstName as "Employee Name", o.customerID AS "Customer ID", c.firstName AS "Customer Name", o.orderTotal AS "Order Total", o.orderDate AS "Order Date" from Orders o LEFT JOIN Employees e ON o.employeeID = e.employeeID LEFT JOIN Customers c on o.customerID = c.customerID;

-- delete order

delete from Orders where orderID = @orderIDInput;

-- OrderItems -------------------------------------

-- get all orderitem info

SELECT o.orderID AS "Order ID", o.productID AS "Product ID", p.productName AS "Product Name", o.quantity AS "Quantity" from OrderItems o LEFT JOIN Products p ON o.productID = p.productID;

-- add orderItems

insert into OrderItems (orderID, productID, quantity)
values
(@orderIDInput, @productIDInput, @quantityInput);

-- delete ordertimes

delete from OrderItems where orderID = @orderIDInput and productID = @productIDInput;

-- update quantity 

update OrderItems set quantity = @quantityInput where orderID = @orderIDInput and productID = @productIDInput;