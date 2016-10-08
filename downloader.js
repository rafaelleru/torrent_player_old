var WebTorrent = require('webtorrent')

var client = new WebTorrent()
var Document 

var torrentId = 'magnet:?xt=urn:btih:1127fcb8e3a7952d236b257ed75cc49e5d9fa919&dn=Dream+Theater+-+The+Number+Of+The+Beast+2005+320ak&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'

client.add(torrentId, function(torrent) {
    // Torrents can contain many files. Let's use the first.
    var files = torrent.files
    rellenarLista(files)
    
    console.log(files.length)
    for (var i = 0; i < files.length; i++) {
	console.log(files[i].name)
	/*while (client.downloaded < files[i].length){
	    
	}*/
    }

    playSelected(files);
})

function rellenarLista(files) {
    lista = ['http://www.ksdjfksdjgfsjdhfsdf.com','http://www.manolico.com','http://www.laputaqueteparioquefuetumaeynotieneculpa.com'];
                var bloque = document.getElementById("lista");
                for (var i = 0; i < files.length; i++) {
                    var texto = document.createElement("li");
		    texto.id = i;
		    //console.log(files[i])
                    texto.innerHTML = files[i].name;
                    bloque.appendChild(texto);
                }
}

function playSelected(files){
    var index = document.getElementById('5');
    file = files[5];
    file.appendTo('body');
}
    
