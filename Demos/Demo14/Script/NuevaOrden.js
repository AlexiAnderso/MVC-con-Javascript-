var listaEmpleado;
var listaCliente;
var listaProducto;
var listaOrden;
var opcion = "";
//demo14

var matriz = [];
var orden = 0;
var registrosPagina = 10;
var indiceActualPagina = 0;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceUltimoPagina;
var filaActual;




window.onload = function () {
	var url = "Orden/obtenerListas";
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

function crearTabla(cabeceras) {
	var nCampos;
	var campos;

	//se coloca una tabla
	var contenido = "<table><thead>";

	//el numero de campos de la cabecera
	nCampos = cabeceras.length;

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
	contenido += "</tr></thead><tbody id='tbTabla'></tbody></table>";

	//toda la cabecera lo muestro en el divCliente
	var divTabla = document.getElementById("divTabla");
	divTabla.innerHTML = contenido;
}

function crearMatriz(lista) {

	//toma de nuevo la lista del string (listaProductos) y lo guar en nRegistros

	var nRegistros = lista.length;
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
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("|");
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
					break;
				case -4:
					indicePagina = indiceUltimaPagina;
					indiceActualBloque = indiceUltimaBloque;
					break;
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
				contenido += "<tr class='FilaDatos' onclick='seleccionarFila(this);'>";
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
	var tbTabla = document.getElementById("tbTabla");
	tbTabla.innerHTML = contenido;

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
		listaEmpleado = listas[0].split(";");
		listaCliente = listas[1].split(";");
		listaProducto = listas[2].split(";");
		configurarBotones();
	}
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

function configurarFiltro(lista) {

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
				crearMatriz(lista);
				configurarPaginacion();
				indiceActualBloque = 0;
				indiceActualPagina = 0;
				mostrarMatriz(0);
			}
		}
	}
}

function abrirPopup() {
	var divPopup = document.getElementById("divPopup");
	divPopup.style.display = "inline-block";
}

function cerrarPopup() {
	var divPopup = document.getElementById("divPopup");
	divPopup.style.display = "none";
}

function configurarBotones() {

	var btnBuscarEmpleado = document.getElementById("btnBuscarEmpleado");
	btnBuscarEmpleado.onclick = function () {
		opcion = "Empleado";
		abrirPopup();
		var cabecerasEmpleado = ["Codigo", "Apellido", "Nombre"];
		crearTabla(cabecerasEmpleado);
		configurarFiltro(listaEmpleado);
		crearMatriz(listaEmpleado);
		configurarPaginacion();
		mostrarMatriz(0);
		configurarOrdenacion();
	}

	var btnBuscarCliente = document.getElementById("btnBuscarCliente");
	btnBuscarCliente.onclick = function () {
		opcion = "Cliente";
		abrirPopup();
		var cabecerasCliente = ["Codigo", "Nombre", "Direccion"];
		crearTabla(cabecerasCliente);
		configurarFiltro(listaCliente);
		crearMatriz(listaCliente);
		configurarPaginacion();
		mostrarMatriz(0);
		configurarOrdenacion();
	}

	var imgCerrar = document.getElementById("imgCerrar");
	imgCerrar.onclick = function () {
		cerrarPopup();
	}

	var imgNuevo = document.getElementById("imgNuevo");
	imgNuevo.onclick = function () {
		crearNuevaFila();
	}

	var btnGrabar = document.getElementById("btnGrabar");
	btnGrabar.onclick = function () {
		if (validarOrden() == "") {
			grabarOrden();
		}
	}

	var btnImprimir = document.getElementById("btnImprimir");
	btnImprimir.onclick = function () {
		imprimir();
	}
}

function crearNuevaFila() {
	//data-stock es de html 5
	var contenido = "<tr data-stock=''><td><img id='imgEliminar' src='../Imagenes/Eliminar.png' width='20' height='20' alt=''  title='Eliminar Detalle' style='cursor: pointer' onclick='eliminarDetalle(this);'/></td><td>";
	contenido += "<input type='text' style='width: 50px' />";
	contenido += "<input type='button' value='...' style='cursor: pointer' title='Buscar Cliente' onclick='buscarProducto(this);'/>";
	contenido += "</td><td></td><td style='text-align:right'></td><td style='text-align:right'><input type='text' style='width: 50px' onkeypress='enter(event);' maxlength='5'/></td><td style='text-align:right'></td></tr>";
	var tbDetalle = document.getElementById("tbDetalle");
	var tr = document.createElement("tr");
	tr.className = "FilaDatos"
	tr.innerHTML = contenido;
	tbDetalle.appendChild(tr);
}

function seleccionarFila(fila) {
	switch (opcion) {
		case "Empleado":
			document.getElementById("txtIdEmpleado").value = fila.cells[0].innerText;
			document.getElementById("txtApeEmpleado").value = fila.cells[1].innerText;
			document.getElementById("txtNomEmpleado").value = fila.cells[2].innerText;
			break;
		case "Cliente":
			document.getElementById("txtIdCliente").value = fila.cells[0].innerText;
			document.getElementById("txtNomCliente").value = fila.cells[1].innerText;
			document.getElementById("txtDirCliente").value = fila.cells[2].innerText;
			break;
		case "Producto":
			filaActual.cells[1].childNodes[0].value = fila.cells[0].innerText;
			filaActual.cells[2].innerText = fila.cells[1].innerText;
			filaActual.cells[3].innerText = fila.cells[2].innerText;
			filaActual.setAttribute("data-stock", fila.cells[3].innerText);
			var txt = filaActual.cells[4].childNodes[0];
			txt.focus();
			if (txt.value != "") {
				var cantidad = txt.value * 1;
				var preUnit = parseInt(filaActual.cells[3].innerText);
				filaActual.cells[5].innerText = cantidad * preUnit;
				var tbTotal = document.getElementById("tbTotal");
				tbTotal.innerText = cacularTotal();
			}
			break;
	}
	cerrarPopup();
}


function buscarProducto(boton) {
	var celda = boton.parentNode;
	filaActual = celda.parentNode;
	opcion = "Producto";
	abrirPopup();
	var cabecerasProducto = ["Codigo", "Nombre", "Pre Unit","Stock"];
	crearTabla(cabecerasProducto);
	configurarFiltro(listaProducto);
	crearMatriz(listaProducto);
	configurarPaginacion();
	mostrarMatriz(0);
	configurarOrdenacion();
}


function enter(event) {
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (keyCode == 13) {
		var txt = event.target;
		var celda = txt.parentNode;
		var fila = celda.parentNode;
		var stock = fila.getAttribute("data-stock") * 1;
		var rpta = validarEntero(txt, "Cantidad", stock);
		if (rpta != "") {
			alert(rpta);
			txt.value = "";
			txt.focus();
			return false;
		}
		else
		{
			var cantidad = txt.value * 1;
			var preUnit = parseInt(fila.cells[3].innerText);
			fila.cells[5].innerText = cantidad * preUnit;
			var tbTotal = document.getElementById("tbTotal");
			tbTotal.innerText = cacularTotal();
			//crearNuevaFila();
		}
		return true;
	}
	return true;
}

function validarEntero(Texto, Mensaje, Maximo) {
	if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
		if (isNaN(Texto.value)) {
			return Mensaje + 'debe ser un numero entero';
		}
		var n = Texto.value * 1;
		if (n < 0) {
			return Mensaje + 'debe ser un entero mayor a cero';
		}
		if (n > Maximo) {
			return Mensaje + 'debe ser un entero menor a ' + Maximo;
		}
		if (Texto.value.match(/([\<])([^\>]{1,})*([\>])/i) != null) {
			return Mensaje + 'No debe contener etiqueta html: <etiqueda>';
		}
		if (Texto.value.match(/[.,;]+/) != null) {
			return Mensaje + 'No debe contener .,;';
		}
	}
	return "";
}

function cacularTotal() {
	var tbDetalle = document.getElementById("tbDetalle");
	var nFilas = tbDetalle.rows.length;
	var total = 0;
	var fila;
	for (var i = 0; i < nFilas; i++) {
		fila = tbDetalle.rows[i];
		total += fila.cells[5].innerText * 1;
	}
	return total;
}

function eliminarDetalle(img) {
	if (confirm("Seguro de eliminar la fila")) {
		var celda = img.parentNode;
		var fila = celda.parentNode;
		var tbDetalle = document.getElementById("tbDetalle")
		tbDetalle.removeChild(fila);
		var tbTotal = document.getElementById("tbTotal");
		tbTotal.innerText = cacularTotal();
	}
	
}

function validarOrden() {
	listaOrden = "";
	var mensaje = "";

	var txtIdCliente = document.getElementById("txtIdCliente");
	if (txtIdCliente.value == "") {
		mensaje += "<li>Falta seleccionar el Cliente </li>";
	} else {
		listaOrden += txtIdCliente.value + "|";
	}
	
	var txtIdEmpleado = document.getElementById("txtIdEmpleado");
	if (txtIdEmpleado.value == "") {
		mensaje += "<li>Falta seleccionar el Empleado </li>";
	} else {
		listaOrden += txtIdEmpleado.value + "_";
	}

	var tbDetalle = document.getElementById("tbDetalle");
	var nFilas = tbDetalle.rows.length;
	if (nFilas == 0) {
		mensaje += "<li>Falta agregar detalles a la orden </li>";
	} else {
		var c = 0;
		var fila;
		var exito;
		var idProd;
		var preUnit;
		var cantidad;
		for (var i = 0; i < nFilas; i++) {
			fila = tbDetalle.rows[i];
			idProd = fila.cells[1].childNodes[0].value;
			preUnit = fila.cells[3].innerHTML;
			cantidad = fila.cells[4].childNodes[0].value;
			listaOrden += idProd;
			listaOrden += "|";
			listaOrden += preUnit;
			listaOrden += "|";
			listaOrden += cantidad;
			listaOrden += ";";
			exito = (idProd != "" && cantidad != "");
			if (!exito) {
				fila.style.backgroundColor = "red";
				c++;
			}
			else fila.style.backgroundColor = "white";
		}
		if (listaOrden.length > 0) listaOrden = listaOrden.substring(0, listaOrden.length - 1);
		if (c > 0) mensaje += "<li>Las filas de color no estan completas</li>";

	}
	
	var spnMensajeOrden = document.getElementById("spnMensajeOrden");
	if (mensaje != "") spnMensajeOrden.innerHTML = "<ul>" + mensaje + "</ul>";
	else spnMensajeOrden.innerHTML = "";
	return mensaje;
}

function grabarOrden() {
	/*var spnMensajeOrden = document.getElementById("spnMensajeOrden");
	spnMensajeOrden.innerHTML = "Enviando... </br>" + listaOrden;*/

	//grabar por GET para poca data
	//var url = "Orden/grabar/?listaOrden=" + listaOrden;
	//enviarServidor(url, mostraGrabar);

	//grabar por el servidor POST
	var url = "Orden/grabar" + listaOrden;
	enviarServidorPost(url, mostraGrabar);
}

function mostraGrabar() {
	var mensaje = "";
	if (rpta == "-1") {
		mensaje = "No se pudo grabar la orden";
		var spnMensajeOrden = document.getElementById("spnMensajeOrden");
		spnMensajeOrden.innerHTML = mensaje;

	} else {
		
		var txtIdOrden = document.getElementById("txtIdOrden");
		txtIdOrden.value = rpta;
		var btnGrabar = document.getElementById("btnGrabar");
		btnGrabar.style.display = "none";
		var btnImprimir = document.getElementById("btnImprimir");
		btnImprimir.style.display = "inline";
	}

}

function enviarServidorPost(url,metodo) {
	var xhr = new XMLHttpRequest();
	xhr.open("post", url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			metodo(xhr.responseText);
		}
	}
	var frm = new FormData();
	frm.append("listaOrden", listaOrden);
	xhr.send(frm);
}

function imprimir() {
	/*mostrarElementos(false);
	window.print();
	mostrarElementos(true);*/

	var txtIdOrden = document.getElementById("txtIdOrden");
	var txtIdEmpleado = document.getElementById("txtIdEmpleado");
	var txtApeEmpleado = document.getElementById("txtApeEmpleado");
	var txtNomEmpleado = document.getElementById("txtNomEmpleado");
	var txtIdCliente = document.getElementById("txtIdCliente");
	var txtNomCliente = document.getElementById("txtNomCliente");
	var txtDirCliente = document.getElementById("txtDirCliente");
	var tdTotal = document.getElementById("tbTotal");
	var tbDetalle = document.getElementById("tbDetalle");
	var nFilas = tbDetalle.rows.length;
	var fila;
	var espacio = "<tr><td colspan='3'></td></tr>";
	var contenido = "<html><body><table style:width:100%;>";
	contenido += "<tr  style='font-weight:bold'><td colspan='3' style='text-align:center'>" + txtIdOrden.value + "</td></tr>";
	contenido += espacio;
	contenido += "<tr><td>Id Empleado</td><td>Apellido del Empleado</td><td>Nombre de Empleado</td></tr>";
	contenido += "<tr style='font-weight:bold'><td>" + txtIdEmpleado.value + "</td><td>" + txtApeEmpleado.value + "</td><td>" + txtNomEmpleado.value + "</td></tr>";
	contenido += espacio;
	contenido += "<tr><td>Id Cliente</td><td>Nombre del Cliente</td><td>Direccion del Cliente</td><td colspan='2'></td></tr>";
	contenido += "<tr style='font-weight:bold'><td>" + txtIdCliente.value + "</td><td>" + txtNomCliente.value + "</td><td>" + txtDirCliente.value + "</td></tr>";
	contenido += espacio;
	contenido += "<tr><td colspan='3'><table style:width:100%;><thead ><tr class='FilaCabecera' background-color: lightgray;!important color: black;><th>Id Producto</th><th>Descripcion Producto</th><th>Precio Unitario</th><th>Cantidad</th><th>Precio Total</th></tr></thead>"; 
	contenido += "<tbody>";
	
	for (var i = 0; i < nFilas; i++) {
		fila = tbDetalle.rows[i];
		contenido += "<tr style='background-color:white;color:black;'><td>";
		contenido += fila.cells[1].childNodes[0].value;
		contenido += "</td><td>";
		contenido += fila.cells[2].innerHTML;
		contenido += "</td><td>";
		contenido += fila.cells[3].innerHTML;
		contenido += "</td><td>";
		contenido += fila.cells[4].childNodes[0].value;
		contenido += "</td><td>";
		contenido += fila.cells[5].childNodes[0].value;
		contenido += "</td></tr>";
	}
	contenido += "</tbody><tfoot id='tfDetalle' style='text- align:right; font-weight:bold'><tr><td colspan='4'> Total de la Orden: </td><td background-color: lightgray;!important color: black;>" + tdTotal.innerHTML + "</td>";
	contenido += "</td></tr>";
	contenido += "</table>";
	var pagina = window.document.body;
	var ventana = window.open();
	ventana.document.write(contenido);
	ventana.print();
	ventana.close();
	window.document.body = pagina;
}

/*function mostrarElementos(visible) {
	var elementos = document.getElementsByClassName("noImprimir");
	var nElementos = elementos.length;
	var elemento;
	var valor = (visible?"inline":"none");
	for (var i = 0; i < nElementos; i++) {
		elemento = elementos[i];
		elemento.style.display = valor;
	}
	
}*/