var WebTorrent = require('webtorrent')

var client = new WebTorrent()
var Document 

var torrentId = 'magnet:?xt=urn:btih:1127fcb8e3a7952d236b257ed75cc49e5d9fa919&dn=Dream+Theater+-+The+Number+Of+The+Beast+2005+320ak&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'

client.add(torrentId, function(torrent) {
    // Torrents can contain many files. Let's use the first.
    var files = torrent.files;
    rellenarLista(files);
    
    console.log(files.length)
    for (var i = 0; i < files.length; i++) {
	console.log(files[i].name);
	/*while (client.downloaded < files[i].length){
	    
	}*/
    }
    
    var reproduciendo = files[5].appendTo("body");
    var click = litenClick(files);
    /*if(click != null){
	console.log("voy a reproducir: " + click.toString());
	files[click].appendTo("body");
    }*/
})

/**
* muestra una lista de las canciones
* @param files archivos del torrent
*/
function rellenarLista(files) {
    var bloque = document.getElementById("songs_queue");
    for (var i = 0; i < files.length; i++) {
        var texto = document.createElement("li");
	//le asignamos un id a cada elemento de la lista para referenciarlos luego
	texto.setAttribute("id", "item_"+i.toString());
	//console.log(files[i])
        texto.innerHTML = files[i].name;
        bloque.appendChild(texto);
    }
}

/**
* funcion que comprueba si hay click en algun elemento de la lista de canciones
* @param files los archivos del torrent
*/
function litenClick(files){
    var lista = document.getElementById("songs_queue")
    lista.onclick = function(e){
	var clicada = getEventTarget(e);
	var index = clicada.id;
	var num_str = index.replace("item_", "");
	console.log(num_str);
	var num = parseInt(num_str);
	console.log("reproduciendo: " + files[num].name);
	var el = document.querySelector('audio');
	console.log(el);
	el.parentNode.removeChild(el)
	files[num].appendTo("body");
	//var num = parseInt(index);
	//console.log(num.toString());
	//alert(clicada.innerHTML);
	//	return num;
    }
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}
    
