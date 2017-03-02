//author: @rafaelleru

const {ipcRenderer} = require('electron');

var saveButton = document.getElementById('save_button');

saveButton.onclick = function(){
    alert("Guardado!!")
}

ipcRenderer.on('magnet', (event, data) => {
    magnet = data[0];
    console.log(magnet);
    
   // var indexOf = i.toString();
    alert(magnet); 
});
