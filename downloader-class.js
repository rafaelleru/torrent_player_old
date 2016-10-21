//clase method
//author @rafaelleru

function Downloader(){
    console.log('Holaaaa');
    this._torrentsArray = [];
};

Downloader.prototype.startDownload() = function() {
    console.log("hola");
    this.client = client.add( this.torrent, function(){
	console.log("algoo");
    });
};

Downloader.prototype.addTorrent(torrent) = function(torrent){
    this.torrentsArray.push(torrent);
    if(torrentsArray.length != 0){
	this.client.add(this.torrentsArray[this.torrentsArray.length]);
    };
};

Downloader.prototype.setFileMorePriority = function(file) {
    this.client.files[file].select();
};

Downloader.prototype.setFileBuffer = function(file) {
    stream  = this.client.files[file].getBuffer();
    //poner a reproducir el buffer
};

Downloader.prortype.setPlayFile = function(file) {
    document.getElementById("body").append(this.client.files[file]);
};

module.exports = Downloader;
