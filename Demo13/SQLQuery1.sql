create procedure uspProductsAdicionarListar
@ProductName nvarchar(40),
@SupplierID int,
@CategoryID int,
@UnitPrice money,
@UnisInStock smallint
as
Insert Into Products
(ProductName, SupplierID, CategoryID, UnitPrice, UnitsInStock)
values
(@ProductName,@SupplierID,@CategoryID,@UnitPrice,@UnisInStock)
select ProductID, ProductName, SupplierID,CategoryID, UnitPrice,UnitsInStock
from Products
return @@identity

---

alter procedure uspProductsActualizarListar
@ProductID int,
@ProductName nvarchar(40),
@SupplierID int,
@CategoryID int,
@UnitPrice money,
@UnisInStock smallint
as
Begin
	declare @FilasAfectadas int
		update Products
		set ProductName = @ProductName,
		SupplierID = @SupplierID,
		CategoryID = @CategoryID,
		UnitPrice = @UnitPrice,
		UnitsInStock = @UnisInStock
		where ProductID = @ProductID
		
		set @FilasAfectadas = @@RowCount
		
		Select ProductID, ProductName, SupplierID, CategoryID, UnitPrice, UnitsInStock
		from Products
		
		return @FilasAfectadas
End
---
alter procedure uspProductsEliminarListar
@ProductID int
as
Begin
	declare @FilasAfectadas int
	Delete from Products
	where ProductID = @ProductID
	
	set @FilasAfectadas  = @@RowCount
	Select ProductID, ProductName, SupplierID, CategoryID, UnitPrice, UnitsInStock
	from Products
	
	return @FilasAfectadas
end
