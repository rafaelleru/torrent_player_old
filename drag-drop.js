var dragDrop = require('drag-drop/buffer')
var ipc = require('electron').ipcRenderer;

dragDrop("#draganddrop", function(files){
    ipc.send('addTorrent', files);
})
