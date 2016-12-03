var dragDrop = require('drag-drop/buffer')
var ipc1 = require('electron').ipcRenderer;


dragDrop(document.body, function(files){
    console.log('torrent añadido');
    ipc1.send('addTorrent', files);
    element = document.getElementById('dropImage');
    //element.style.display = 'none';
    element.parentNode.removeChild(element);
    element = document.getElementById('content');
    element.style.visibility = 'visible';
})
