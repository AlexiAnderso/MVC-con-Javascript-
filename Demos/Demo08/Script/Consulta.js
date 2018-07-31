var listaProducto;
var matriz = [];

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

	var cabeceras = ["Codigo", "Descripcion", "IdProveedor", "IdCategoria", "Precio Unitario","Stcok"];

	//el numero de campos de la cabecera
	nCampos = cabeceras.length;

	//creo una fila cabecera para la cabecera
	contenido += "<tr class='FilaCabecera'>";

	var idCombo;

	// hago un for para sacar los datos de la cabecera
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th>";
		
		//agrego los datos de la cabecera
		contenido += cabeceras[j];
		contenido += "<br/>";
		if (j == 2 || j == 3) {
			if (j == 2) {
				idCombo = "cboProveedor";
			} else idCombo = "cboCategoria";

			contenido += "<select id='" + idCombo + "' name='cabecera' class='combo'></select>";
		} else {
			contenido += "<input name='cabecera' class='texto' type='text'"
		}
		contenido += "</th>";
	}
	//cierro el THEAD de la cabecera y creo el TBODY para los datos
	contenido += "</tr></thead><tbody id='tbProducto'></tbody></table>";

	//toda la cabecera lo muestro en el divCliente
	var divProducto = document.getElementById("divProducto");
	divProducto.innerHTML = contenido;
}

function crearMatriz() {
	var cboCategoria = document.getElementById("cboCategoria");
	//toma de nuevo la lista del string (listaClientes) y lo guar en nRegistros
	var nRegistros = listaProducto.length;
	var nCampos;
	var campos;
	var c = 0;

	//Se inicializa la matriz en vacio
	matriz = [];

	var cabeceras = document.getElementsByName("cabecera");
	var exito;
	var nCabeceras = cabeceras.length;
	var cabecera;

	//hago un FOR comenzando de i = 1, por q el 0 esta hecho para la cabecera
	for (var i = 1; i < nRegistros; i++) {
		campos = listaProducto[i].split("|");
		nCampos = campos.length;

		exito = true;
		for (var j = 0; j < nCabeceras; j++) {
			cabecera = cabeceras[j];
			if (cabecera.className == "texto") {
				exito = true && (campos[j].toLowerCase().indexOf(cabecera.value.toLowerCase()) > -1);
			} else {
				exito = true && (cabecera.value == "" || campos[j] == cabecera.value);
			}
			if (!exito) {
				break;
			}
		}
		//solo debe mostrar las filas cuando se cumpla la condicion
		//o esta vacio o contiene un caracter
		//si lo que tipeas esta dentro de Campos[1] si es asi creo la fila
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
	var contenido = "";

	if (matriz.length > 0) {
	
		//guardo los campos de una fila (matriz[0] = la primera fila)
		//(matriz[0].length = obtengo el numero de campos de esa fila ) en nCampos
		var nCampos = matriz[0].length;

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
	}
	//muestro las filas y campos en el cuerpo TBODY de la tabla
	var tbProducto = document.getElementById("tbProducto");
	tbProducto.innerHTML = contenido;

	//mostrarMatriz() siempre debe de llamar a mostrarTotal();
	mostrarTotal();
}

function mostrarListas(rpta) {
	if (rpta != "") {
		//variable listas va tener guardado dos listas, separados por guion bajo
		var listas = rpta.split("_"); 

		var listaProveedor = listas[0].split(";");

		//guardo en la variable(listaCategoria) el primer string separado por guien bajo
		//a ese primer string, al hacer .split la convierto en un array de strings
		var listaCategoria = listas[1].split(";");

		listaProducto = listas[2].split(";");
		crearTabla();
		llenarCombo(listaProveedor, "cboProveedor", "Todo");
		llenarCombo(listaCategoria, "cboCategoria", "Todo");
		crearMatriz();
		mostrarMatriz();
		configurarFitros();
	}
}

function mostrarTotal() {
	var spnMensaje = document.getElementById("spnMensaje");
	spnMensaje.innerHTML = "<b>Total de registros encontrados : " +  matriz.length + "</b>"; 
}


//llenarCombo, tiene como parametro, la lista de datos, el nombre de combo (idCombo), primer item 
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
	for (var i = 1; i < nRegistros; i++) {

		// obtengo los campos de la lista (lista[i] es una fila, con .split("|") obtengo los campos)
		campos = lista[i].split("|");
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
	}
	
	//si existe ese ID de combo 
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function configurarFitros() {
	//apuntamos al texto
	var textos = document.getElementsByClassName("texto");
	if (textos != null && textos.length > 0) {
		var nTextos = textos.length;
		var texto;
		for (var i = 0; i < nTextos; i++) {
			texto = textos[i];
			//cada que precionamos una tecla voy a llamar a crearMatriz() y mostrarMatriz()
			texto.onkeyup = function () {
				crearMatriz();
				mostrarMatriz();
			}
		}

	}

	var combos = document.getElementsByClassName("combo");
	if (combos != null && textos.length > 0) {
		var nCombos = combos.length;
		var combo;
		for (var i = 0; i < nCombos; i++) {
			combo = combos[i];
			//cada que precionamos una tecla voy a llamar a crearMatriz() y mostrarMatriz()
			combo.onchange = function () {
				crearMatriz();
				mostrarMatriz();
			}
		}

	}
}

