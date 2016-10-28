//author: @rafaelleru

const {ipcRenderer} = require('electron')

function Updater(){
    this.list = [];
    this.list_div = document.getElementById('songs_queue');
};

Updater.prototype.reloadList = function(files, n_torrent){
    console.log(files.length.toString() + ' archivos del torrent: '+ n_torrent.toString());

    for(var i=0; i < files.length; i++){
        var list_element = document.createElement('li');
        list_element.setAttribute('id', 'item_'+ i.toString() + '_' + n_torrent.toString());

        //if(files[i].name.includes('mp3',files[i].name.length - 4)){
            list_element.innerHTML=files[i].name;
            this.list_div.appendChild(list_element);
        //}

	(function (i){
	    console.log("asigno onclick");
	    list_element.onclick = function(){
		requestPlay(i, n_torrent-1);
	    };
	})(i);

    }
};
// TODO: voy a poner el click listener aqui, pero hay que pensar mejor donde ponerlo

function requestPlay(i, n_torrent){
    console.log("requestPlay " + i.toString());
    ipcRenderer.send('playRequest', [i, n_torrent]);
}

module.exports = Updater;
