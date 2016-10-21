//clase method
//author @rafaelleru

var Downloader = Downloader.prototype;

function Downloader(){
    console.log('Holaaaa');
    this._torrentsArray = [];
};

Downloader.startDownload() = function() {
    console.log("hola");
    this.client = client.add( this.torrent, function(){
	console.log("algoo");
    });
};

Downloader.addTorrent(torrent) = function(torrent){
    this.torrentsArray.push(torrent);
    if(torrentsArray.length != 0){
	this.client.add(this.torrentsArray[this.torrentsArray.length]);
    };
};

Downloader.setFileMorePriority = function(file) {
    this.client.files[file].select();
};

Downloader.setFileBuffer = function(file) {
    stream  = this.client.files[file].getBuffer();
    //poner a reproducir el buffer
};

Downloader.setPlayFile = function(file) {
    document.getElementById("body").append(this.client.files[file]);
};

module.exports = Downloader;
exports.Downloader = Downloader;
