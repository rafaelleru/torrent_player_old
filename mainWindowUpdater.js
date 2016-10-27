//author: @rafaelleru

const {ipcRenderer} = require('electron')

function Updater(){
    this.list = [];
};

Updater.prototype.reloadList = function(files){
    //console.log('actualizo el html con los archivos del torrent');
        this.list_div = document.getElementById('songs_queue');

    for(var i=0; i < files.length; i++){ 
	//console.log(i);

	console.log(files[i].name);
	var list_element = document.createElement('li');
        list_element.setAttribute('id', 'item_'+ i.toString());

        //if(files[i].name.includes('mp3',files[i].name.length - 4)){
	    console.log(files[i].name);
            list_element.innerHTML=files[i].name;
            this.list_div.appendChild(list_element);
        //}

	(function(i){
	    list_element.onclick = function () {
		requestPlay(i);
	    }
	})(i);
    }
};

// TODO: voy a poner el click listener aqui, pero hay que pensar mejor donde ponerlo

function requestPlay(i){
    ipcRenderer.send('playRequest', i);
    ipcRenderer.on('toPlay', (event, file) => {
	console.log('voy a intentar reproducir a ver que pasa');
	//file.appendTo('body');
    })
}
    

module.exports = Updater;
