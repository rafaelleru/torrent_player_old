//clase method
//author @rafaelleru

function Downloader(){
//    console.log('Holaaaa');
    this._torrentsArray = [];
};

Downloader.prototype.startDownload = function() {
//    console.log("hola");
    if ( typeof this.torrent != 'Undefined' ) {
	this.client = client.add( this.torrent, function(){
	    console.log("algoo");
	});
    }
};

Downloader.prototype.addTorrent = function(torrent){
    this.torrentsArray.push(torrent);
    this.client.add(torrent);
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

module.exports = Downloader;
