using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Northwind.Librerias.EntidadesNegocio;
using Northwind.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;

namespace Demo07.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Cliente
        public ActionResult Consulta()
        {
            return View();
        }

		public string listar() {
			string rpta = "";
			brProducto obrProducto = new brProducto();
			List<beProducto> lbeProducto = obrProducto.Listar();
			if (lbeProducto != null && lbeProducto.Count > 0)
			{
				rpta = Objeto.Serializar(lbeProducto, '|',';',false,"",false);
			}

			return rpta;
		}
    }
}