var dragDrop = require('drag-drop/buffer')
var downloader = require('./downloader.js')

dragDrop(document.getElementById("draganddrop"), function(files){
    //downloader.addTorrent(torrent)
    files.forEach((file) => downloader.addTorrent(file))
})
