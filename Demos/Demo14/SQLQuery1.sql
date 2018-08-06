create procedure uspOrderListas
as
select EmployeeID,LastName, FirstName from Employees
select CustomerID,CompanyName,Address From Customers
select ProductID, ProductName, UnitPrice, UnitsInStock From Products