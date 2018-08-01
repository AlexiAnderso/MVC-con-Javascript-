using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Northwind.Librerias.EntidadesNegocio;
using Northwind.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;

namespace Demo12.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Cliente
        public ActionResult Consulta()
        {
            return View();
        }

		public string obtenerListas()
		{
			//vamos a devolver una cadena de string
			string rpta = "";
			string listaProveedor = "";
			string listaCategoria = "";
			string listaProducto = "";

			//creo el objeto de negocio, para obtener la lista
			brProvCatProd obrProvCatProd = new brProvCatProd();

			//obrCatprod.obtenerListas() me devuelve un obeCatPro
			beProvCatProd obeProvCatProd = obrProvCatProd.obtenerListas();


			if (obeProvCatProd.ListaProveedor != null && obeProvCatProd.ListaProveedor.Count > 0)
			{
				//listaProducto = Objeto.SerializarLista(obeProvCatProd.ListaProveedor, '|', ':', false, "", false);
				listaProveedor = Objeto.Serializar(obeProvCatProd.ListaProveedor, '|', ';', false, "", false);
			}

			//verifico que sea diferente de nulo
			if (obeProvCatProd.ListaCategoria != null && obeProvCatProd.ListaCategoria.Count > 0)
			{
				listaCategoria = Objeto.Serializar(obeProvCatProd.ListaCategoria, '|', ';', false, "", false);
			}
			if (obeProvCatProd.ListaProducto != null && obeProvCatProd.ListaProducto.Count > 0)
			{
				listaProducto = Objeto.Serializar(obeProvCatProd.ListaProducto, '|', ';', false, "", false);
			}

			rpta = string.Format("{0}_{1}_{2}", listaProveedor, listaCategoria, listaProducto);
			//vamos a devolver una cadena de string
			return rpta;
		}

		public string grabar(beProducto obeProducto)
		{
			string rpta = "";

			brProducto obrProducto = new brProducto();
			beRptaProducto obeRptaProducto = null;
			if (obeProducto.idProducto == 0) obeRptaProducto = obrProducto.adicionar(obeProducto);
			else obeRptaProducto = obrProducto.actualizar(obeProducto);
			if (obeRptaProducto != null)
			{
				string listaProducto = "";
				if (obeRptaProducto.ListaProducto != null && obeRptaProducto.ListaProducto.Count > 0)
				{
					listaProducto = Objeto.Serializar(obeRptaProducto.ListaProducto, '|', ';', false, "", false);
				}
				rpta = string.Format("{0}_{1}", obeRptaProducto.Rpta, listaProducto);
			}

			return rpta;
		}

		public string eliminar(int idProducto)
		{
			string rpta = "";

			brProducto obrProducto = new brProducto();
			beRptaProducto obeRptaProducto = obrProducto.eliminar(idProducto);
			if (obeRptaProducto != null)
			{
				string listaProducto = "";
				if (obeRptaProducto.ListaProducto != null && obeRptaProducto.ListaProducto.Count > 0)
				{
					listaProducto = Objeto.Serializar(obeRptaProducto.ListaProducto, '|', ';', false, "", false);
				}
				rpta = string.Format("{0}_{1}", obeRptaProducto.Rpta, listaProducto);
			}

			return rpta;
		}
	}
}