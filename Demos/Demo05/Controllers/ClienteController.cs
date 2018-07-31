using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Northwind.Librerias.EntidadesNegocio;
using Northwind.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;

namespace Demo05.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Consulta()
        {
            return View();
        }

		public string lista() {
			string rpta = "";
			brCliente obrCliente = new brCliente();
			List<beCliente> lbeCliente = obrCliente.listar();
			if (lbeCliente != null && lbeCliente.Count > 0)
			{
				rpta = Objeto.Serializar(lbeCliente,'|',';',true,"",false);
			}

			return rpta;
		}
    }
}