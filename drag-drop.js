var dragDrop = require('drag-drop/buffer')
var ipc = require('electron').ipcRenderer;

dragDrop(document.getElementById("body"), function(files){
    ipc.send('addTorrent', files);
    
})
