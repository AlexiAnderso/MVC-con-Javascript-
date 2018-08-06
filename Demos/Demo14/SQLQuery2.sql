create procedure uspOrdenGrabar
	@ListaOrden varchar(max)
as
begin
	Declare @idOrden int
	set @idOrden = -1
	
	Declare @pos int
	set @pos = CHARINDEX('_',@ListaOrden,0)
	Declare @orden varchar(10)
	Declare @detalle varchar(max)
	set @orden = SUBSTRING(@ListaOrden, 1, @pos-1)
	set @detalle = SUBSTRING(@ListaOrden, @pos+1,LEN(@ListaOrden)-@pos)
	
	set @pos = CHARINDEX('|',@orden, 0)
	declare @idCliente nvarchar(5)
	declare @idEmpleado int
	set @idCliente = CONVERT(nvarchar(5),substring(@orden,1,@pos-1))
	set @idEmpleado = CONVERT(int,substring(@orden,@pos+1,len(@orden)-@pos))
	
	Begin transaction
	insert into Orders(CustomerID,EmployeeID,OrdenDate) values (@idCliente,idEmpleado, getdate())
	set @idOrden = @@identity
	
	Declare Tabla Cursor For Select * from fnSplitString(@detalle,';')
	
	Open Tabla
	Declare @Columna varchar(max)
	Declare @idProducto int
	Declare @PrecioUnitario decimal(20,6)
	Declare @cantidad smallint
	Declare @pos1 int
	Declare @pos2 int
	
	Fetch Next From Tabla into @Columna
	while @@FETCH_STATUS = 0
	Begin 
		Set @pos1 = CharIndex('|',@Columna,0)
		Set @pos2 = CharIndex('|',@Columna,@pos1+1)
		
		Set @idProducto = Convert(int,substring(@Columna,1,@pos1-1))
		Set @PrecioUnitario = Convert(decimal(20,6),substring(@Columna,@
		Set @Cantidad = Convert(smallint,substring(@Columna,@pos2+1,1))
		
		insert into [Order Details](OrderID,ProducID,UnitPrice,Quantity,Disc
		Update Products set UnitsInStock=UnitsInStock-@Cantidad Where Pro
		Fetch Next From Tabla Into @Columna
	End
	Close Tabla;
	Deallocate Tabla;
	Commit Transaction
	return @idOrden;
End