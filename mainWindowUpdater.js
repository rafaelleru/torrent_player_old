//author: @rafaelleru

const {ipcRenderer} = require('electron')

function Updater(){
    this.list = [];
    this.list_div = document.getElementById('songs_queue');
};

Updater.prototype.reloadList = function(files){
    
    for(var i=0; i < files.length; i++){
        console.log(i+files[i].name);
        var list_element = document.createElement('li');
        //texto.setAttribute('id', 'item_'+ i.toString());

        if(files[i].name.includes('mp3',files[i].name.length - 4)){
            list_element.innerHTML=files[i].name;
            this.list_div.appendChild(list_element);
        }

        var list_element = document.createElement('li');
        list_element.setAttribute('id', 'item_'+ i.toString());
        list_element.onclick = requestPlay(i);

        if(files[i].name.includes('mp3',files[i].name.length - 4)){
            list_element.innerHTML = files[i].name;
            this.list_div.appendChild(list_element);
        }

    }
};

// TODO: voy a poner el click listener aqui, pero hay que pensar mejor donde ponerlo

function requestPlay(i){
    ipcRenderer.send('playRequest', i);
}
    

module.exports = Updater;
