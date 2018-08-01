var listaProducto;
var matriz = [];
var orden = 0;

//demo10
var registrosPagina = 15;
var indiceActualPagina = 0;

//demo11
var paginasBloque = 5;
var indiceActualBloque = 0;

//demo12
var textoExportar;
var cabeceras = [];
var excelExportar;

window.onload = function () {
	var url = "Producto/obtenerListas";
	enviarServidor(url, mostrarListas);
	
}

function enviarServidor(url, metodo) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			metodo(xhr.responseText);
		}
	}
	xhr.send();
}

function crearTabla() {
	var nCampos;
	var campos;

	//se coloca una tabla
	var contenido = "<table><thead>";

	cabeceras = ["Codigo", "Descripcion", "Proveedor", "Categoria", "Precio Unitario", "Stock"];

	//el numero de campos de la cabecera
	nCampos = cabeceras.length;

	contenido += "<tr class='FilaCabecera'><th colspan='7' style='text-align:center'><a href='#' id='aExportarTexto'>Exportar Texto<a/>&nbsp;&nbsp;<a href='#' id='aExportarExcel'>Exportar Excel</a></th>";

	//creo una fila cabecera para la cabecera
	contenido += "<tr class='FilaCabecera'><th style='text-align:center'><img id='imgNuevo'src='../Imagenes/Nuevo.png' width='20px' height='20px' alt='' title='Nuevo Producto' style='cursor:pointer' onclick='mostrarDetalle(1);'/></th>";

	// hago un for para sacar los datos de la cabecera
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th><a href='#' class='link' id='a";
		contenido += j.toString();
		contenido += "'>";
		//agrego los datos de la cabecera
		contenido += cabeceras[j];
		contenido += "</a><span class='span' id='spn";
		contenido += j.toString();;
		contenido += "'></span><br/><input type='text' class='texto' style='width:95%'/></th>";
	}
	//cierro el THEAD de la cabecera y creo el TBODY para los datos
	contenido += "</tr></thead><tbody id='tbProducto'></tbody></table>";

	//toda la cabecera lo muestro en el divCliente
	var divProducto = document.getElementById("divProducto");
	divProducto.innerHTML = contenido;
}


function crearMatriz() {

	//toma de nuevo la lista del string (listaProductos) y lo guar en nRegistros

	var nRegistros = listaProducto.length;
	var nCampos;
	var campos;
	var c = 0;
	var textos = document.getElementsByClassName("texto");

	//Se inicializa la matriz en vacio
	matriz = [];

	var texto;
	var exito;
	var nTextos = textos.length;

	//hago un FOR comenzando de i = 0
	for (var i = 1; i < nRegistros; i++) {
		campos = listaProducto[i].split("|");
		nCampos = campos.length;
		exito = true;
		for (var j = 0; j < nTextos; j++) {
			texto = textos[j];
			//al DATO q esta en cada columna (campos[j]) lo convierto a minuscula (.toLowerCase)
			//y digo si se encuentra (.indexOf(textos[j].value)) o si dentro de DATO hay contenido
			// de lo escribo en el texto
			exito = exito && campos[j].toLowerCase().indexOf(texto.value.toLowerCase()) > -1;
			if (!exito) break;
		}
		if (exito) {		
			matriz[c] = [];
			for (var j = 0; j < nCampos; j++) {
				//cada fila tiene su columna (coge una celda)
				// si el array recibe cadena mostramos cadena, si no multiplicamos por 1
				// para obtener numero
				if (isNaN(campos[j])) matriz[c][j] = campos[j];

				else matriz[c][j] = campos[j] * 1;
			}
			c++;
		}
	}
}

function mostrarMatriz(indicePagina) {
	var esBloque = false;
	var contenido = "";
	var nRegistros = matriz.length;
	if (nRegistros > 0) {
		var esBloque = (indicePagina < 0);
		var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
		if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
		var indiceUltimaBloque = Math.floor(nRegistros / (registrosPagina * paginasBloque));
		if (nRegistros % (registrosPagina * paginasBloque) == 0) indiceUltimaBloque--;
		if (esBloque) {
			switch (indicePagina) {
				case -1:
					indicePagina = 0;
					indiceActualBloque = 0;
					break;
				case -2:
					if (indiceActualBloque > 0) {
						indiceActualBloque--;
						indicePagina = indiceActualBloque * paginasBloque;
					}
					break;
				case -3:
					if (indiceActualBloque < indiceUltimaBloque) {
						indiceActualBloque++;
						indicePagina = indiceActualBloque * paginasBloque;
					}
					break
				case -4:
					indicePagina = indiceUltimaPagina;
					indiceActualBloque = indiceUltimaBloque;
				default:
			}
		}
		indiceActualPagina = indicePagina;
		//se guarda el tamano de la matriz a mostrar 
		var nRegistros = matriz.length;

		//guardo los campos de una fila (matriz[0] = la primera fila)
		//(matriz[0].length = obtengo el numero de campos de esa fila ) en nCampos
		var nCampos = matriz[0].length;

		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;

		for (var i = inicio; i < fin; i++) {
			if (i < nRegistros) {
				//se inicializa una fila a mostrar con el <tr>
				contenido += "<tr class='FilaDatos'><td>";
				contenido += "<img src='../Imagenes/Editar.png' width='20px' height='20px' alt='' title='Editar Producto' style='cursor:pointer' onclick='mostrarDetalle(2,"
				contenido += matriz[i][0];
				contenido += ");'/>";
				contenido += "<img src='../Imagenes/Eliminar.png' width='20px' height='20px' alt='' title='Eliminar Producto' style='cursor:pointer' onclick='eliminarProducto("
				contenido += matriz[i][0];
				contenido += ");'/>";
				contenido += "</td>";

				for (var j = 0; j < nCampos; j++) {
					//se inicializa el numero de campos por fila
					contenido += "<td>";
					contenido += matriz[i][j];
					contenido += "</td>";
				}
				//cierro la fila
				contenido += "</tr>";
			}
			else break;
		}
	}
	//muestro las filas y campos en el cuerpo TBODY de la tabla
	var tbProducto = document.getElementById("tbProducto");
	tbProducto.innerHTML = contenido;

	//mostrarMatriz() siempre debe de llamar a mostrarTotal();
	mostrarTotal();


	if (esBloque < 0) {
		configurarPaginacion();
	}

	seleccionarBoton(indicePagina);
}

function mostrarListas(rpta) {
	if (rpta != "") {
		//rpta.split genera varias listas
		var listas = rpta.split("_");
		var listaProveedor = listas[0].split(";");
		llenarCombo(listaProveedor, "cboProveedor", "Seleccione");
		var listaCategoria = listas[1].split(";");
		llenarCombo(listaCategoria, "cboCategoria", "Seleccione");
		listaProducto = listas[2].split(";");
		listarProductos();
	}
}

function listarProductos() {
	crearTabla();
	configurarFiltro();
	crearMatriz();
	configurarPaginacion();
	mostrarMatriz(0);
	configurarOrdenacion();
	configurarExportacion();
	configurarBotonesDetalle();
}


function mostrarTotal() {
	var spnMensaje = document.getElementById("spnMensaje");
	spnMensaje.innerHTML = "<b>Total de registros encontrados : " + matriz.length + "</b>"; 
}

function configurarOrdenacion() {
	var links = document.getElementsByClassName("link");
	if (links != null && links.length > 0) {
		var nLinks = links.length;
		var link;
		var id;
		var spn;
		var simbolo = "";
		for (var i = 0; i < nLinks; i++) {
			link = links[i];
			link.onclick = function () {
				//con substring se hace q apartir de 1 extrae la cantidada de caracteres (this.id.lenght)
				id = this.id.substring(1, this.id.length);
				orden = id;
				spn = document.getElementById("spn" + id);
				simbolo = spn.innerHTML;
				if (simbolo == "") {
					simbolo = "▲"; //alt + 30
					matriz.sort(ascendente);
				} else {
					if (simbolo == "▲") {
						simbolo = "▼";
						matriz.sort(descendente);
					} else {
						simbolo = "▲";
						matriz.sort(ascendente);
					}
				}
				limpiarSpans();
				spn.innerHTML = simbolo;
				mostrarMatriz(0);
			}
		}
	}
}

function limpiarSpans() {
	var spans = document.getElementsByClassName("span");
	if (spans != null && spans.length > 0) {
		var nSpans = spans.length;
		var span;
		var id;
		for (var i = 0; i < nSpans; i++) {
			span = spans[i];
			span.innerHTML = "";
		}
	}
}

function ascendente(a,b) {
	var x = a[orden];
	var y = b[orden];

	//si X es igual a Y devolvemos (?) 0, caso contrario (:) 1
	//si X es mayor a Y devolvemos (?) 1, caso contrario (:) -1
	return (x==y?0:(x>y?1:-1));
}

function descendente(a, b) {
	var x = a[orden];
	var y = b[orden];
	return (x == y ? 0 : (x < y ? 1 : -1));
}

function configurarPaginacion() {
	var contenido = "";
	var nRegistros = matriz.length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimaBloque = Math.floor(nRegistros / (registrosPagina * paginasBloque));
	if (nRegistros % (registrosPagina * paginasBloque) == 0) indiceUltimaBloque--;
	var existeBloques = matriz.length > (paginasBloque * registrosPagina);
	if (existeBloques && indiceActualBloque>0) {
		contenido += "<input type='button' class='boton' value='<<' onclick='mostrarMatriz(-1);'/>";
		contenido += "<input type='button' class='boton' value='<' onclick='mostrarMatriz(-2);'/>";
	}
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	for (var i = inicio; i < fin; i++) {
		if (i <= indiceUltimaPagina) {
			contenido += "<input type='button' class='boton' value='";
			contenido += (i + 1).toString();
			contenido += "' onclick='mostrarMatriz(";
			contenido += i.toString();
			contenido += ")' id='btn";
			contenido += i.toString();
			contenido += "'/>";
		}
	}
	if (existeBloques && indiceActualBloque < indiceUltimaBloque) {
		contenido += "<input type='button' class='boton' value='>' onclick='mostrarMatriz(-3);'/>";
		contenido += "<input type='button' class='boton' value='>>' onclick='mostrarMatriz(-4);'/>";
	}

	var divPagina = document.getElementById("divPagina");
	divPagina.innerHTML = contenido;
}

function seleccionarBoton(indicePagina) {
	var botones = document.getElementsByClassName("boton");
	if (botones != null && botones.length > 0) {
		var nBotones = botones.length;
		var boton;
		for (var i = 0; i < nBotones; i++) {
			boton = botones[i];
			boton.style.backgroundColor = "blue";
			boton.style.color = "white";
		}
	}
	/*var btn = document.getElementById("btn" + indicePagina);
	btn.style.backgroundColor = "yellow";
	btn.style.color = "blue";*/
}

function configurarFiltro() {

	//cojo todos los elementos con el nombre de clase 'textos' y lo guardo en la variable textos
	var textos = document.getElementsByClassName("texto");

	//valido si la variable textos es nula o mayor a 0
	if (textos != null && textos.length > 0) {

		//obtengo el numero de textos, y lo guardo en la variable nTextos
		var nTextos = textos.length;

		// creo una valiable para un solo texto
		var texto;

		//recorro 
		for (var i = 0; i < nTextos; i++) {
			//cojo un texto
			texto = textos[i];
			texto.onkeyup = function () {
				crearMatriz();
				configurarPaginacion();
				indiceActualBloque = 0;
				indiceActualPagina = 0;
				mostrarMatriz(0);
			}
		}
	}
}

function crearTextoExportar() {
	var nRegistros = matriz.length;
	textoExportar = "";
	if (nRegistros > 0) {

		//obteniendo las cabeceras
		var nCampos = matriz[0].length;
		for (var j = 0; j < nCampos; j++) {
			//leyendo la matriz
			textoExportar += cabeceras[j];
			textoExportar += ",";
		}
		textoExportar = textoExportar.substring(0, textoExportar.length - 1);

		// el \r\n es el enter en block de notas
		textoExportar += "\r\n";

		for (var i = 0; i < nRegistros; i++) {
			for (var j = 0; j < nCampos; j++) {
				//leyendo la matriz
				textoExportar += matriz[i][j];
				textoExportar += ",";
			}
			textoExportar = textoExportar.substring(0, textoExportar.length - 1);

			// el \r\n es el enter en block de notas
			textoExportar += "\r\n";
		}
		textoExportar = textoExportar.substring(0, textoExportar.length - 2);
	}
}

function crearExcelExportar() {
	excelExportar = "<html><head><meta charset='utf-8'/></head><table><tr>";
	var nRegistros = matriz.length;
	if (nRegistros > 0) {
		var nCampos = matriz[0].length;
		for (var j = 0; j < nCampos; j++) {
			excelExportar += "<td style='background-Color:\"#337AB7\"; color:\"\#FFF\"'>";
			//leyendo la matriz
			excelExportar += cabeceras[j];
			excelExportar += "</td>";
		}
		excelExportar += "</tr>";

		for (var i = 0; i < nRegistros; i++) {
			excelExportar += "<tr>";
			for (var j = 0; j < nCampos; j++) {
				excelExportar += "<td>";

				//leyendo la matriz
				excelExportar += matriz[i][j];
				excelExportar += "</td>";
			}
			excelExportar += "</tr>";
		}
		excelExportar += "</table></html>";
	}
}


function configurarExportacion() {
	var aExportarTexto = document.getElementById("aExportarTexto");
	aExportarTexto.onclick = function () {
		crearTextoExportar();
		var contenido = new Blob([textoExportar], { type: 'text/plain' });
		this.download = "Productos.txt";
		this.href = window.URL.createObjectURL(contenido);
	}

	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		crearExcelExportar();
		var formBlod = new Blob([excelExportar], { type:'application/vnd.ms-excel' });
		this.download = "Productos.xls";
		this.href = window.URL.createObjectURL(formBlod);
	}
}

function llenarCombo(lista, idCombo, primerItem) {
	var contenido = "";

	//obtengo el idCombo
	var cbo = document.getElementById(idCombo);

	//si primeritem es nulo, inicializa el primer elemanto en algo
	if (primerItem != null) {
		contenido = "<option value=''>" + primerItem + "</option>";
	}

	//obtengo el numero de listas
	var nRegistros = lista.length;
	var nCampos;
	var campos;

	//recoro todo el numero de registros
	for (var i = 0; i < nRegistros; i++) {

		// obtengo los campos de la lista (lista[i] es una fila, con .split("|") obtengo los campos)
		campos = lista[i].split("|");
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
	}

	//si existe ese ID de combo 
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function mostrarDetalle(opcion, id) {
	var divPopup = document.getElementById("divPopup");
	divPopup.style.display = "inline-block";
	var spnTitulo = document.getElementById("spnTitulo");
	switch (opcion) {
		case 1:
			spnTitulo.innerHTML = "Adicionar";
			document.getElementById("spnIdProducto").innerHTML = "";
			document.getElementById("txtNombre").value = "";
			document.getElementById("cboProveedor").value = "";
			document.getElementById("cboCategoria").value = "";
			document.getElementById("txtPrecio").value = "";
			document.getElementById("txtStock").value = "";
			break;
		case 2:
			spnTitulo.innerHTML = "Actualizar";
			var exito = false;
			var pos = -1;
			var nRegistros = matriz.length;
			for (var i = 0; i < nRegistros; i++) {
				if (matriz[i][0] == id) {
					exito = true;
					pos = i;
					break;
				}
			}
			if (exito) {
				document.getElementById("spnIdProducto").innerHTML = matriz[pos][0];
				document.getElementById("txtNombre").value = matriz[pos][1];
				document.getElementById("cboProveedor").value = matriz[pos][2];
				document.getElementById("cboCategoria").value = matriz[pos][3];
				document.getElementById("txtPrecio").value = matriz[pos][4];
				document.getElementById("txtStock").value = matriz[pos][5];
			}
			break;
	}
}

function configurarBotonesDetalle() {
	var imgCerrar = document.getElementById("imgCerrar");
	imgCerrar.onclick = function () {
		cerrarVentana();
	}

	var btnCerrar = document.getElementById("btnCerrar");
	btnCerrar.onclick = function () {
		cerrarVentana();
	}

	var btnGrabar = document.getElementById("btnGrabar");
	btnGrabar.onclick = function () {
		if (validarFormulario()) {
			var url = "Producto/grabar";
			enviarServidorPost(url, actualizarLista);
		}
	}
}

function cerrarVentana() {
	var divPopup = document.getElementById("divPopup");
	divPopup.style.display = "none";
}

function validarFormulario() {

	var spnMensajeDetalle = document.getElementById("spnMensajeDetalle");
	var txtNombre = document.getElementById("txtNombre");
	var cboProveedor = document.getElementById("cboProveedor");
	var cboCategoria = document.getElementById("cboCategoria");
	var txtPrecio = document.getElementById("txtPrecio");
	var txtStock = document.getElementById("txtStock");

	var mensaje = "";
	if (txtNombre.value == "") {
		mensaje += "<li>Falta Ingresar el Nombre</li>";
	}
	if (cboProveedor.value == "") {
		mensaje += "<li>Falta seleccionar la categoria</li>";
	}
	if (cboCategoria.value == "") {
		mensaje += "<li>Falta seleccionar la categoria</li>";
	}
	if (txtPrecio.value == "") {
		mensaje += "<li>Falta Ingresar el Precio</li>";
	}
	if (txtStock.value == "") {
		mensaje += "<li>Falta Ingresar el Stock</li>";
	}
	if (mensaje != "") spnMensajeDetalle.innerHTML = "<ul>" + mensaje + "</ul>";
	else spnMensajeDetalle.innerHTML = "";
	return (mensaje == "")
}

function enviarServidorPost(url, metodo) {
	var xhr = new XMLHttpRequest();
	xhr.open("post", url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			metodo(xhr.responseText);
		}
	}

	//formData es parte de HTML5
	var frm = new FormData();
	var spnIdProducto = document.getElementById("spnIdProducto");
	var txtNombre = document.getElementById("txtNombre");
	var cboProveedor = document.getElementById("cboProveedor");
	var cboCategoria = document.getElementById("cboCategoria");
	var txtPrecio = document.getElementById("txtPrecio");
	var txtStock = document.getElementById("txtStock");

	// los datos del objeto tienen que coincidor con el nombre del append ("idProducto")
	frm.append("idProducto", spnIdProducto.innerText == "" ? 0 : spnIdProducto.innerText);
	frm.append("Nombre", txtNombre.value);
	frm.append("idProveedor", cboProveedor.value);
	frm.append("idCategoria", cboCategoria.value);
	frm.append("PrecioUnitario", txtPrecio.value);
	frm.append("Stock", txtStock.value);
	xhr.send(frm);

	// si se utiliza el POST (xhr.open("post")) se puede enviar los datos por el 
	// FormData (frm) al servidor.
}


function actualizarLista(rpta) {
	if (rpta != "") {
		var data = rpta.split("_");
		var res = data[0];
		var spnTitulo = document.getElementById("spnTitulo");
		var operacion = spnTitulo.innerText;
		switch (operacion) {
			case "Adicionar":
				if (res != "") {
					alert("Se adiciono el Producto con id: " + res);
				} else alert("No se adiciono el Producto");
				break;
			case "Actualizar":
				if (res == "true") {
					alert("Se actualizo el Producto");
				} else alert("No se actualizo el Producto");
				break;
		}
		listaProducto = data[1].split(";");
		listarProductos();
		cerrarVentana();
	}
}

function eliminarProducto(id) {
	if (confirm("Seguro de Eliminar") == false) return false;
	var url = "Producto/eliminar/?idProducto=" + id;
	enviarServidor(url, actualizarEliminar);
}

function actualizarEliminar(rpta) {
	if (rpta != "") {
		var data = rpta.split("_");
		var res = data[0];
		if (res == "true") alert("Se elimino el producto");
		else alert("No se pudo eliminar el producto");
		listaProducto = data[1].split(";");
		listarProductos();
		cerrarVentana();
	}
}