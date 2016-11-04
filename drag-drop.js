var dragDrop = require('drag-drop/buffer')
var ipc1 = require('electron').ipcRenderer;


dragDrop(document.getElementById("draganddrop"), function(files){
    console.log('torrent añadido');
    ipc1.send('addTorrent', files);

})
