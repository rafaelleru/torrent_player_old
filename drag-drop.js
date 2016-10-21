var dragDrop = require('drag-drop/buffer')
var downloader = require('./downloader.js')

dragDrop(document.body, function(files){
    //downloader.addTorrent(torrent)
    console.log("añade en el body");
    files.forEach((file) => downloader.addTorrent(file))
})
