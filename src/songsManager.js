
const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./src/mainWindowUpdater.js');
var updater = new Updater();
var audio_tag = document.getElementById('audio');
var currentPlay;
var currentTorrent;
ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('toPlay', (event, data) => {
  
    console.log(data.toString());
    currentTorrent = data[1];
    
    audio_tag.src = 'http://localhost:9999/' + data[0].toString();
    audio_tag.play();


    audio_tag.onended = function(){
	console.log('se acabo la reproduccion');
	ipc.send('getPlayData', [data+1, currentTorrent]); 
    }

})



ipc.on('updateProgress', (event, data) => { 
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data+'%';
    console.log(data);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
})



ipc.on('playEnded', (event, data) => {
    //Aqui compruebo si es la ultima cancion para saltar al siguiente torrent
    // y si es el ultimo torrent vuelvo al primero

    currentPlayingFile = data+1;
    console.log('salto a la siguiente cancion' + currentPlayingFile.toString());
   
    ipc.send('getPlayData', [currentPlayingFile, currentPlayingTorrent]);
})
