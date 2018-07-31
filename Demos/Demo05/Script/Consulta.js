var listaCliente;
var matriz = [];

window.onload = function () {
	var url = "Cliente/lista";
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
	//se guarda en nRegistors la data 
	var nRegistros = listaCliente.length;
	var nCampos;
	var campos;

	//se coloca una tabla
	var contenido = "<table><thead>";

	//el primer registri es el q trae las cabeceras y las separa por |
	campos = listaCliente[0].split("|");

	//el numero de campos de la cabecera
	nCampos = campos.length;

	//creo una fila cabecera para la cabecera
	contenido += "<tr class='FilaCabecera'>";

	// hago un for para sacar los datos de la cabecera
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th>";
		//agrego los datos de la cabecera
		contenido += campos[j];
		contenido += "</th>";
	}
	//cierro el TR
	contenido += "</tr></thead><tbody id='tbCliente'></tbody></table>";

	//toda la cabecera lo muestro en el divCliente
	var divCliente = document.getElementById("divCliente");
	divCliente.innerHTML = contenido;
}

function crearMatriz() {

	//toma de nuevo la lista del string (listaClientes) y lo guar en nRegistros
	var nRegistros = listaCliente.length;
	var nCampos;
	var campos;
	var txtNombre = document.getElementById("txtNombre");
	var c = 0;

	//Se inicializa la matriz en vacio
	matriz = [];

	//hago un FOR comenzando de i = 1, por q el 0 esta hecho para la cabecera
	for (var i = 1; i < nRegistros; i++) {
		campos = listaCliente[i].split("|");
		nCampos = campos.length;

		//solo debe mostrar las filas cuando se cumpla la condicion
		//o esta vacio o contiene un caracter
		//si lo que tipeas esta dentro de Campos[1] si es asi creo la fila
		if (txtNombre.value == "" || campos[1].toLowerCase().indexOf(txtNombre.value.toLowerCase()) > -1) {
			matriz[c] = [];
			for (var j = 0; j < nCampos; j++) {
				//cada fila tiene su columna (coge una celda)
				// C es el contador de filas
				matriz[c][j] = campos[j];
			}
			c++;
		}
	}
}

function mostrarMatriz() {
	var txtNombre = document.getElementById("txtNombre");

	//se guarda el tamano de la matriz a mostrar 
	var nRegistros = matriz.length;

	//guardo los campos de una fila (matriz[0] = la primera fila)
	//(matriz[0].length = obtengo el numero de campos de esa fila ) en nCampos
	var nCampos = matriz[1].length;

	//creo una variable contenido = "" para mostrar las filas
	var contenido = "";


	for (var i = 1; i < nRegistros; i++) {

		//se inicializa una fila a mostrar con el <tr>
		contenido += "<tr class='FilaDatos'>";
	
		for (var j = 0; j < nCampos; j++) {
			//se inicializa el numero de campos por fila
			contenido += "<td>";
			if (j==1) {
				//paar q pinte el caracter q buscas
				if (txtNombre.value != "") {
					contenido += matriz[i][1].replace(txtNombre.value, "<b style='color:orange'>" + txtNombre.value + "</b>");
				} else
					contenido += matriz[i][j];
			}
			else contenido += matriz[i][j];
			contenido += "</td>";
		}
		//cierro la fila
		contenido += "</tr>";
	}

	//muestro las filas y campos en el cuerpo TBODY de la tabla
	var tbCliente = document.getElementById("tbCliente");
	tbCliente.innerHTML = contenido;

	//mostrarMatriz() siempre debe de llamar a mostrarTotal();
	mostrarTotal();
}

function mostrarLista(rpta) {
	if (rpta != "") {
		listaCliente = rpta.split(";");
		crearTabla();
		crearMatriz();
		mostrarMatriz();
		configurarBusqueda();
	}
}

function mostrarTotal() {
	var spnMensaje = document.getElementById("spnMensaje");
	spnMensaje.innerHTML = "<b>Total de registros encontrados : " +  matriz.length + "</b>"; 
}

function configurarBusqueda() {
	//apuntamos al texto
	var txtNombre = document.getElementById("txtNombre");

	//cada que precionamos una tecla voy a llamar a crearMatriz() y mostrarMatriz()
	txtNombre.onkeyup = function () {
		crearMatriz();
		mostrarMatriz();
	}

}