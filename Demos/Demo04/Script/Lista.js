var listaCliente;

window.onload = function () {
	var url = "Cliente/listar";
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
	var nRegistros = listaCliente.length;
	var nCampos;
	var campos;
	var contenido = "<table>";
	for (var i = 0 ; i<nRegistros; i++) {
		campos = listaCliente[i].split("|");
		nCampos = campos.length;
		if (i == 0)contenido += "<tr class='FilaCabecera'>";
		else contenido += "<tr class='FilaDatos'>";
			for (var j = 0; j < nCampos; j++) {
				contenido += "<td>";
				contenido += campos[j];
				contenido += "</td>";
			}
			contenido += "</tr>";
	}
	contenido += "</table>";
	var divCliente = document.getElementById("divCliente");
	divCliente.innerHTML = contenido;

}


function mostrarLista(rpta) {
	if (rpta != "") {

		//a la data q viene dentro de RPTA la divido en punto y coma (;)
		//obtengo los registros
		listaCliente = rpta.split(";");
		crearTabla();
	}
}