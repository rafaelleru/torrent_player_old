//clase downloader
//author @rafaelleru

var downloader = Downloader.prototype;

function Downloader(){
    this._torrentsArray = []
}

Downloader.startDownload() = function() {
    this.client = client.add( this.torrent, function(){
	//nada de momento
    })
}

Downloader.addTorrent(torrent){
    this.torrentsArray.push(torrent);
    if(torrentsArray.length != 0){
	this.client.add(this.torrentsArray[this.torrentsArray.length]);
    }
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

