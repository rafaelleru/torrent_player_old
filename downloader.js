var WebTorrent = require('webtorrent')
var client = new WebTorrent()
var files = []
var reproduciendo = require('stream')

module.exports={ 
    addTorrent:function addTorrent(torrentID){
	client.add(torrentID, function(torrent) {
	    //añadimos el torrent al cliente, y actualizamos la interfaz.
	    update();
	})
    }
}
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
function listenClick(files){
    var lista = document.getElementById("songs_queue")
    lista.onclick = function(e){
	var clicada = getEventTarget(e);
	var index = clicada.id;
	var num_str = index.replace("item_", "");
	/*console.log(num_str);
	  console.log("reproduciendo: " + files[num].name);*/
	var num = parseInt(num_str);
	var el = document.querySelector('audio');
	if(el != null){
	    console.log(el);
	    el.parentNode.removeChild(el);
	}
	//ponemos a reproducir el elemento num de la lista <ol>
	//reproduciendo = files[num].createReadStream();
	// hay que poner el stream para que sea lo que se reproduzca
	console.log(files[num].name)
	selectNextFile(num);
	files[num].appendTo('body');
    }
}

setInterval(function() {
    var element = document.getElementById("progress");
  //  var torrents_ = client.torrents;

    client.torrents.forEach( function(c){
	element.innerHTML = c.progress;
    });

//    element.innerHTML = torrents_[0].progress
}, 1000) // Se actualiza cada 1 segundo.
function selectNextFile(num){
    files[num+1].select();
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

function onTorrent(torrent){
    client.download()
}

function update(){
    torrents = client.torrents;

    //añadimos a la cola de archivos los archivos del nuevo torrent.
    torrents.forEach(function (torr){
	console.log(torr.progress);
	fil = torr.files;
	fil.forEach(function (f){
	    console.log(f.toString() );
	    files.push(f);
	})
    })

    if(reproduciendo == null){
	reproduciendo = files[3].appendTo('body')
    }
    
    //files = client.getTorrent(1).files; 
    rellenarLista(files);
    listenClick(files);
}
