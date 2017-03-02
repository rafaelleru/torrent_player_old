
//clase method
//author @rafaelleru

var WebTorrent = require('webtorrent');

function Downloader(){
//    console.log('Holaaaa');
    this._torrentsArray = [];
    this.client = new WebTorrent();
    this.tID;
    this.server;
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

Downloader.prototype.setFileBuffer = function(file) {
  // esto es una variable global? - JJ
    stream  = this.client.files[file].getBuffer();
    //poner a reproducir el buffer
};

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

Downloader.prototype.getProgress = function(){
    var torrentProgress = [];
    this.client.torrents.forEach( function(c){
	        torrentProgress.push(c.progress*100);
           console.log(c.progress);
       });

    return torrentProgress;
}
Downloader.prototype.getFileToPlay = function(file, torrent){
/*    return this.client.torrents[torrent].files[file];
      this.client.torrents[torrent].files[file].appendTo('body');*/
    this.client.torrents[torrent].files[file].select();
    this.client.torrents[torrent].files[file+1].select();
    return this.client.torrents[torrent].files[file];
}

Downloader.prototype.getTorrentHash = function(n_torrent){
    return this.client.torrents[n_torrent].infoHash;
}

Downloader.prototype.initTorrentServer = function(n_torrent){
    //console.log(n_torrent);
    this.server = this.client.torrents[n_torrent].createServer();
    this.server.listen(9999);
}

Downloader.prototype.getTorrent = function(n_torrent){
    return this.client.torrents[n_torrent];
}

Downloader.prototype.getNTorrents = function(){
    return this.client.torrents.length;
}

Downloader.prototype.closeTorrentServer = function(){
    this.server.close();
}

Downloader.prototype.getTorrentFiles = function(n_torrent){
    return this.client.torrents[n_torrent].files;
}

Downloader.prototype.getTorrentMagnet = function(n_torrent){
    return this.client.torrents[n_torrent].magnetURI;
}
module.exports = Downloader;
