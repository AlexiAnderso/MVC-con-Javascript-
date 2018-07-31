using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Demo03.Models;

namespace Demo03.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema
        public ActionResult Menu()
        {
            return View();
        }

		public string Saludo()
		{
			return "Hola";
		}

		public DateTime FechaHoraActual()
		{
			return DateTime.Now;
		}

		public JsonResult DatosEmpleado()
		{
			List<beEmpleado> lbeEmpleado = new List<beEmpleado>();
			// sintaxis corta para agregar objetos empleados
			beEmpleado objEmpleado1 = new beEmpleado() { idEmpleado = 1, Apellido = "Quesada", Nombre = "Alexis", Sueldo = 6000 };
			beEmpleado objEmpleado2 = new beEmpleado() { idEmpleado = 2, Apellido = "Gaitan", Nombre = "Ulises", Sueldo = 7000 };
			beEmpleado objEmpleado3 = new beEmpleado() { idEmpleado = 3, Apellido = "Einstain", Nombre = "Alber", Sueldo = 8000 };
			beEmpleado objEmpleado4 = new beEmpleado() { idEmpleado = 4, Apellido = "Tesla", Nombre = "Nicolas", Sueldo = 9000 };
			beEmpleado objEmpleado5 = new beEmpleado() { idEmpleado = 4, Apellido = "Bill", Nombre = "Gate", Sueldo = 10000 };
			lbeEmpleado.Add(objEmpleado1);
			lbeEmpleado.Add(objEmpleado2);
			lbeEmpleado.Add(objEmpleado3);
			lbeEmpleado.Add(objEmpleado4);
			lbeEmpleado.Add(objEmpleado5);

			JsonResult rpta = Json(lbeEmpleado, JsonRequestBehavior.AllowGet);

			return rpta;
		}

		public FileResult BajarArchivo() {
			string archivo = Server.MapPath("~/Archivos/Repaso_PC3.xlsx");
			byte[] buffer = System.IO.File.ReadAllBytes(archivo);
			//FileResult rpta = File(buffer, "text/plain"); para txt

			//para xlsx
			FileResult rpta = File(buffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			return rpta;
		}

		public JavaScriptResult mostrarMensaje() {
			StringBuilder sb = new StringBuilder();
			sb.AppendLine("function saludo()");
			sb.AppendLine("{");
			sb.AppendLine("alert('Hasta la vista amigo')");
			sb.AppendLine("}");
			sb.AppendLine("function crearTabla()");
			sb.AppendLine("{");
			sb.AppendLine("var contenido=''");
			sb.AppendLine("contenido+='<table>';");
			sb.AppendLine("contenido+='<tr><td>Codigo</td><td>Apellido</td><td>Nombre</td><td>Sueldo</td></tr>';");
			sb.AppendLine("contenido+='<tr><td>1</td><td>Quesada</td><td>Alexis</td><td>6000</td></tr>';");
			sb.AppendLine("contenido+='</table>';");
			sb.AppendLine("var divTabla = document.getElementById('divTabla');");
			sb.AppendLine("divTabla.innerHTML = contenido;");
			sb.AppendLine("}");
			JavaScriptResult rpta = JavaScript(sb.ToString());
			return rpta;
		}
	}
}