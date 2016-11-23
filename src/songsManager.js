
const ipc = require('electron').ipcRenderer;
var webtorrent = require('webtorrent');
var Updater = require('./src/mainWindowUpdater.js');
var updater = new Updater();
var audio_tag = document.getElementById('audio');
var currentPlay;

ipc.on('updatePlayList', (event, data) => {
    updater.reloadList(data[0], data[1]);
});

ipc.on('toPlay', (event, data) => {
  
    console.log(data.toString());
    
    audio_tag.src = 'http://localhost:9999/' + data.toString();
    audio_tag.play();

    audio_tag.onended = function(){
	console.log('se acabo la reproduccion');
	ipc.send('playEnded', []);
    }

})



ipc.on('updateProgress', (event, data) => { 
    progressBar = document.getElementById('progress-bar');
    progressBar.style.width = data+'%';
    console.log(data);
    audio = document.getElementById('audio');
    audio.style.display = 'block';
})

