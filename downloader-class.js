//clase downloader
//author @rafaelleru

var downloader = Downloader.prototype;

function Downloader(_torrent){
    this.torrent = _torrent;
    this.client.add(this.torrent, function(_torrent) {
	actualizaLista();
    })
}
