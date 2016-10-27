var dragDrop = require('drag-drop/buffer')
var ipc = require('electron').ipcRenderer;

dragDrop(document.getElementById("draganddrop"), function(files){
    console.log('torrent añadido');
    ipc.send('addTorrent', files);
})
