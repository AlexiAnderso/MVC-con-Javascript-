var listarProducto;
var matriz = [];

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

	var cabeceras = ["Codigo", "Descripcion", "IdProveedor", "IdCategoria", "Precio Unitario", "Stcok"];

	//el numero de campos de la cabecera
	nCampos = cabeceras.length;

	//creo una fila cabecera para la cabecera
	contenido += "<tr class='FilaCabecera'>";

	// hago un for para sacar los datos de la cabecera
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th>";
		//agrego los datos de la cabecera
		contenido += cabeceras[j];

		//agrego un input text a la cabecera de la tabla
		contenido += "<br/><input type='text' class='texto' id='txtTexto'/>";

		contenido += "</th>";
	}
	//cierro el THEAD de la cabecera y creo el TBODY para los datos
	contenido += "</tr></thead><tbody id='tbProducto'></tbody></table>";

	//toda la cabecera lo muestro en el divProducto
	var divProducto = document.getElementById("divProducto");
	divProducto.innerHTML = contenido;
}


function crearMatriz() {

	//toma de nuevo la lista del string (listaProductos) y lo guar en nRegistros
	var nRegistros = listarProducto.length;
	var nCampos;
	var campos;
	var c = 0;

	//Se inicializa la matriz en vacio
	matriz = [];

	var exito;
	var textos = document.getElementsByClassName("texto");
	var nTextos = textos.length;
	var texto;
	//hago un FOR comenzando de i = 0
	for (var i = 1; i < nRegistros; i++) {
		exito = true;
		campos = listarProducto[i].split("|");
		nCampos = campos.length;
		for (var j = 0; j < nTextos; j++) {
			texto = textos[j];
			exito = exito && (campos[j].toLowerCase().indexOf(texto.value.toLowerCase()) > -1);
			if (!exito) {
				break;
			}
		}
		if (exito) {

			//
			matriz[c] = [];
			for (var j = 0; j < nCampos; j++) {
				//cada fila tiene su columna (coge una celda)
				matriz[c][j] = campos[j];
			}
			c++;
		}
	}
}

function mostrarMatriz() {
	//se guarda el tamano de la matriz a mostrar 
	var nRegistros = matriz.length;

	//guardo los campos de una fila (matriz[0] = la primera fila)
	//(matriz[0].length = obtengo el numero de campos de esa fila ) en nCampos
	var nCampos = matriz[0].length;

	//creo una variable contenido = "" para mostrar las filas
	var contenido = "";

	for (var i = 0; i < nRegistros; i++) {

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

	//muestro las filas y campos en el cuerpo TBODY de la tabla
	var tbProducto = document.getElementById("tbProducto");
	tbProducto.innerHTML = contenido;

	//mostrarMatriz() siempre debe de llamar a mostrarTotal();
	mostrarTotal();
}

function mostrarLista(rpta) {
	if (rpta != "") {
		listarProducto = rpta.split(";");
		crearTabla();
		crearMatriz();
		mostrarMatriz();
		configurarFiltro();
	}
}

function mostrarTotal() {
	var spnMensaje = document.getElementById("spnMensaje");
	spnMensaje.innerHTML = "<b>Total de registros encontrados : " +  matriz.length + "</b>"; 
}

function configurarFiltro() {
	//apuntamos al texto
	var textos = document.getElementsByClassName("texto");
	if (textos != null && textos.length > 0) {
		var nTextos = textos.length;
		var texto;
		for (var i = 0; i < nTextos; i++) {
			texto = textos[i];
			//cada que precionamos una tecla voy a llamar a crearMatriz() y mostrarMatriz()
			texto.onkeyup = function () {
				if (isNaN(textos[0].value)) {
					alert("Ingrese solo numero")
					focus();
				}else{
					crearMatriz();
					mostrarMatriz();
				}
			}
		}

	}
	
}