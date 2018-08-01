var listaProducto;
var matriz = [];
var orden = 0;
var registrosPagina = 15;
var indiceActualPagina = 0;

window.onload = function () {
	var url = "Producto/listar";
	enviarServidor(url, mostrarLista);
	
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

	var cabeceras = ["Codigo", "Descripcion", "Proveedor", "Categoria", "Precio Unitario", "Stock"];

	//el numero de campos de la cabecera
	nCampos = cabeceras.length;

	//creo una fila cabecera para la cabecera
	contenido += "<tr class='FilaCabecera'>";

	// hago un for para sacar los datos de la cabecera
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th><a href='#' class='link' id='a";
		contenido += j.toString();
		contenido += "'>";
		//agrego los datos de la cabecera
		contenido += cabeceras[j];
		contenido += "</a><span class='span' id='spn";
		contenido += j.toString();;
		contenido += "'></span></th>";
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

	//Se inicializa la matriz en vacio
	matriz = [];

	//hago un FOR comenzando de i = 0
	for (var i = 0; i < nRegistros; i++) {
		matriz[i] = [];
		campos = listaProducto[i].split("|");
		nCampos = campos.length;
		for (var j = 0; j < nCampos; j++) {
			//cada fila tiene su columna (coge una celda)
			// si el array recibe cadena mostramos cadena, si no multiplicamos por 1
			// para obtener numero
			if (isNaN(campos[j])) matriz[i][j] = campos[j];

			else matriz[i][j] = campos[j] * 1;

			
		}
	}
}

function mostrarMatriz(indicePagina) {
	//se guarda el tamano de la matriz a mostrar 
	var nRegistros = matriz.length;

	//guardo los campos de una fila (matriz[0] = la primera fila)
	//(matriz[0].length = obtengo el numero de campos de esa fila ) en nCampos
	var nCampos = matriz[0].length;

	//creo una variable contenido = "" para mostrar las filas
	var contenido = "";

	var inicio = indicePagina * registrosPagina;
	var fin = inicio + registrosPagina;

	for (var i = inicio ; i < fin; i++) {
		if (i < nRegistros) {
			//se inicializa una fila a mostrar con el <tr>
			contenido += "<tr class='FilaDatos'>";

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

	//muestro las filas y campos en el cuerpo TBODY de la tabla
	var tbProducto = document.getElementById("tbProducto");
	tbProducto.innerHTML = contenido;

	//mostrarMatriz() siempre debe de llamar a mostrarTotal();
	mostrarTotal();

	seleccionarBoton(indicePagina);
}

function mostrarLista(rpta) {
	if (rpta != "") {
		listaProducto = rpta.split(";");
		crearTabla();
		crearMatriz();
		configurarPaginacion();
		mostrarMatriz(0);
		configurarOrdenacion();
		
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
				mostrarMatriz();
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
	var nRegistros = matriz.length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) {
		indiceUltimaPagina--;
	}
	var contenido = "";
	for (var i = 0; i < indiceUltimaPagina; i++) {
		contenido += "<input type='button' class='boton' value='";
		contenido += (i + 1).toString();
		contenido += "' onclick='mostrarMatriz(";
		contenido += i.toString();
		contenido += ")' id='";
		contenido += i.toString();
		contenido += "'/>";
	
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
	var btn = document.getElementById("btn" + indicePagina);
	btn.style.backgroundColor = "yellow";
	btn.style.color = "blue";
}