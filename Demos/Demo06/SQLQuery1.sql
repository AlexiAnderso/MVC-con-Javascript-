use Northwind
go
--
create procedure uspCategoriesProductsListar
as
Select CategoryID, CategoryName from Categories
Select ProductID, ProductName, SupplierID,CategoryID, UnitPrice, UnitsInStock
from Products

exec uspCategoriesProductsListar