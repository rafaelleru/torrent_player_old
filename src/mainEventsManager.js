//author: @rafaelleru

const {ipcRenderer} = require('electron');

var saveButton = document.getElementById('save_button');
var loadButton = document.getElementById("load_playlist");

saveButton.onclick = function(){
    alert("Guardado!!")
}

ipcRenderer.on('magnet', (event, data) => {
    magnet = data[0];
    console.log(magnet);
    
   // var indexOf = i.toString();
    alert(magnet); 
});


loadButton.onclick = function(){
    ipcRenderer.send("loadPlaylist", []);
    alert("lista de reproduccion cargada!!")
}
