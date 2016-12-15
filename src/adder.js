var dragDrop = require('drag-drop/buffer')
var ipc1 = require('electron').ipcRenderer;
var search = document.getElementById('search');

function removeDropIcon(){
    element = document.getElementById('dropImage');
    element.parentNode.removeChild(element);
    element = document.getElementById('content');
    element.style.visibility = 'visible';
}


dragDrop(document.body, function(files){
    console.log('torrent añadido');
    ipc.send('addTorrent', files);
    removeDropIcon();    
})

addMagnet = function(){
    var scope = document.querySelector("template[is=dom-bind]");
    scope.search = function() {
	ipc1.send('addMagnet', scope.query);
	removeDropIcon();
    };
};

addMagnet();
