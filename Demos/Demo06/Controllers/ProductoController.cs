using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//
using Northwind.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
using Northwind.Librerias.EntidadesNegocio;

namespace Demo06.Controllers
{
    public class ProductoController : Controller
    {
        public ActionResult Consulta()
        {
            return View();
        }

		public string obtenerListas() {
			//vamos a devolver una cadena de string
			string rpta = "";
			string listaCategoria = "";
			string listaProducto = "";

			//creo el objeto de negocio, para obtener la lista
			brCatProd obrCatProd = new brCatProd();

			//obrCatprod.obtenerListas() me devuelve un obeCatPro
			beCatProd obeCatProd = obrCatProd.obtenerListas();

			//verifico que sea diferente de nulo
			if (obeCatProd.listaCategoria != null && obeCatProd.listaCategoria.Count > 0)
			{
				listaCategoria = Objeto.Serializar(obeCatProd.listaCategoria, '|', ';', false, "", false);
			}
			if (obeCatProd.listaProducto != null && obeCatProd.listaProducto.Count > 0)
			{
				listaProducto = Objeto.Serializar(obeCatProd.listaProducto, '|', ';', false, "", false);
			}

			rpta = string.Format("{0}_{1}", listaCategoria, listaProducto);
			//vamos a devolver una cadena de string
			return rpta;
		}
    }
}