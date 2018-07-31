<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ConsultaEmpleado.aspx.cs" Inherits="Demo01.Paginas.ConsultaEmpleado" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link href="../Estilos/Estilo.css" rel="stylesheet" />    
	<title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
			<table>
				<tr class="Titulo">
					<td colspan="2">Demo 01: Ejemplo de Web Form</td>
				</tr>
				<tr class="Subtitulo">
					<td colspan="2">Consulta de Empleado</td>
				</tr>
				<tr>
					<td style="width:20%">Codigo: </td>
					<td style="width:80%"> 
						<asp:TextBox ID="txtCodigo" runat="server" /> 
					</td>
				</tr>
				<tr>
					<td>Apellido: </td>
					<td> 
						<asp:TextBox ID="txtApellido" runat="server" /> 
					</td>
				</tr>
				<tr>
					<td>Nombre: </td>
					<td> 
						<asp:TextBox ID="txtNombre" runat="server" /> 
					</td>
				</tr>
				<tr>
					<td>Sueldo: </td>
					<td> 
						<asp:TextBox ID="txtSueldo" runat="server" /> 
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<asp:Button ID="btnConsultar" Text="Consultar" runat="server" OnClick="btnConsultar_Click" />
						<asp:Button ID="btnExportar" Text="Exportar" runat="server" OnClick="btnExportar_Click" />
					</td>
				</tr>
			</table>
        </div>
    </form>
</body>
</html>
