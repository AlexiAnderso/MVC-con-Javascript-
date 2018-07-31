create procedure uspCustomersListar
as
Select CustomerID, CompanyName, Address, ContactName
from Customers
go

exec uspCustomersListar

ALTER procedure dbo.uspCustomersListar
as 
select CustomerID, ISNULL(CompanyName,'') as CompanyName,
Address, ContactName from Customers
go