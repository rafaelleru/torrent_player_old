//clase method
//author @rafaelleru

var WebTorrent = require('webtorrent');

function Downloader(){
//    console.log('Holaaaa');
    this._torrentsArray = [];
    this.client = new WebTorrent();
};


Downloader.prototype.startDownload = function(torrent) {
    this.client = client.add( torrent, function(){
    });
};

Downloader.prototype.addTorrent = function(torrent){
    this._torrentsArray.push(torrent);
    this.client.add(torrent); // esto debería ser lo mismo que lo de abajo
//    console.log("Añadido");
    // if(this._torrentsArray.length != 0){
    // 	console.log("algoo");	
    // 	this.client.add(this._torrentsArray[this._torrentsArray.length]);
    // };

};

Downloader.prototype.setFileMorePriority = function(file) {
    this.client.files[file].select();
};

Downloader.prototype.setFileBuffer = function(file) {
    stream  = this.client.files[file].getBuffer();
    //poner a reproducir el buffer
};

Downloader.prototype.setPlayFile = function(file) {
    document.getElementById("body").append(this.client.files[file]);
};

Downloader.prototype.getFiles = function(){
    var files_ = [];
    var torrent_files = this.client.torrents;

    // TODO: esas dos funciones anidadas son raras.
    torrent_files.forEach( function(file_){
	file_.files.forEach( function(f){
	files_.push(f);
	})
    })

    return files_;
}

// TODO: Buscar nombre mejor para la variable i

Downloader.prototype.getFileToPlay = function(i){
    return this.client.torrents[0].files[i];
}

module.exports = Downloader;
