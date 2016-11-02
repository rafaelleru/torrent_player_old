
//clase method
//author @rafaelleru

var WebTorrent = require('webtorrent');

function Downloader(){
//    console.log('Holaaaa');
    this._torrentsArray = [];
    this.client = new WebTorrent();
    this.tID;
};


Downloader.prototype.startDownload = function(torrent) {
// está bien esta función vacía? - JJ
 this.client = client.add( torrent, function(){
    });
};

Downloader.prototype.addTorrent = function(torrent, callback){
    this._torrentsArray.push(torrent);
    this.client.add(torrent, function(torrent){
	console.log(torrent.infoHash);
	console.log(torrent.files.length);
	callback();
    }); // esto debería ser lo mismo que lo de abajo
};
Downloader.prototype.setFileMorePriority = function(file) {
    this.client.files[file].select();
};

Downloader.prototype.setFileBuffer = function(file) {
  // esto es una variable global? - JJ
    stream  = this.client.files[file].getBuffer();
    //poner a reproducir el buffer
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

Downloader.prototype.getLastFiles = function(){
    this.client.torrents.forEach( function (f) {
	console.log("lastFiles");
	console.log(f.infoHash);
	console.log(f.files.length);
    })

    return this.client.torrents[this.client.torrents.length -1].files;
}

Downloader.prototype.getNumberOfTorrents = function(){
    return this.client.torrents.length;
}

Downloader.prototype.getFileToPlay = function(file, torrent){
    //console.log(this.client.torrents[torrent].files[file]);
    console.log(this.client.torrents[torrent].progress);
    return this.client.torrents[torrent].files[file];
}

module.exports = Downloader;
