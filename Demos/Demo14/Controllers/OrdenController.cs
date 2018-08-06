using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//
using Northwind.Librerias.EntidadesNegocio;
using Northwind.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;


namespace Demo14.Controllers
{
	public class OrdenController : Controller
	{
		// GET: Orden
		public ActionResult Nueva()
		{
			return View();
		}

		public string obtenerListas()
		{
			string rpta = "";
			string listaEmpleado = "";
			string listaCliente = "";
			string listaProducto = "";
			string archivo = "";

			brOrden obrOrden = new brOrden();
			beOrdenListas obeOrdenListas = obrOrden.obtenerLista();
			if (obeOrdenListas != null)
			{
				if (obeOrdenListas.ListaEmpleado != null && obeOrdenListas.ListaEmpleado.Count > 0)
				{
					archivo = Server.MapPath("~/Archivo/EstEmpleado.txt");
					listaEmpleado = Objeto.Serializar(obeOrdenListas.ListaEmpleado, '|', ';', false, archivo, false);
				}
				if (obeOrdenListas.ListaCliente != null && obeOrdenListas.ListaCliente.Count > 0)
				{
					archivo = Server.MapPath("~/Archivo/EstCliente.txt");
					listaCliente = Objeto.Serializar(obeOrdenListas.ListaCliente, '|', ';', false, archivo, false);
				}
				if (obeOrdenListas.ListaProducto != null && obeOrdenListas.ListaProducto.Count > 0)
				{
					archivo = Server.MapPath("~/Archivo/EstProducto.txt");
					listaProducto = Objeto.Serializar(obeOrdenListas.ListaProducto, '|', ';', false, archivo, false);
				}
				rpta = String.Format("{0}_{1}_{2}", listaEmpleado, listaCliente, listaProducto);
			}
			return rpta;
		}

		public string grabar(string listaOrden)
		{
			string rpta = "";
			brOrden obrOrden = new brOrden();
			rpta = obrOrden.grabar(listaOrden);
			return rpta;
		}
	}
}