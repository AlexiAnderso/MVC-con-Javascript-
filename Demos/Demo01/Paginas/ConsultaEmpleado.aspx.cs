using System;
using Demo01.Entidades;
using System.Web;
using System.IO;

namespace Demo01.Paginas
{
	public partial class ConsultaEmpleado : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

		protected void btnConsultar_Click(object sender, EventArgs e)
		{
			int idEmpleado = int.Parse(txtCodigo.Text);
			beEmpleado objEmpleado = new beEmpleado();
			objEmpleado.idEmpleado = idEmpleado;
			objEmpleado.Apellido = "Quesada";
			objEmpleado.Nombre = "Alexis";
			objEmpleado.Sueldo = 6000;
			Session["Empleado"] = objEmpleado;
			txtApellido.Text = objEmpleado.Apellido;
			txtNombre.Text = objEmpleado.Nombre;
			txtSueldo.Text = objEmpleado.Sueldo.ToString();

			Response.Write("Entiende");

			//asi se arroja un script en webform
			ClientScript.RegisterStartupScript(Page.GetType(), "Aviso", "alert('Empleado Consultado')", true);
		}

		public static void exportarArchivo(string archivo) {
			string tipo = "";
			string extension = Path.GetExtension(archivo).ToLower();
			if (extension.Equals(".txt")) tipo = "text/plain";
			else {
				if (extension.Equals(".xlsx")) tipo = "application/vnd.ms-excel";
				else tipo = "application/octet-stream";
			}
			HttpContext.Current.Response.Clear();
			HttpContext.Current.Response.ContentType = tipo;
			HttpContext.Current.Response.AppendHeader("Content-Disposition","attachment;filename=" + Path.GetFileName(archivo));
			HttpContext.Current.Response.TransmitFile(archivo);
			HttpContext.Current.Response.End(); //el END() corta la comunicacion 
		}

		protected void btnExportar_Click(object sender, EventArgs e)
		{
			beEmpleado objEmpleado = (beEmpleado)Session["Empleado"];

			//descargando un archivo
			string archivo = Server.MapPath("~/Archivos/Empleado.txt");
			//Response.WriteFile(archivo); pinta el archivo en el cliente
			//Response.TransmitFile(archivo);

			using (StreamWriter sw = new StreamWriter(archivo))
			{
				sw.WriteLine("Codigo: {0}", objEmpleado.idEmpleado);
				sw.WriteLine("Nombre: {0}", objEmpleado.Nombre);
				sw.WriteLine("Apellido: {0}", objEmpleado.Apellido);
				sw.WriteLine("Sueldo: {0}", objEmpleado.Sueldo);
			}


			exportarArchivo(archivo);

		}
	}
}