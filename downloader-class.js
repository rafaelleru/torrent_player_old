//clase downloader
//author @rafaelleru

var downloader = Downloader.prototype;

function Downloader(_torrent){
    this.torrent = _torrent;
}

Downloader.startDownload() = function() {
    this.client = client.add( this.torrent, function(){
	//nada de momento
    })
}


Downloader.setFileMorePriority = function(file) {
    this.client.files[file].select();
}

Downloader.setFileBuffer = function(file) {
    stream  = this.client.files[file].getBuffer();
    //poner a reproducir el buffer
}

Downloader.setPlayFile = function(file) {
    document.getElementById("body").append(this.client.files[file]);
}

