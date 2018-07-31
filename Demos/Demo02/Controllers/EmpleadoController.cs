using System.Web.Mvc;
using Demo02.Models;

namespace Demo02.Controllers
{
	// Clase de tipo controlador
    public class EmpleadoController : Controller
    {
        // GET: Empleado
		// Metodo de accion
        public ActionResult Consulta(int? idEmpleado,string operacion)
        {
			beEmpleado objEmpleado = new beEmpleado();
			if (idEmpleado != null)
			{

				switch (operacion)
				{
					case "Consultar":
						objEmpleado.idEmpleado = idEmpleado.Value;
						objEmpleado.Apellido = "Quesada";
						objEmpleado.Nombre = "Alexis";
						objEmpleado.Sueldo = 6000;
						TempData["Empleado"] = objEmpleado;
						break;
					case "Exportar":

						objEmpleado = (beEmpleado)TempData["Empleado"];

						//descargando un archivo
						string archivo = Server.MapPath("~/Archivos/Empleado.txt");
						//Response.WriteFile(archivo); pinta el archivo en el cliente
						//Response.TransmitFile(archivo);

						using (System.IO.StreamWriter sw = new System.IO.StreamWriter(archivo))
						{
							sw.WriteLine("Codigo: {0}", objEmpleado.idEmpleado);
							sw.WriteLine("Nombre: {0}", objEmpleado.Nombre);
							sw.WriteLine("Apellido: {0}", objEmpleado.Apellido);
							sw.WriteLine("Sueldo: {0}", objEmpleado.Sueldo);
						}

						byte[] buffer = System.IO.File.ReadAllBytes(archivo);
						FileResult rpta = File(buffer, "text/plain");
						// FALTO DESCARGAR EL ARCHIVO 
						break;
				}

				

				//para que valla al otro lado, osea para que guarde parecido a un session
				//viewbag, tiene sintaxis a lo objeto
				//ViewBag.idEmpleado = objEmpleado.idEmpleado;
				//ViewBag.Apellido = objEmpleado.Apellido;

				//viewdata, tiene sintaxis a lo diccionario
				/*ViewData["idEmpleado"] = objEmpleado.idEmpleado;
				ViewData["Apellido"] = objEmpleado.Apellido;
				ViewData["Nombre"] = objEmpleado.Nombre;
				ViewData["Sueldo"] = objEmpleado.Sueldo;*/
			}
			//retorna una vista = view
            return View(objEmpleado);
        }
    }
}