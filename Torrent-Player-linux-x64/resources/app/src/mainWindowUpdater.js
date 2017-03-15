//author: @rafaelleru

const {ipcRenderer} = require('electron');
var fs = require('fs');

var currentPlayingFile;

function Updater(){
    this.list = [];
    this.list_div = document.getElementById('songs_queue');
};

Updater.prototype.reloadList = function(files, n_torrent){
    console.log(files.length.toString() + ' archivos del torrent: '+ n_torrent.toString());

    for(var i=0; i < files.length; i++){
	if(files[i].name.indexOf('mp3') != -1){
            var div_row = document.createElement('div');
            div_row.setAttribute('class','torrent');

	    var add_button = document.createElement('button');
	    add_button.setAttribute('text', 'save')

	   

	    div_row.appendChild(add_button);
	    
	    /* First column */
            var number_element = document.createElement('div');
            number_element.setAttribute('id',i);
            number_element.setAttribute('class',"col-md-1 col-sm-1 col-xs-1");
            number_element.innerHTML=i;
            div_row.appendChild(number_element);

	    /* Second column */
            var title_element = document.createElement('div');
            title_element.setAttribute('id', 'item_'+ i.toString() + '_' + n_torrent.toString());
            title_element.setAttribute('class', "col-md-3 col-sm-3 col-xs-3");
            title_element.innerHTML=files[i].name;
	    div_row.appendChild(title_element);

	    /*Third column */
            var album_element = document.createElement("div");
            album_element.setAttribute('id', 'unAlbum');
            album_element.setAttribute('class', "col-md-3 col-sm-3 col-xs-3");
            album_element.innerHTML='album';
            div_row.appendChild(album_element);

            /* Fourth column */
            var artist_element = document.createElement("div");
            artist_element.setAttribute('id', 'unArtista');
            artist_element.setAttribute('class', "col-md-3 col-sm-3 col-xs-3");
            artist_element.innerHTML='artista';
            div_row.appendChild(artist_element);

            /*Fifth column*/
            var time_element = document.createElement('div');
            time_element.setAttribute('id', 'time');
            time_element.setAttribute('class', "col-md-2 col-sm-2 col-xs-2");
            time_element.innerHTML='0:00';
            div_row.appendChild(time_element);

            this.list_div.appendChild(div_row);
            this.list_div.appendChild(document.createElement('br'));

	    (function (i){
		title_element.onclick = function(){
		    requestPlay(i, n_torrent-1);
		};

		add_button.onclick = function(){
	
		    ipcRenderer.send('addSong', [n_torrent-1,i]);
		      
		};
	    })(i);
        }
    }
};

Updater.prototype.updateProgress = function(n_torrent){
     //Refrescar el progreso del torrent
     document.getElementById('progress-bar').style.width = n_torrent+"%";

};

function requestPlay(i, n_torrent){
    console.log('request_play');
    currentPlayingFile = i;
    ipcRenderer.send('getPlayData', [i, n_torrent]);
}


Updater.prototype.play = function (file){
    console.log(file);
    var stream  = file;
    console.log(stream.data());
}


module.exports = Updater;
