var dragDrop = require('drag-drop/buffer')
var downloader = require('./downloader.js')
var ipc = require('electron').ipcRenderer;

dragDrop(document.getElementById("draganddrop"), function(files){
    //downloader.addTorrent(torrent)
    ipc.send('addTorrent', files);
}
