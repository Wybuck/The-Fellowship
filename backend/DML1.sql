-- Data Manipulation Queries for The Fellowship

-- Customers -------------------------------------

-- get all customer info

select * from Customers;

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

select * from JobRoles;

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

select * from Employees;

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

select * from Products;

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

select * from Orders;

-- delete order

delete from Orders where orderID = @orderIDInput;

-- OrderItems -------------------------------------

-- get all orderitem info

select * from OrderItems;

-- add orderItems

insert into OrderItems (orderID, productID, quantity)
values
(@orderIDInput, @productIDInput, @quantityInput);

-- delete ordertimes

delete from OrderItems where orderID = @orderIDInput and productID = @productIDInput;

-- update quantity 

update OrderItems set quantity = @quantityInput where orderID = @orderIDInput and productID = @productIDInput;